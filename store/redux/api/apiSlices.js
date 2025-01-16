// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com/' }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => 'images', // Замените на ваш путь
    }),
  }),
});

export const { useGetImagesQuery } = apiSlice;
