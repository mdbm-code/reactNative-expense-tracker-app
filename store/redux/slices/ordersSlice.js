import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const calculateTotals = (items) => {
	let totalAmount = 0;
	let totalReturn = 0;

	items.forEach(item => {
		totalAmount += item.orderQty * item.price;
		totalReturn += item.returnQty * item.price;
	});

	return { totalAmount, totalReturn };
};



const orderApiRequest = createAsyncThunk(
	'orders/orderApiRequest',
	async ({ order, type }, { rejectWithValue }) => {
		try {
			let response;

			switch (type) {
				case 'sendOrder':
					response = await axios.post('/api/orders', order);
					return response.data; // Возвращаем данные для отправки заказа
				case 'getOrdersStatus':
					if (!Array.isArray(order.ids) || order.ids.length === 0) {
						throw new Error('Массив ID заказов не предоставлен или пуст');
					}
					response = await axios.post('/api/orders/status', { orderIds: order.ids });
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
		settings: { itemPerPage: 5 },
		draftOrders: [],   // Для заявок, которые еще не утверждены
		confirmedOrders: [],  // Для окончательных заявок
		orderIdCounter: 0, // Для генерации уникальных кодов
		status: {
			draftOrders: 'idle', // idle | loading | succeeded | failed
			confirmedOrders: 'idle',
		},
		error: null,
	},
	reducers: {
		setOrderId(state, action) {
			const { orderCode, orderId, status, error } = action.payload;
			const orderIndex = state.confirmedOrders.findIndex(o => o.code === orderCode);
			if (orderIndex !== -1) {
				if (orderId) {
					state.confirmedOrders[orderIndex].id = orderId; // обновляем id
				}
				if (status) {
					state.confirmedOrders[orderIndex].status = status; // обновляем id
				}
				if (error) {
					state.confirmedOrders[orderIndex].error = error; // обновляем id
				}
			}
		},
		updateOrderStatus(state, action) {
			const { orderId, status, error } = action.payload;
			const orderIndex = state.confirmedOrders.findIndex(o => o.id === orderId);
			if (orderIndex !== -1) {
				state.confirmedOrders[orderIndex].status = status; // обновляем статус
				state.confirmedOrders[orderIndex].error = error || ''; // обновляем текст ошибки
			}
		},
		addOneOrder: (state, action) => {
			const { stateName } = action.payload;
			if (!['draft', 'confirmed'].includes(stateName)) {
				return state
			}
			const newOrder = { ...action.payload, code: ++state.orderIdCounter };
			const totals = calculateTotals(newOrder.items);
			newOrder.totalAmount = totals.totalAmount;
			newOrder.totalReturn = totals.totalReturn;
			state[`${stateName}Orders`].push(newOrder);
		},
		updateOneOrder: (state, action) => {
			const { stateName, orderCode } = action.payload;
			if (!['draft', 'confirmed'].includes(stateName)) {
				return
			}

			const orders = state[`${stateName}Orders`]; // Извлекаем заказы по stateName
			const index = orders.findIndex(order => order.code === orderCode);

			if (index !== -1) {
				const order = orders[index]; // Сохраняем текущий заказ
				// Сохраняем целые изменения
				// Обновляем текущий заказ, присоединяя изменения
				Object.assign(order, action.payload);

				// Пересчитываем итоговые суммы
				const totals = calculateTotals(order.items); // используем order, поскольку мы обновляем его
				order.totalAmount = totals.totalAmount;
				order.totalReturn = totals.totalReturn;
			}
		},
		setSettings: (state, action) => {
			if (action.payload?.key) {
				state.settings[action.payload.key] = action.payload?.value
			}
		},
		moveOrder: (state, action) => {
			const { sourceStateName, targetStateName, orderCode } = action.payload;
			const validStates = ['draft', 'confirmed'];

			if (!validStates.includes(sourceStateName) || !validStates.includes(targetStateName)) {
				return; // Ранний выход, если состояние некорректно
			}

			const ordersSource = state[`${sourceStateName}Orders`];
			const ordersTarget = state[`${targetStateName}Orders`];
			const orderIndex = ordersSource.findIndex(order => order.code === orderCode);

			if (orderIndex === -1) {
				return; // Ранний выход, если заказ не найден
			}

			const orderToMove = ordersSource[orderIndex];
			// Добавляем в целевое состояние
			ordersTarget.push(orderToMove);

			// Удаляем из исходного состояния
			ordersSource.splice(orderIndex, 1); // Удаляем

		},
		removeOneOrder: (state, action) => {
			const { stateName, orderCode } = action.payload;
			if (!['draft', 'confirmed'].includes(stateName)) {
				return;
			}
			const orders = state[`${stateName}Orders`];
			const index = orders.findIndex(order => order.code === orderCode);
			if (index !== -1) {
				orders.splice(index, 1); // Правильное удаление элемента
			}
		},
		updateOrderItem: (state, action) => {
			const { stateName, orderCode, productName, productCode, orderQty, returnQty, customerCode, base_price, default_price, price } = action.payload;
			if (!['draft', 'confirmed'].includes(stateName)) {
				return; // Ранний выход, если stateName некорректен
			}
			let orderIndex = -1;
			if (stateName === 'confirmed') {
				orderIndex = state.confirmedOrders.findIndex(order => order.code === orderCode);
			} else {
				orderIndex = state.draftOrders.findIndex(order => order.customerCode === customerCode);
			}

			let order = null;
			if (orderIndex !== -1) {
				order = state[`${stateName}Orders`][orderIndex];

				const itemIndex = order.items.findIndex(item => item.productCode === productCode);
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
						customerCode,
						productCode,
						base_price,
						default_price,
						price,
						orderQty: orderQty,
						returnQty: returnQty,
					}
					order.items.push(newRow);
				}
				// Пересчитываем итоговые суммы после изменения товара
				const totals = calculateTotals(order.items); // используем order, поскольку мы обновляем его
				order.totalAmount = totals.totalAmount;
				order.totalReturn = totals.totalReturn;
			} else {
				//создаем новый заказ
				const newOrder = {
					code: ++state.orderIdCounter,
					customerCode: action.payload.customerCode,
					customerName: action.payload?.customerName,
					totalAmount: 0,
					totalReturn: 0,
					items: [{
						productCode,
						productName,
						base_price,
						default_price,
						price,
						orderQty: orderQty,
						returnQty: returnQty,
					}],
					baseTotal: 0,
					percent: 0,
					minSum: action.payload?.minSum || 0,
				};
				// Обновляем итоговые суммы
				const totals = calculateTotals(newOrder.items); // используем order, поскольку мы обновляем его
				newOrder.totalAmount = totals.totalAmount;
				newOrder.totalReturn = totals.totalReturn;
				state[`${stateName}Orders`].push(newOrder);
			}

		},
		createNewItem: (productCode, productName, base_price, default_price, price, orderQty, returnQty) => {
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
				code: ++payload.state.orderIdCounter,
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
			}
		},
		deleteItemFromOrder: (state, action) => {
			const { stateName, orderCode, productCode } = action.payload;
			if (!['draft', 'confirmed'].includes(stateName)) {
				return; // Ранний выход, если stateName некорректен
			}
			const orderIndex = state[`${stateName}Orders`].findIndex(order => order.code === orderCode);

			if (orderIndex !== -1) {
				const order = state[`${stateName}Orders`][orderIndex];
				const itemIndex = order.items.findIndex(item => item.productCode === productCode);
				if (itemIndex !== -1) {
					// Удаляем товар 
					order.items.splice(itemIndex, 1);

					// Пересчитываем итоговые суммы после удаления товара
					const totals = calculateTotals(order.items);
					order.totalAmount = totals.totalAmount;
					order.totalReturn = totals.totalReturn;
				}
			}
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(orderApiRequest.pending, (state, action) => {
				if (action.meta.arg.type === 'sendOrder') {
					state.status.confirmedOrders = 'loading';
				}
			})
			.addCase(orderApiRequest.fulfilled, (state, action) => {
				if (action.meta.arg.type === 'sendOrder') {
					const orderIndex = state.confirmedOrders.findIndex(order => order.code === action.meta.arg.order.code);
					if (orderIndex !== -1) {
						state.confirmedOrders[orderIndex] = {
							...state.confirmedOrders[orderIndex],
							id: action.payload.id,
							status: action.payload.status,
						};
					}
					state.status.confirmedOrders = 'succeeded';
					state.error = null;
				} else if (action.meta.arg.type === 'getOrdersStatus') {
					const statuses = action.payload;
					statuses.forEach(({ orderId, status }) => {
						const orderIndex = state.confirmedOrders.findIndex(o => o.id === orderId);
						if (orderIndex !== -1) {
							state.confirmedOrders[orderIndex].status = status; // Обновляем статус заказа напрямую
						}
					});
				}
			})
			.addCase(orderApiRequest.rejected, (state, action) => {
				if (action.meta.arg.type === 'sendOrder') {
					const orderIndex = state.confirmedOrders.findIndex(order => order.code === action.meta.arg.order.code);
					if (orderIndex !== -1) {
						// Обновляем статус на "НеДоставлено" в случае ошибки
						state.confirmedOrders[orderIndex].status = 'failed';
					}
					state.status.confirmedOrders = 'failed';
					state.error = action.payload;
				}
				// Обработка ошибок для getOrderStatus не требуется, так как already handled in moveAndSendOrder.
			});
	}
});

export const getOrderStatusFromServer = () => async (dispatch, getState) => {
	const state = getState();
	const targetOrders = state.orders?.confirmedOrders || [];

	const ordersToUpdate = targetOrders.filter(order => {
		const status = order.status;
		return status === 'failed' || status === undefined;
	});

	const orderIds = ordersToUpdate.map(order => order.id);

	if (orderIds.length === 0) {
		console.log('Нет заказов для обновления статуса');
		return;
	}

	await dispatch(orderApiRequest({ order: { ids: orderIds }, type: 'getOrdersStatus' }));
};

export const moveAndSendOrder = (orderCode, sourceStateName, targetStateName) => async (dispatch, getState) => {
	dispatch(moveOrder({ sourceStateName, targetStateName, orderCode }));

	const state = getState();
	const targetOrders = state.orders[`${targetStateName}Orders`];

	const order = targetOrders.find(order => order.code === orderCode);

	if (!order) {
		console.error(`Ошибка: заказ ${orderCode} не был перемещен из состояния ${sourceStateName} в состояние ${targetStateName}`);
		return;
	}

	await dispatch(orderApiRequest({ order, type: 'sendOrder' }));
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
	updateOneOrder,
	confirmDraftOrder,
	removeOneOrder,
	updateOrderItem,
	deleteItemFromOrder,
	setSettings,
} = ordersSlice.actions;

// Экспорт редьюсера для добавления в store
export default ordersSlice.reducer;
