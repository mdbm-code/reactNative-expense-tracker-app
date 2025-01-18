import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrderStatusFromServer } from '../../store/redux/slices/ordersSlice';
// import { getOrderStatusFromServer } from './pathToYourActions';

export const OrderStatusUpdater = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Функция для обновления статусов заказов
		const updateOrderStatuses = async () => {
			try {
				await dispatch(getOrderStatusFromServer()); // Подождем выполненного запроса
			} catch (error) {
				console.error('Не удалось обновить статусы заказов:', error);
			}
		};

		// Выполняем обновление статусов сразу после монтирования
		updateOrderStatuses();

		// Устанавливаем интервал на 60 * 3 секунд (60000 * 3 = 3 минуты)
		const intervalId = setInterval(updateOrderStatuses, 60000 * 3);

		// Очищаем интервал при размонтировании компонента
		return () => clearInterval(intervalId);
	}, [dispatch]);

	return null; // Компонент не требует визуального представления
};

