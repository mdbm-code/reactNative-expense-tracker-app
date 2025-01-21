import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Создаем экземпляр axios с базовыми настройками
const apiClient = axios.create({
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
    // Если сервер возвращает новый токен, сохраняем его
    const newToken = response.headers['x-new-jwt-token']; // Пример: сервер может отправить новый токен в заголовке
    if (newToken) {
      AsyncStorage.setItem('jwtToken', newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и запрос не был на обновление токена
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

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
