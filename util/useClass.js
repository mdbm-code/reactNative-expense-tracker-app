// src/models/Order.js
import { useDispatch } from 'react-redux';
import { moveToOrders, addOrderToCart, deleteItemFromOrder } from '../features/ordersSlice'; // Импорт действий
// src/selectors/ordersSelectors.js
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Order from '../models/Order'; // Импорт класса Order



/**
 * @typedef {Object} Product
 * @property {string} productCode - Код продукта
 * @property {string} productName - Название продукта
 * @property {number} orderQty - Количество заказа
 * @property {number} price - Цена продукта
 */

/**
 * @class
 */
class DynamicOrder {
	/**
	 * Создает экземпляр DynamicOrder.
	 * @param {Object} params
	 * @param {string} params.customerCode - Код клиента
	 * @param {string} params.date - Дата заказа
	 * @param {string} params.customerName - Имя клиента
	 * @param {string} params.code - Код заказа
	 * @param {Array<Product>} params.products - Список продуктов в заказе
	 * @param {function} params.dispatch - Функция dispatch для отправки действий
	 * @param {Array<string>} params.actionsArray - Массив действий, доступных для заказа
	 */
	constructor({ customerCode, date, customerName, code, products, dispatch, actionsArray }) {
		this.customerCode = customerCode;
		this.date = date;
		this.customerName = customerName;
		this.code = code;
		this.products = products; // Массив товаров
		this.dispatch = dispatch;  // Сохраняем dispatch для использования в методах


		// Динамически добавляем методы в зависимости от actionsArray
		actionsArray.forEach(action => {
			if (action === 'moveToOrders') {
				this.moveToOrders = this.createWrapper(() => {
					this.dispatch(moveToOrders({ code: this.code }));
				});
			}
			if (action === 'addOrderToCart') {
				this.addOrderToCart = this.createWrapper(() => {
					this.dispatch(addOrderToCart(this));
				});
			}
			if (action === 'deleteItem') {
				this.deleteItem = this.createWrapper((productCode) => {
					this.dispatch(deleteItemFromOrder({ orderCode: this.code, productCode }));
				});
			}
		});

		// // Динамически добавляем методы в зависимости от actionsArray
		// actionsArray.forEach(action => {
		// 	if (action === 'moveToOrders') {
		// 		this.moveToOrders = () => this.dispatch(moveToOrders({ code: this.code }));
		// 	}
		// 	if (action === 'addOrderToCart') {
		// 		this.addOrderToCart = () => this.dispatch(addOrderToCart(this));
		// 	}
		// 	if (action === 'deleteItem') {
		// 		this.deleteItem = (productCode) => this.dispatch(deleteItemFromOrder({ orderCode: this.code, productCode }));
		// 	}
		// });
	}

	static createOrder(data) {
		return new Order(data); // Создание нового экземпляра Order
	}

	/**
	 * Получает общую сумму заказа.
	 * @returns {number} Общая сумма заказа
	 */
	getTotalAmount() {
		return this.products.reduce((total, product) => total + product.price * product.orderQty, 0); // Подсчет итоговой суммы
	}

	// Функция обертка
	createWrapper(originalMethod) {
		return (...args) => {
			console.log(`Перед вызовом метода: ${originalMethod.name}`); // Логирование перед вызовом
			const result = originalMethod(...args); // Вызов оригинального метода
			console.log(`Метод ${originalMethod.name} был успешно завершен.`); // Логирование после вызова
			return result; // Возвращаем результат
		};
	}

	/**
	 * Создает новый экземпляр DynamicOrder.
	 * @static
	 * @param {Object} data - Данные для создания заказа.
	 * @returns {DynamicOrder} Новый экземпляр DynamicOrder.
	 */
	static createOrder(data) {
		return new DynamicOrder(data); // Создание нового экземпляра DynamicOrder
	}
}


class StaticOrder {
	constructor({ customerCode, date, customerName, code, products, dispatch }) {
		this.customerCode = customerCode;
		this.date = date;
		this.customerName = customerName;
		this.code = code;
		this.products = products; // Массив товаров

		this.dispatch = dispatch; // Чтобы использовать dispatch в методах

		// Создаем обертки вокруг методов
		this.moveToOrders = this.createWrapper(this.moveToOrders.bind(this));
		this.addOrderToCart = this.createWrapper(this.addOrderToCart.bind(this));
		this.deleteItem = this.createWrapper(this.deleteItem.bind(this));
	}

	moveToOrders() {
		this.dispatch(moveToOrders({ code: this.code }));
	}

	addOrderToCart() {
		this.dispatch(addOrderToCart(this));
	}

	deleteItem(productCode) {
		this.dispatch(deleteItemFromOrder({ orderCode: this.code, productCode }));
	}

	// Например, можно добавить метод для подсчета итоговой суммы
	getTotalAmount() {
		return this.products.reduce((total, product) => total + product.price * product.orderQty, 0);
	}

	// Функция обертка
	createWrapper(originalMethod) {
		return (...args) => {
			console.log(`Вызывается метод: ${originalMethod.name}`); // Логирование перед вызовом
			// Здесь вы можете добавить любую логику или проверки
			const result = originalMethod(...args); // Вызов оригинального метода
			console.log(`Метод ${originalMethod.name} завершен.`); // Логирование после вызова
			return result; // Возвращаем результат
		};
	}

}

export { StaticOrder, DymanicOrder }



export const getCustomerOrderSelectorStatic = (customerCode) => createSelector(
	(state) => state.orders.draftOrders,  // Получаем массив заявок
	(draftOrders) => {
		const dispatch = useDispatch();
		const orderData = draftOrders.find(order => order.customerCode === customerCode); // Находим заказ по коду клиента

		if (orderData) {
			// Возвращаем экземпляр класса Order, если заказ найден
			return new StaticOrder({ ...orderData, dispatch });
		}

		return null; // Если заказа нет, возвращаем null
	}
);

export const getCustomerOrderSelectorDynamic = (customerCode, actionsArray) => createSelector(
	(state) => state.orders.draftOrders, // Получаем массив заявок
	(draftOrders) => {
		const dispatch = useDispatch(); // Получаем dispatch внутри селектора
		const orderData = draftOrders.find(order => order.customerCode === customerCode); // Находим заказ по коду клиента

		if (orderData) {
			// Возвращаем экземпляр класса Order с нужными действиями, если заказ найден
			return new DynamicOrder({ ...orderData, dispatch, actionsArray });
		}

		return null; // Если заказа нет, возвращаем null
	}
);


export const getAllDraftOrdersStatic = createSelector(
	(state) => state.orders.draftOrders, // Селектор для получения массива draftOrders
	(draftOrders) => {
		const dispatch = useDispatch(); // Получаем dispatch внутри селектора
		// Возвращаем массив экземпляров класса Order
		return draftOrders.map(orderData => new StaticOrder({ ...orderData, dispatch })); // Создаем экземпляры класса Order и передаем dispatch
	}
);
export const getAllDraftOrdersDynamic = createSelector(
	(state) => state.orders.draftOrders, // Селектор для получения массива draftOrders
	(draftOrders) => {
		const dispatch = useDispatch(); // Получаем dispatch внутри селектора
		// Возвращаем массив экземпляров класса Order
		return draftOrders.map(orderData => new DynamicOrder({ ...orderData, dispatch })); // Создаем экземпляры класса Order и передаем dispatch
	}
);


//how to use
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { getCustomerOrderSelector } from '../selectors/ordersSelectors';

// const OrderPage = ({ customerCode }) => {
// 	const selector = getCustomerOrderSelector(customerCode);
// 	const order = useSelector(selector);

// 	const handleMoveToOrders = () => {
// 		if (order) {
// 			order.moveToOrders(); // Вызов метода moveToOrders
// 		}
// 	};

// 	if (!order) {
// 		return <div>Заказ не найден</div>;
// 	}

// 	return (
// 		<div>
// 			<h1>Заказ для {order.customerName}</h1>
// 			<button onClick={handleMoveToOrders}>Переместить в заказы</button>
// 			<h2>Товары:</h2>
// 			<ul>
// 				{order.products.map(product => (
// 					<li key={product.productCode}>
// 						{product.productName} - {product.orderQty} шт. - {product.price} руб.
// 					</li>
// 				))}
// 			</ul>
// 			<h3>Итоговая сумма: {order.getTotalAmount()} руб.</h3>
// 		</div>
// 	);
// };

// export default OrderPage;