// src /
// ├── app /
// │   ├── store.js                 // Конфигурация Redux хранилища и персистентности
// ├── features /
// │   ├── ordersSlice.js           // Slice для заказов
// │   ├── productsSlice.js         // Slice для товаров
// │   ├── customerSlice.js         // Slice для покупателей
// │   ├── apiSlice.js              // Slice для работы с API
// └── components /
//     ├── OrderForm.js             // Форма для создания/редактирования заказа
//     ├── OrdersList.js            // Список заказов
//     ├── ProductList.js           // Список продуктов
//     └── CustomerList.js          // Список покупателей

// 1. Конфигурация Redux с combineReducers и persistConfig

// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем локальное хранилище
import { combineReducers } from 'redux';
import ordersReducer from '../features/ordersSlice';
import productsReducer from '../features/productsSlice';
import customerReducer from '../features/customerSlice';
import apiReducer from '../features/apiSlice';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	orders: ordersReducer,
	products: productsReducer,
	customers: customerReducer,
	api: apiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

// 2. Orders Slice
// src/features/ordersSlice.js
const calculateTotals = (items) => {
	let totalAmount = 0;
	let totalReturn = 0;

	items.forEach(item => {
		totalAmount += item.orderQty * item.price;
		totalReturn += item.returnQty * item.price;
	});

	return { totalAmount, totalReturn };
};

// Асинхронный action для отправки заказа на сервер
export const sendOrderToServer = createAsyncThunk(
	'orders/sendOrderToServer',
	async (order, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/orders', order);
			return response.data; // Предполагаем, что сервер возвращает идентификатор и статус
		} catch (error) {
			return rejectWithValue('НеДоставлено'); // Задаем сообщение о неудаче
		}
	}
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		draftOrders: [],   // Для заявок, которые еще не утверждены
		carts: [],   // Для заявок, которые еще не утверждены
		confirmedOrders: [],  // Для окончательных заявок
		orders: [],  // Для окончательных заявок
		orderIdCounter: 0, // Для генерации уникальных кодов
	},
	reducers: {
		addOrderToCart: (state, action) => {
			const newOrder = { ...action.payload, code: ++state.orderIdCounter };
			const totals = calculateTotals(newOrder.items);

			newOrder.totalAmount = totals.totalAmount;
			newOrder.totalReturn = totals.totalReturn;

			state.carts.push(newOrder);
		},
		moveToOrders: (state, action) => {
			const index = state.carts.findIndex(order => order.code === action.payload.code);
			if (index !== -1) {
				const orderToMove = state.carts[index];

				// Сначала добавляем в окончательные заказы
				state.orders.push(orderToMove);

				// Проверяем успех перемещения
				const isMovedSuccessfully = state.orders.find(order => order.code === orderToMove.code) !== undefined;

				// Если перемещение прошло успешно, удаляем из корзины
				if (isMovedSuccessfully) {
					state.carts.splice(index, 1); // Удаляем из корзины
				}
			}
		},
		addOrder: (state, action) => {
			const newOrder = { ...action.payload, code: ++state.orderIdCounter };
			const totals = calculateTotals(newOrder.items);

			newOrder.totalAmount = totals.totalAmount;
			newOrder.totalReturn = totals.totalReturn;

			state.orders.push(newOrder);
		},
		updateOrder: (state, action) => {
			const index = state.orders.findIndex(order => order.code === action.payload.code);
			if (index !== -1) {
				// Сохраняем целые изменения
				const updatedOrder = { ...state.orders[index], ...action.payload };

				// Пересчитываем итоговые суммы
				const totals = calculateTotals(updatedOrder.items);

				updatedOrder.totalAmount = totals.totalAmount;
				updatedOrder.totalReturn = totals.totalReturn;

				state.orders[index] = updatedOrder;
			}
		},
		removeOrder: (state, action) => {
			state.orders = state.orders.filter(order => order.code !== action.payload);
		},
		updateOrderItem: (state, action) => {
			const { orderCode, productCode, orderQty, returnQty } = action.payload;
			const orderIndex = state.orders.findIndex(order => order.code === orderCode);

			if (orderIndex !== -1) {
				const itemIndex = state.orders[orderIndex].items.findIndex(item => item.productCode === productCode);
				if (itemIndex !== -1) {
					const item = state.orders[orderIndex].items[itemIndex];

					// Обновляем количество и возврат товара
					if (orderQty !== undefined) {
						item.orderQty += orderQty;
					}
					if (returnQty !== undefined) {
						item.returnQty += returnQty;
					}

					// Пересчитываем итоговые суммы после изменения товара
					const totals = calculateTotals(state.orders[orderIndex].items);
					state.orders[orderIndex].totalAmount = totals.totalAmount;
					state.orders[orderIndex].totalReturn = totals.totalReturn;
				}
			}
		},
		deleteItemFromCart: (state, action) => {
			const { orderCode, productCode } = action.payload;
			const orderIndex = state.carts.findIndex(order => order.code === orderCode);

			if (orderIndex !== -1) {
				const itemIndex = state.carts[orderIndex].items.findIndex(item => item.productCode === productCode);
				if (itemIndex !== -1) {
					// Удаляем товар из корзины
					state.carts[orderIndex].items.splice(itemIndex, 1);

					// Пересчитываем итоговые суммы после удаления товара
					const totals = calculateTotals(state.carts[orderIndex].items);
					state.carts[orderIndex].totalAmount = totals.totalAmount;
					state.carts[orderIndex].totalReturn = totals.totalReturn;
				}
			}
		},
		deleteItemFromOrder: (state, action) => {
			const { orderCode, productCode } = action.payload;
			const orderIndex = state.orders.findIndex(order => order.code === orderCode);

			if (orderIndex !== -1) {
				const itemIndex = state.orders[orderIndex].items.findIndex(item => item.productCode === productCode);
				if (itemIndex !== -1) {
					// Удаляем товар из заказа
					state.orders[orderIndex].items.splice(itemIndex, 1);

					// Пересчитываем итоговые суммы после удаления товара
					const totals = calculateTotals(state.orders[orderIndex].items);
					state.orders[orderIndex].totalAmount = totals.totalAmount;
					state.orders[orderIndex].totalReturn = totals.totalReturn;
				}
			}
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(sendOrderToServer.fulfilled, (state, action) => {
				const orderIndex = state.orders.findIndex(order => order.code === action.meta.arg.code);
				if (orderIndex !== -1) {
					// Обновляем заказ с полученными данными
					state.orders[orderIndex] = {
						...state.orders[orderIndex],
						id: action.payload.id, // Предполагаем, что сервер возвращает идентификатор
						status: action.payload.status, // Предполагаем, что сервер возвращает статус
					};
				}
			})
			.addCase(sendOrderToServer.rejected, (state, action) => {
				const orderIndex = state.orders.findIndex(order => order.code === action.meta.arg.code);
				if (orderIndex !== -1) {
					// Обновляем статус на "НеДоставлено" в случае ошибки
					state.orders[orderIndex].status = 'НеДоставлено';
				}
			});
	}
});

//HOW TO DO THIS
// const newOrder = {
// 	items: [
// 		{ productCode: 'prod123', productName: 'Продукт A', price: 10, orderQty: 2, returnQty: 0 },
// 	],
// 	customerCode: 'cust001',
// 	customerName: 'Покупатель A',
// 	address: 'Адрес A',
// 	comment: 'Комментарий',
// };

// Добавление заказа в корзину
dispatch(addOrderToCart(newOrder));
export const {
	addOrderToCart,
	moveToOrders,
	addOrder,
	removeOrder,
	deleteItemFromCart,
	updateOrder,
	updateOrderItem,
	deleteItemFromOrder,
} = ordersSlice.actions;


export const moveToOrdersAndSend = (order) => async (dispatch, getState) => {
	// Перемещаем его в окончательные заказы
	dispatch(moveToOrders({ code: order.code }));

	// Запускаем мутацию sendOrder
	// const [sendOrder, { error }] = useSendOrderMutation();

	// if (sendOrder) {
	// 	const result = await sendOrder(order);

	// Здесь нужнo вызывать sendOrder через dispatch, так как это отдельный action
	const result = await dispatch(sendOrder(order));

	// if (result.error) {
	if (sendOrder.fulfilled.match(result)) {
		// Обработка ошибки
		const orderIndex = getState().orders.orders.findIndex(o => o.code === order.code);
		if (orderIndex !== -1) {
			getState().orders.orders[orderIndex].status = 'НеДоставлено';
		}
	} else {
		// Если все прошло успешно
		const orderIndex = getState().orders.orders.findIndex(o => o.code === order.code);
		if (orderIndex !== -1) {
			getState().orders.orders[orderIndex].id = result.data.id; // присвоение идентификатора
			getState().orders.orders[orderIndex].status = result.data.status; // присвоение статуса
		}
	}
	// }
}


export const ordersSliceReduxer = ordersSlice.reducer;

// 3. Products Slice
// src/features/productsSlice.js
// import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
	},
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		updateProductStock: (state, action) => {
			const index = state.products.findIndex(product => product.productCode === action.payload.productCode);
			if (index !== -1) {
				state.products[index].stock -= action.payload.orderQty;
			}
		},
	},
});

export const { setProducts, updateProductStock } = productsSlice.actions;
export const productsSliceReduxer = productsSlice.reducer;

// 4. Customer Slice

// src/features/customerSlice.js
// import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
	name: 'customers',
	initialState: {
		customers: [],
	},
	reducers: {
		setCustomers: (state, action) => {
			state.customers = action.payload;
		},
		addCustomer: (state, action) => {
			state.customers.push(action.payload);
		},
	},
});

export const { setCustomers, addCustomer } = customerSlice.actions;
export const customerSliceReduxer = customerSlice.reducer;

// 5. API Slice
// Для работы с API, вы можете использовать createApi из @reduxjs/toolkit/query / react.
// Это может выглядеть следующим образом:

// src/features/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		fetchOrders: builder.query({
			query: () => '/orders',
		}),
		createOrder: builder.mutation({
			query: (newOrder) => ({
				url: '/orders',
				method: 'POST',
				body: newOrder,
			}),
		}),
		updateOrder: builder.mutation({
			query: ({ code, updatedOrder }) => ({
				url: `/orders/${code}`,
				method: 'PUT',
				body: updatedOrder,
			}),
		}),
		sendOrder: builder.mutation({
			query: (order) => ({
				url: '/orders',
				method: 'POST',
				body: order,
			}),
		}),
		// Добавьте другие endpoint-ы для работы с продуктами и покупателями
	}),
});

export const { useFetchOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation, useSendOrderMutation } = apiSlice;
export const apiSliceReducer = apiSlice.reducer;

// 6. Компоненты

// Вы можете создать компоненты для отображения списка заказов,
// списка продуктов и формы для создания / редактирования заказов.
// Главное, что нужно помнить, это использовать хуки Redux
// для управления состоянием и взаимодействия с сервером.