import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _log from 'react-dev-log';

const calculateTotals = (items) => {
  let totalAmount = 0;
  let totalReturn = 0;
  let totalBase = 0;

  items.forEach((item) => {
    if (item.orderQty) {
      totalAmount += Number(item.orderQty) * Number(item.price);
    }
    if (item.returnQty) {
      totalReturn += Number(item.returnQty) * Number(item.price);
    }
    if (item.orderQty && item.base_price) {
      totalBase += Number(item.orderQty) * Number(item.base_price);
    }
  });

  totalAmount = Math.round(totalAmount * 100) / 100;
  totalReturn = Math.round(totalReturn * 100) / 100;
  totalBase = Math.round(totalBase * 100) / 100;

  return { totalAmount, totalReturn, totalBase };
};

const orderApiRequest = createAsyncThunk(
  'orders/orderApiRequest',
  async ({ order, type }, { rejectWithValue }) => {
    try {
      let response;

      switch (type) {
        case 'sendOrder':
          // console.log('orderApiRequest.type', 'sendOrder');
          response = await axios.post('/api/orders', order);
          // console.log('response', response);
          // console.log('response.data', response.data);

          return response.data; // Возвращаем данные для отправки заказа
        case 'getOrdersStatus':
          if (!Array.isArray(order.ids) || order.ids.length === 0) {
            throw new Error('Массив ID заказов не предоставлен или пуст');
          }
          response = await axios.post('/api/orders/status', {
            orderIds: order.ids,
          });
          return response.data; // Возвращаем статус заказа
        default:
          throw new Error('Неизвестный тип запроса');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Неизвестная ошибка'); // Задаем сообщение об ошибке
    }
  }
);

// // Асинхронный action для получения статуса заказа с сервера
// export const getOrderStatusFromServer = createAsyncThunk(
// 	'orders/getOrderStatusFromServer',
// 	async (orderId, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.get(`/api/orders/status/${orderId}`);
// 			return response.data; // Предполагаем, что сервер возвращает статус заказа
// 		} catch (error) {
// 			return rejectWithValue('Не удалось получить статус заказа'); // Задаем сообщение об ошибке
// 		}
// 	}
// );

// // Асинхронный action для отправки заказа на сервер
// export const sendOrderToServer = createAsyncThunk(
// 	'orders/sendOrderToServer',
// 	async (order, { rejectWithValue }) => {
// 		//Когда вы используете rejectWithValue в асинхронном редюсере (например, в createAsyncThunk),
// 		// вместо стандартного механизма обработки ошибок, вы возвращаете ошибку через rejectWithValue.
// 		// Это позволяет вам передать собственное значение,
// 		// которое будет доступно в action.payload после того, как действие будет отклонено.

// 		try {
// 			const response = await axios.post('/api/orders', order);
// 			return response.data; // Предполагаем, что сервер возвращает идентификатор и статус
// 		} catch (error) {
// 			return rejectWithValue('НеДоставлено'); // Задаем сообщение о неудаче
// 		}
// 	}
// );

// Создание слайса
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    selectedOrder: {},
    catalog: [],
    settings: { itemsPerPage: 5 },
    orderIdCounter: 0, // Для генерации уникальных кодов
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setOrderId(state, action) {
      const { orderCode, orderId, status, error } = action.payload;
      const orderIndex = state.catalog.findIndex((o) => o.code === orderCode);
      if (orderIndex !== -1) {
        if (orderId) {
          state.catalog[orderIndex].id = orderId; // обновляем id
        }
        if (status) {
          state.catalog[orderIndex].status = status; // обновляем id
        }
        if (error) {
          state.catalog[orderIndex].error = error; // обновляем id
        }
      }
    },
    updateOrderStatus(state, action) {
      const { orderId, orderCode, status, error } = action.payload;
      let orderIndex = -1;
      if (orderCode) {
        orderIndex = state.catalog.findIndex((o) => o.code === orderCode);
      }
      if (orderId) {
        orderIndex = state.catalog.findIndex((o) => o.id === orderId);
      }
      if (orderIndex !== -1) {
        state.catalog[orderIndex].status = status; // обновляем статус
        state.catalog[orderIndex].error = error || ''; // обновляем текст ошибки
      }
    },
    addOneOrder: (state, action) => {
      const newOrder = { ...action.payload, code: ++state.orderIdCounter };
      const totals = calculateTotals(newOrder.items);
      newOrder.totalAmount = totals.totalAmount;
      newOrder.totalReturn = totals.totalReturn;
      newOrder.totalBase = totals.totalBase;
      state.catalog.push(newOrder);
    },
    updateOneOrder: (state, action) => {
      const { orderCode } = action.payload;
      const index = state.catalog.findIndex(
        (order) => order.code === orderCode
      );

      if (index !== -1) {
        const order = state.catalog[index]; // Сохраняем текущий заказ
        // Сохраняем целые изменения
        // Обновляем текущий заказ, присоединяя изменения
        Object.assign(order, action.payload);

        // Пересчитываем итоговые суммы
        const totals = calculateTotals(order.items); // используем order, поскольку мы обновляем его
        order.totalAmount = totals.totalAmount;
        order.totalReturn = totals.totalReturn;
        order.totalBase = totals.totalBase;
      }
    },
    setSelectedOrder: (state, action) => {
      if (typeof action.payload === 'object') {
        state.selectedOrder = action.payload;
      }
    },
    setSettings: (state, action) => {
      if (action.payload?.key) {
        state.settings[action.payload.key] = action.payload?.value;
      }
    },
    moveOrder: (state, action) => {
      // const { sourceStateName, targetStateName, orderCode } = action.payload;
      // const validStates = ['draft', 'confirmed'];
      // if (!validStates.includes(sourceStateName) || !validStates.includes(targetStateName)) {
      // 	return; // Ранний выход, если состояние некорректно
      // }
      // const ordersSource = state[`${sourceStateName}Orders`];
      // const ordersTarget = state[`${targetStateName}Orders`];
      // const orderIndex = ordersSource.findIndex(order => order.code === orderCode);
      // if (orderIndex === -1) {
      // 	return; // Ранний выход, если заказ не найден
      // }
      // const orderToMove = ordersSource[orderIndex];
      // // Добавляем в целевое состояние
      // ordersTarget.push(orderToMove);
      // // Удаляем из исходного состояния
      // ordersSource.splice(orderIndex, 1); // Удаляем
    },
    removeOneOrder: (state, action) => {
      const { orderCode } = action.payload;
      const index = state.catalog.findIndex(
        (order) => order.code === orderCode
      );
      if (index !== -1) {
        orders.splice(index, 1); // Правильное удаление элемента
      }
    },
    addOneOrderWithItem: (state, action) => {
      const {
        productName,
        productCode,
        orderQty,
        returnQty,
        customerCode,
        customerName,
        minSum,
        base_price,
        default_price,
        price,
      } = action.payload;

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('ru-RU'); // Формат для России

      const newOrder = {
        code: ++state.orderIdCounter,
        date: currentDate,
        formattedDate: formattedDate,
        status: 'draft',
        customerCode,
        customerName,
        minSum: minSum,
        totalAmount: 0,
        totalReturn: 0,
        items: [
          {
            productCode,
            productName,
            base_price,
            default_price,
            price,
            orderQty,
            returnQty,
          },
        ],
      };

      const totals = calculateTotals(newOrder.items); // используем order, поскольку мы обновляем его
      newOrder.totalAmount = totals.totalAmount;
      newOrder.totalReturn = totals.totalReturn;
      newOrder.totalBase = totals.totalBase;

      //записываем в качестве текущего
      state.selectedOrder = newOrder;

      if (!Array.isArray(state.catalog)) {
        state.catalog = [];
      }
      //сохраняем новый заказ в журнале заявок
      state.catalog.push(newOrder);
    },
    updateSelectedOrderItem: (state, action) => {
      const {
        productName,
        productCode,
        orderQty,
        returnQty,
        base_price,
        default_price,
        price,
      } = action.payload;
      const orderCode = state?.selectedOrder?.code;
      const orderIndex = state.catalog.findIndex(
        (order) => order.code === orderCode
      );
      if (orderIndex === -1) {
        return state;
      }

      const order = state.catalog[orderIndex];

      const itemIndex = order.items.findIndex(
        (item) => item.productCode === productCode
      );
      if (itemIndex !== -1) {
        const item = order.items[itemIndex];

        // Обновляем количество и возврат товара
        if (orderQty !== undefined) {
          item.orderQty = orderQty;
        }
        if (returnQty !== undefined) {
          item.returnQty = returnQty;
        }
      } else {
        // Добавляем новый товар
        const newRow = {
          productCode,
          productName,
          base_price,
          default_price,
          price,
          orderQty: orderQty,
          returnQty: returnQty,
        };
        order.items.push(newRow);
      }
      // Пересчитываем итоговые суммы после изменения товара
      const totals = calculateTotals(order.items); // используем order, поскольку мы обновляем его
      order.totalAmount = totals.totalAmount;
      order.totalReturn = totals.totalReturn;
      order.totalBase = totals.totalBase;
      state.selectedOrder = order; //обновляем также выбранный заказ
    },
    createNewItem: (
      productCode,
      productName,
      base_price,
      default_price,
      price,
      orderQty,
      returnQty
    ) => {
      return {
        productCode,
        productName,
        base_price,
        default_price,
        price,
        orderQty,
        returnQty,
      };
    },
    createNewOrder: (payload) => {
      const newOrder = {
        code: ++state.orderIdCounter,
        customerCode: payload.customerCode,
        customerName: payload?.customerName,
        totalAmount: 0,
        totalReturn: 0,
        items: [],
        baseTotal: 0,
        percent: 0,
        minSum: payload.minSum || 0,
      };
      return newOrder;
    },
    updateTotals: (order) => {
      if (order) {
        const totals = calculateTotals(order.items);
        order.totalAmount = totals.totalAmount;
        order.totalReturn = totals.totalReturn;
        order.totalBase = totals.totalBase;
      }
    },
    deleteItemFromOrder: (state, action) => {
      const { orderCode, productCode } = action.payload;
      const orderIndex = state.catalog.findIndex(
        (order) => order.code === orderCode
      );

      if (orderIndex !== -1) {
        const order = state.catalog[orderIndex];
        const itemIndex = order.items.findIndex(
          (item) => item.productCode === productCode
        );
        if (itemIndex !== -1) {
          // Удаляем товар
          order.items.splice(itemIndex, 1);

          // Пересчитываем итоговые суммы после удаления товара
          const totals = calculateTotals(order.items);
          order.totalAmount = totals.totalAmount;
          order.totalReturn = totals.totalReturn;
          order.totalBase = totals.totalBase;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderApiRequest.pending, (state, action) => {
        if (action.meta.arg.type === 'sendOrder') {
          // state.status.catalog = 'loading';
        }
      })
      .addCase(orderApiRequest.fulfilled, (state, action) => {
        if (action.meta.arg.type === 'sendOrder') {
          const orderIndex = state.catalog.findIndex(
            (order) => order.code === action.meta.arg.order.code
          );
          if (orderIndex !== -1) {
            state.catalog[orderIndex] = {
              ...state.catalog[orderIndex],
              id: action.payload.id,
              status: action.payload.status,
              error: '',
            };
          }
          // state.status.catalog = 'succeeded';
          // state.error = null;
        } else if (action.meta.arg.type === 'getOrdersStatus') {
          const statuses = action.payload;
          statuses.forEach(({ orderId, status }) => {
            const orderIndex = state.catalog.findIndex((o) => o.id === orderId);
            if (orderIndex !== -1) {
              state.catalog[orderIndex].status = status; // Обновляем статус заказа напрямую
            }
          });
        }
      })
      .addCase(orderApiRequest.rejected, (state, action) => {
        if (action.meta.arg.type === 'sendOrder') {
          const orderIndex = state.catalog.findIndex(
            (order) => order.code === action.meta.arg.order.code
          );
          if (orderIndex !== -1) {
            // Обновляем статус на "НеДоставлено" в случае ошибки
            state.catalog[orderIndex].status = 'failed';
            state.catalog[orderIndex].error = action.payload;
          }
          // state.status.catalog = 'failed';
          // state.error = action.payload;
        }
        // Обработка ошибок для getOrderStatus не требуется, так как already handled in moveAndSendOrder.
      });
  },
});

export const getOrderStatusFromServer = () => async (dispatch, getState) => {
  const state = getState();
  const targetOrders = state.orders?.catalog || [];

  const ordersToUpdate = targetOrders.filter((order) => {
    const status = order.status;
    return status === 'failed' || status === undefined;
  });

  const orderIds = ordersToUpdate.map((order) => order.id);

  if (orderIds.length === 0) {
    console.log('Нет заказов для обновления статуса');
    return;
  }

  await dispatch(
    orderApiRequest({ order: { ids: orderIds }, type: 'getOrdersStatus' })
  );
};

export const confirmAndSendOrder =
  (orderCode) => async (dispatch, getState) => {
    // dispatch(moveOrder({ sourceStateName, targetStateName, orderCode }));
    if (!orderCode) {
      return;
    }
    // _log('confirmAndSendOrder', orderCode);
    dispatch(
      updateOrderStatus({ orderId: null, orderCode, status: 'confirmed' })
    );

    const state = getState();
    const orders = state.orders.catalog;
    const order = orders.find((order) => order.code === orderCode);
    if (!order) {
      console.error(`Ошибка: заказ ${orderCode} не найден`);
      return;
    }
    await dispatch(orderApiRequest({ order, type: 'sendOrder' }));
  };

export const setSelectedOrderByCode = (orderCode) => (dispatch, getState) => {
  // dispatch(moveOrder({ sourceStateName, targetStateName, orderCode }));
  if (!orderCode) {
    return;
  }

  const state = getState();
  const orders = state.orders.catalog;
  const order = orders.find((order) => order.code === orderCode);
  if (!order) {
    const errorMassage = `Ошибка: заказ ${orderCode} не найден`;
    return errorMassage;
  }
  dispatch(setSelectedOrder(order));
};

// export const getOrderStatusFromServer = () => async (dispatch, getState) => {
// 	// Получаем текущее состояние
// 	const state = getState();
// 	const targetOrders = state.orders.confirmedOrders; // Доступ к заказам

// 	// Фильтруем заказы, у которых статус failed, null или undefined
// 	const ordersToUpdate = targetOrders.filter(order => {
// 		const status = order.status; // Это извлекает status, может быть undefined
// 		return status === 'failed' || status === undefined; // Проверка статуса
// 	});

// 	// Получаем массив идентификаторов
// 	const orderIds = ordersToUpdate.map(order => order.id);

// 	if (orderIds.length === 0) {
// 		console.log('Нет заказов для обновления статуса');
// 		return; // Если нет заказов для обновления, выходим
// 	}

// 	// Отправляем массив идентификаторов на сервер через универсальный экшен
// 	const resultAction = await dispatch(orderApiRequest({ order: { ids: orderIds }, type: 'getOrderStatus' }));

// 	// Проверяем успешность результата
// 	if (orderApiRequest.fulfilled.match(resultAction)) {
// 		//обрабатываем успех получения в extraReducers

// 		// const statuses = resultAction.payload; // Предполагаем, что сервер возвращает массив статусов для заказов

// 		// // Обновляем каждый заказ в состоянии
// 		// statuses.forEach(({ orderId, status }) => {
// 		// 	dispatch(updateOrderStatus({ orderId, status }));
// 		// });
// 	} else {
// 		console.error('Ошибка при получении статусов заказов:', resultAction.payload);
// 	}

// };

// export const moveAndSendOrder = (orderCode, sourceStateName, targetStateName) => async (dispatch, getState) => {
// 	// Перемещаем заказ в окончательные
// 	dispatch(moveOrder({ sourceStateName, targetStateName, orderCode }));

// 	// Получаем текущее состояние
// 	const state = getState(); // Сохраняем состояние
// 	const targetOrders = state.orders[`${targetStateName}Orders`]; // Доступ к целевым заказам

// 	// Проверяем, появился ли заказ в целевом состоянии
// 	const order = targetOrders.find(order => order.code === orderCode);

// 	if (!order) {
// 		console.error(`Ошибка: заказ ${orderCode} не был перемещен из состояния ${sourceStateName} в состояние ${targetStateName}`);
// 		return; // Если order не найден, выходим из функции
// 	}
// 	// Вызываем отправку заказа и ждем результата
// 	// const resultAction = await dispatch(sendOrderToServer(order)); // Здесь мы используем ваш асинхронный action
// 	// Вариант использования универсального экшена
// 	const resultAction = await dispatch(orderApiRequest({ order, type: 'sendOrder' }));

// 	// Проверяем, успешен ли результат
// 	if (orderApiRequest.fulfilled.match(resultAction)) {
// 		// Если отправка успешна, обновляем статус заказов
// 		const orderIndex = targetOrders.findIndex(o => o.code === order.code); // используем целевое состояние
// 		if (orderIndex !== -1) {
// 			dispatch(setOrderId({
// 				orderCode,
// 				orderId: resultAction.payload.id,
// 				status: resultAction.payload.status
// 			})); // Обработка успешной отправки
// 		}
// 	} else {
// 		// Обработка ошибки
// 		const errorMessage = resultAction.payload || resultAction.error.message; // Получаем сообщение об ошибке
// 		const orderIndex = targetOrders.findIndex(o => o.code === order.code);
// 		if (orderIndex !== -1) {
// 			dispatch(setOrderId({
// 				orderCode,
// 				status: 'failed',
// 				error: errorMessage
// 			})); // Обработка ошибки
// 		}
// 	}
// }

// Экспорт действий для использования в компонентах
export const {
  addOneOrder,
  updateOrderStatus,
  setSelectedOrder,
  addOneOrderWithItem,
  updateOneOrder,
  confirmDraftOrder,
  removeOneOrder,
  updateSelectedOrderItem,
  deleteItemFromOrder,
  setSettings,
} = ordersSlice.actions;

// Экспорт редьюсера для добавления в store
export default ordersSlice.reducer;
