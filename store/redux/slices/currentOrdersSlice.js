import { createSlice } from '@reduxjs/toolkit';

function getNewCode(customerCode) {
  return `${customerCode}-${Date.now()}`;
}

const recalculateTotalForCustomer = (state, customerCode, minSum) => {
  const customerRows = state.rows.filter(
    (row) => row.customerCode === customerCode
  );
  let total = 0;
  let totalRet = 0;
  let baseTotal = 0;
  let baseTotalRet = 0;

  customerRows.forEach((row) => {
    if (row?.qty && +row.qty > 0) {
      total += row.price * +row.qty;
      baseTotal += row.base_price * +row.qty;
    }
    if (row?.ret && +row.ret > 0) {
      totalRet += row.price * +row.ret;
      baseTotalRet += row.base_price * +row.ret;
    }
  });
  // Округление до двух знаков после запятой
  total = Math.round(total * 100) / 100;
  baseTotal = Math.round(baseTotal * 100) / 100;

  totalRet = Math.round(totalRet * 100) / 100;
  baseTotalRet = Math.round(baseTotalRet * 100) / 100;

  let percent = 0;
  if (baseTotal > 0) {
    percent = ((total - baseTotal) / baseTotal) * 100;
    percent = Math.round(percent * 100) / 100; // Округление процента
  }
  const existingDoc = state.docs.find(
    (doc) => doc.customerCode === customerCode
  );
  if (existingDoc) {
    existingDoc.total = total;
    existingDoc.baseTotal = baseTotal;
    existingDoc.percent = percent;

    existingDoc.totalRet = totalRet;
    existingDoc.baseTotalRet = baseTotalRet;
  } else {
    state.docs.push({
      code: getNewCode(customerCode),
      customerCode,
      total,
      baseTotal,
      percent,
      minSum,
      totalRet,
      baseTotalRet,
    });
  }
};
const recalculateReturnTotalForCustomer = (state, customerCode) => {
  const customerRows = state.returnRows.filter(
    (row) => row.customerCode === customerCode
  );
  let totalReturn = 0;
  customerRows.forEach((row) => {
    if (row?.qty && +row.qty > 0) {
      totalReturn += row.price * +row.qty;
    }
  });
  // Округление до двух знаков после запятой
  totalReturn = Math.round(totalReturn * 100) / 100;

  const existingDoc = state.docs.find(
    (doc) => doc.customerCode === customerCode
  );
  if (existingDoc) {
    existingDoc.totalReturn = totalReturn;
  } else {
    state.docs.push({
      code: getNewCode(customerCode),
      customerCode,
      total: 0,
      baseTotal: 0,
      percent: 0,
      minSum: 0,
      totalReturn,
    });
  }
};

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  returnRows: [],
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
    deleteOrderRow: (state, action) => {
      const { customerCode, productCode } = action.payload;

      if (customerCode && productCode) {
        // console.log('Удаляем из заказа ', customerCode, productCode);
        state.rows = state.rows.filter(
          (row) =>
            !(
              row.customerCode === customerCode &&
              row.productCode === productCode
            )
        );
        recalculateTotalForCustomer(state, customerCode);
      }
    },
    deleteReturnRow: (state, action) => {
      const { customerCode, productCode } = action.payload;

      if (customerCode && productCode) {
        // console.log('Удаляем из заказа ', customerCode, productCode);
        state.returnRows = state.returnRows.filter(
          (row) =>
            !(
              row.customerCode === customerCode &&
              row.productCode === productCode
            )
        );
        recalculateReturnTotalForCustomer(state, customerCode);
      }
    },
    findAndUpdateOrderRow: (state, action) => {
      const {
        customerCode,
        productCode,
        price,
        base_price,
        qty,
        ret,
        minSum,
        default_price,
        goal,
      } = action.payload;

      if (customerCode && productCode && ['order', 'return'].includes(goal)) {
        let row = state.rows.find(
          (row) =>
            row.customerCode === customerCode && row.productCode === productCode
        );

        if (row) {
          row.price = price;
          if (!isNaN(qty)) row.qty = qty;
          if (!isNaN(ret)) row.ret = ret;
        } else {
          row = {
            customerCode,
            productCode,
            base_price,
            default_price,
            price,
            qty: qty,
            ret: ret,
          };
          state.rows.push(row);
          // console.log('add new row', row);
        }

        recalculateTotalForCustomer(state, customerCode, minSum);
      }
    },
    findAndUpdateReturnRow: (state, action) => {
      // const { customerCode, productCode, price, qty } = action.payload;
      // if (customerCode && productCode && price) {
      //   let row = state.returnRows.find(
      //     (row) =>
      //       row.customerCode === customerCode && row.productCode === productCode
      //   );
      //   if (row) {
      //     row.price = price;
      //     row.qty = qty;
      //     // console.log('update exiting row', row);
      //   } else {
      //     row = {
      //       customerCode,
      //       productCode,
      //       price,
      //       qty,
      //     };
      //     state.returnRows.push(row);
      //     // console.log('add new row', row);
      //   }
      //   recalculateReturnTotalForCustomer(state, customerCode);
      // }
    },
    recalculateCustomerOrder: (state, action) => {
      const { customerCode } = action.payload;
      recalculateTotalForCustomer(state, customerCode);
    },
    recalculateCustomerReturn: (state, action) => {
      const { customerCode } = action.payload;
      recalculateReturnTotalForCustomer(state, customerCode);
    },
    //следующий редьюсер
  },
});

// Экспорт действий для использования в компонентах
export const {
  recalculateCustomerOrder,
  recalculateCustomerReturn,
  findAndUpdateOrderRow,
  findAndUpdateReturnRow,
  deleteOrderRow,
  deleteReturnRow,
} = currentOrdersSlice.actions;

// Экспорт редьюсера для добавления в store
export default currentOrdersSlice.reducer;
