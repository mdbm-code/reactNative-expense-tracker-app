import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';
import { updateStatus } from '../slices/postsSlice';
import { logoutUser } from '../slices/selectedsSlice';

// Создаем экземпляр axios с базовыми настройками
export const apiClient = axios.create({
  baseURL: 'https://your-api-url.com/api', // Замените на ваш базовый URL
  timeout: 10000, // Таймаут запросов (10 секунд)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let failedQueue = [];

// Функция для обработки очереди запросов, ожидающих обновления токена
// очередь для обработки запросов, ожидающих обновления токена.
// Однако, если в процессе обновления токена произойдет ошибка, 
// все запросы в очереди будут отклонены.
// Это поведение корректно, но убедитесь, что вы обрабатываете эти отклоненные 
// запросы в вашем приложении(например, показываете пользователю сообщение об ошибке)
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Интерсептор для добавления JWT-токена в каждый запрос
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add unsent bodies to the request (except for getLeftovers endpoint)
      if (!config.url.includes('getLeftovers')) {
        const state = store.getState();
        const unsentBodies = state.posts.bodies.filter(
          (body) => body.status === 'draft'
        );
        if (unsentBodies.length > 0) {
          config.data = {
            ...config.data,
            unsentBodies,
          };
        }
      }
    } catch (error) {
      console.error('Ошибка при добавлении токена в запрос:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов
apiClient.interceptors.response.use(
  (response) => {
    // Update status of sent bodies

    if (response.config.data && typeof response.config.data === 'string') {
      const unsentBodies = JSON.parse(response.config.data.unsentBodies || '[]');
      unsentBodies.forEach((body) => {
        store.dispatch(updateStatus({ id: body.id, status: 'sent' }));
      });
    }

    // Если сервер возвращает новый токен, сохраняем его
    const newToken = response.headers['x-new-jwt-token']; // Пример: сервер может отправить новый токен в заголовке
    if (newToken) {
      AsyncStorage.setItem('jwtToken', newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Обработка таймаута запроса
    if (error.code === 'ECONNABORTED') {
      console.error('Таймаут запроса:', error.message);
      // Здесь можно показать пользователю сообщение о проблемах с сетью
      return Promise.reject(new Error('Таймаут запроса. Проверьте подключение к сети.'));
    }
    if (!error.response) {
      console.error('Ошибка сети:', error.message);
      // Здесь можно показать пользователю сообщение о проблемах с сетью
      return Promise.reject(new Error('Ошибка сети. Проверьте подключение к интернету.'));
    }
    switch (error.response.status) {
      case 400:
        console.error('Некорректный запрос:', error.response.data);
        return Promise.reject(new Error('Некорректный запрос. Проверьте введенные данные.'))
      case 403:
        console.error('Доступ запрещен:', error.response.data);
        return Promise.reject(new Error('Доступ запрещен. У вас нет прав для выполнения этого действия.'));
      case 404:
        console.error('Ресурс не найден:', error.response.config.url);
        return Promise.reject(new Error('Ресурс не найден. Проверьте URL.'));
      case 429:
        console.error('Слишком много запросов:', error.response.data);
        return Promise.reject(new Error('Слишком много запросов. Попробуйте позже.'));
      case 500:
        console.error('Ошибка сервера:', error.response.data);
        return Promise.reject(new Error('Ошибка сервера. Попробуйте позже.'));
      default:
        console.error('Ошибка:');
    }

    // Если ошибка 401 и запрос не был на обновление токена
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //флаг _retry, чтобы предотвратить повторное выполнение одного и того же запроса 
      // при ошибке 401. Это предотвращает зацикливание.
      originalRequest._retry = true;
      // Добавляем счетчик повторных попыток
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }
      if (originalRequest._retryCount >= 3) {
        console.error('Превышено количество попыток обновления токена');
        return Promise.reject(error); // Прекращаем попытки после 3 неудач
      }
      originalRequest._retryCount++;


      if (isRefreshing) {
        // Если токен уже обновляется, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Получаем refresh token из AsyncStorage
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Refresh token отсутствует');
        }

        // Отправляем запрос на обновление токена
        const response = await axios.post(
          'https://your-api-url.com/api/auth/refresh',
          {
            refreshToken,
          }
        );

        const { token: newToken, refreshToken: newRefreshToken } =
          response.data;

        // Сохраняем новые токены
        await AsyncStorage.setItem('jwtToken', newToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);

        // Обновляем очередь запросов
        processQueue(null, newToken);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Если обновление токена не удалось, очищаем хранилище и перенаправляем пользователя на экран входа
        await AsyncStorage.removeItem('jwtToken');
        await AsyncStorage.removeItem('refreshToken');
        store.dispatch(logoutUser());
        console.error('Ошибка обновления токена:', err.message);
        // Здесь можно перенаправить пользователя на экран входа
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

//****************************************************************** */
// Пример использования в компоненте:

// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
// import apiClient from './src/api/axiosConfig';

// const ExampleComponent = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await apiClient.get('/example-endpoint'); // Замените на ваш endpoint
//       setData(response.data);
//     } catch (err) {
//       setError(err.message || 'Ошибка при загрузке данных');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <View style={{ padding: 20 }}>
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {error && <Text style={{ color: 'red' }}>{error}</Text>}
//       {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
//       <Button title="Обновить данные" onPress={fetchData} />
//     </View>
//   );
// };

// export default ExampleComponent;

//****************************************************************** */
// Сохранение токена после авторизации

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import apiClient from './src/api/axiosConfig';

// const login = async (email, password) => {
//   try {
//     const response = await apiClient.post('/auth/login', { email, password });
//     const { token } = response.data;

//     // Сохраняем токен в AsyncStorage
//     await AsyncStorage.setItem('jwtToken', token);

//     console.log('Пользователь успешно авторизован');
//   } catch (error) {
//     console.error('Ошибка авторизации:', error.message);
//   }
// };

//******************************************************************** */
// Удаление токена при выходе из системы

// const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('jwtToken');
//       console.log('Пользователь вышел из системы');
//     } catch (error) {
//       console.error('Ошибка при выходе из системы:', error.message);
//     }
//   };
