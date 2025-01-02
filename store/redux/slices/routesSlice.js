import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { routes } from '../../../data/routes';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://api.example.com/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch customers');
    }
  }
);

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  catalog: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    // Добавление списка
    addRoutes: (state, action) => {
      // console.log('routesSlice.addRoutes.action.payload', action.payload);

      state.catalog = action.payload;
    },
    addRoute: (state, action) => {
      state.catalog = [...state.catalog, { ...action.payload }];
    },
    updateRoute: (state, action) => {
      const { id, changes } = action.payload;
      const existing = state.catalog.find((item) => item.id === id);
      if (existing) {
        Object.assign(existing, changes);
      }
    },
  },
  //- **extraReducers**: Обрабатывает действия, созданные `createAsyncThunk`.
  // Позволяет управлять состоянием загрузки и ошибками:
  // - **pending**: Устанавливает статус загрузки.
  // - **fulfilled**: Обновляет состояние при успешной загрузке данных.
  // - **rejected**: Устанавливает ошибку, если загрузка не удалась.
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const { addRoutes, addRoute, updateRoute } = routesSlice.actions;

// Экспорт редьюсера для добавления в store
export default routesSlice.reducer;
