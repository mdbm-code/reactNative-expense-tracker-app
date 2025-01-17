import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { products } from '../../../data/products';
import { inventory } from '../../../data/inventory';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
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
  inventory: {},
  catalog: products,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Добавление списка
    addProducts: (state, action) => {
      state.catalog = action.payload;
    },
    addInventory: (state, action) => {
      const updatedData = {};
      action.payload.forEach((item) => {
        updatedData[item.code] = item.qty;
      });
      // console.log('updated inventory data', updatedData);

      state.inventory = updatedData;
    },
    updateInventory: (state, action) => {
      action.payload.forEach((item) => {
        state.inventory[item.code] = item.qty;
      });
    },
  },
  //- **extraReducers**: Обрабатывает действия, созданные `createAsyncThunk`.
  // Позволяет управлять состоянием загрузки и ошибками:
  // - **pending**: Устанавливает статус загрузки.
  // - **fulfilled**: Обновляет состояние при успешной загрузке данных.
  // - **rejected**: Устанавливает ошибку, если загрузка не удалась.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const { addProducts, addInventory, updateInventory } =
  productsSlice.actions;

// Экспорт редьюсера для добавления в store
export default productsSlice.reducer;
