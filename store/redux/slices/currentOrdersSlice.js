import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  docs: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  reducers: {

    findAndUpdateOrderRow: (state, action) => {
      const { customerId, productId, price, qty } = action.payload
      if (customerId && productId && price) {
        const existedRow = state.rows.find(row => row.customerId === customerId && row.productId === productId);
        if (existedRow) {
          existedRow.price = price;
          existedRow.qty = qty;
        } else {
          state.rows.push({ customerId, productId, price, qty });
        }
      } else {
        return state.rows
      }
    }
  },

});

// Экспорт действий для использования в компонентах
export const {
  findAndUpdateOrderRow
} = currentOrdersSlice.actions;

// Экспорт редьюсера для добавления в store
export default currentOrdersSlice.reducer;
