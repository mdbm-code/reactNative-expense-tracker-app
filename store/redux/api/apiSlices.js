// Импортируем необходимые функции и модули из библиотеки Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Импортируем действие (action) logout из файла authSlice.js, чтобы использовать его для выхода пользователя
import { logout } from '../features/user/userSlice';
import { BASE_URL } from '../../../constans/urls';

// Создаем функцию baseQuery, которая будет обрабатывать запросы к API
// Эта функция принимает параметры baseQueryOptions (например, базовый URL) и возвращает асинхронную функцию
const baseQuery = (baseQueryOptions) => async (args, api, extraOptions) => {
  // Деструктурируем объект api, чтобы получить доступ к signal (для отмены запросов), dispatch (для вызова действий) и getState (для получения текущего состояния Redux)
  const { signal, dispatch, getState } = api;

  // Выполняем запрос к API с помощью fetchBaseQuery, передавая параметры baseQueryOptions, args (аргументы запроса), api и extraOptions
  const result = await fetchBaseQuery(baseQueryOptions)(args, api, extraOptions);

  // Проверяем, есть ли ошибка в результате запроса
  if (result.error) {
    // Деструктурируем объект ошибки, чтобы получить данные ошибки (data) и статус HTTP (status)
    const { data, status } = result.error;

    // Если статус ошибки равен 409 (конфликт, например, истекший токен), вызываем действие logout, чтобы выйти из учетной записи пользователя
    if (status === 409) {
      dispatch(logout());
    }
  }

  // Возвращаем результат запроса (успешный или с ошибкой)
  return result;
};

// Создаем API slice (часть состояния Redux, связанная с API-запросами)
// Используем функцию createApi из Redux Toolkit Query
export const apiSlice = createApi({
  // Указываем путь для редьюсера в общем состоянии Redux (reducerPath)
  reducerPath: 'api', // Это имя, под которым API slice будет храниться в Redux-хранилище

  // Указываем базовый запрос (baseQuery), который мы создали ранее
  baseQuery: baseQuery({ baseUrl: BASE_URL }), // BASE_URL — это базовый URL для всех запросов к API

  // Определяем типы тегов (tagTypes), которые будут использоваться для кэширования данных
  tagTypes: [], // Пока массив пустой, но сюда можно добавить теги, например, 'User', 'Posts'

  // Определяем эндпоинты (endpoints) — функции для выполнения конкретных запросов к API
  endpoints: (builder) => ({
    sendErrorLog: builder.mutation({
      query: (errorLog) => ({
        url: '/log-errors',
        method: 'POST',
        body: { errors: errorLog },
      }),
    }),
  }), // Пока эндпоинты не определены, но сюда можно добавить запросы, например, получение списка пользователей
});


export const { useSendErrorLogMutation } = apiSlice;