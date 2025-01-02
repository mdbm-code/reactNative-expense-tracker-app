import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customers } from '../../../data/customers';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
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
  catalog: customers,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Добавление нового клиента
    addNewCustomer: (state, action) => {
      state.catalog.push(action.payload);
    },
    // Добавление списка
    addCustomers: (state, action) => {
      state.catalog = action.payload;
    },
    addRoutes: (state, action) => {
      state.routes = action.payload;
    },
    // Удаление клиента по ID
    removeCustomer: (state, action) => {
      state.catalog = state.catalog.filter(
        (customer) => customer.id !== action.payload
      );
    },
    // Обновление информации о клиенте
    updateCustomer: (state, action) => {
      const { id, changes } = action.payload;
      const existingCustomer = state.catalog.find(
        (customer) => customer.id === id
      );
      if (existingCustomer) {
        Object.assign(existingCustomer, changes);
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
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const { addNewCustomer, addCustomers, removeCustomer, updateCustomer } =
  customersSlice.actions;

// Экспорт редьюсера для добавления в store
export default customersSlice.reducer;
