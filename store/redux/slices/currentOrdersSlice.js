import { createSlice } from '@reduxjs/toolkit';


const recalculateTotalForCustomer = (state, customerCode, minSum) => {
  const customerRows = state.rows.filter(row => row.customerCode === customerCode);
  let total = 0;
  let baseTotal = 0;
  customerRows.forEach(row => {
    total += row.price * +row.qty;
    baseTotal += row.base_price * +row.qty;
  });
  // Округление до двух знаков после запятой
  total = Math.round(total * 100) / 100;
  baseTotal = Math.round(baseTotal * 100) / 100;

  let percent = 0;
  if (baseTotal > 0) {
    percent = ((total - baseTotal) / baseTotal) * 100;
    percent = Math.round(percent * 100) / 100; // Округление процента
  }
  const existingDoc = state.docs.find(doc => doc.customerCode === customerCode);
  if (existingDoc) {
    existingDoc.total = total;
  } else {
    state.docs.push({
      customerCode,
      total,
      baseTotal,
      percent,
      minSum
    });
  }
};

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  rows: [],
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
      const { customerCode, productCode, price, base_price, qty, minSum } = action.payload
      if (customerCode && productCode && price) {
        let row = state.rows.find(row => row.customerCode === customerCode && row.productCode === productCode);
        if (row) {
          row.price = price;
          row.qty = qty;
          // console.log('update exiting row', row);

        } else {
          console.log('add new row', { customerCode, productCode, base_price, price, qty });

          row = {
            customerCode,
            productCode,
            base_price,
            price,
            qty
          };
          state.rows.push(row);
          // console.log('add new row', row);
        }
        recalculateTotalForCustomer(state, customerCode, minSum);
      }
    },
    recalculateCustomerOrder: (state, action) => {
      const { customerCode } = action.payload;
      recalculateTotalForCustomer(state, customerCode);
    }
    //следующий редьюсер
  },

});

// Экспорт действий для использования в компонентах
export const {
  recalculateCustomerOrder,
  findAndUpdateOrderRow
} = currentOrdersSlice.actions;

// Экспорт редьюсера для добавления в store
export default currentOrdersSlice.reducer;
