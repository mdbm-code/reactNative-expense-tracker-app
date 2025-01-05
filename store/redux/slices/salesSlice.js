import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sales } from '../../../data/sales';

const initialState = {
  catalog: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // Добавление списка
    addSales: (state, action) => {
      state.catalog = action.payload;
    },
  },
});

// Экспорт действий для использования в компонентах
export const { addSales } = salesSlice.actions;

// Экспорт редьюсера для добавления в store
export default salesSlice.reducer;
