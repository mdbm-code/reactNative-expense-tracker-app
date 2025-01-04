import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  rows: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  reducers: {
    findAndUpdateOrderRow: (state, action) => {
      const { customerCode, productCode, price, qty } = action.payload
      if (customerCode && productCode && price) {
        let row = state.rows.find(row => row.customerCode === customerCode && row.productCode === productCode);
        if (row) {
          row.price = price;
          row.qty = qty;
          console.log('update exiting row', row);

        } else {
          row = {
            customerCode,
            productCode,
            price,
            qty
          };
          state.rows.push(row);
          console.log('add new row', row);
        }
      }
    },
    //следующий редьюсер
  },

});

// Экспорт действий для использования в компонентах
export const {
  findAndUpdateOrderRow
} = currentOrdersSlice.actions;

// Экспорт редьюсера для добавления в store
export default currentOrdersSlice.reducer;
