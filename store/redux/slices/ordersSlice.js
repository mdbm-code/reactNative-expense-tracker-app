import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
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
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Добавление списка
    addOrders: (state, action) => {
      state.catalog = action.payload;
    },
    addOrder: (state, action) => {
      state.catalog = [...state.catalog, { ...action.payload }];
    },
    updateOrder: (state, action) => {
      const { id, changes } = action.payload;
      const existingOrder = state.catalog.find((order) => order.id === id);
      if (existingOrder) {
        Object.assign(existingOrder, changes);
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
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const { addOrders, addOrder, updateOrder } = ordersSlice.actions;

// Экспорт редьюсера для добавления в store
export default ordersSlice.reducer;