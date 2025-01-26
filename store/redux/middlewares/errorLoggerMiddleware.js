import { addError } from '../slices/errorLoggerSlice';

const errorLoggerMiddleware = (store) => (next) => (action) => {
	if (action.type.endsWith('/rejected')) {
		const errorMessage = action.payload || action.error?.message || 'Unknown error';
		const sliceName = action.type.split('/')[0]; // Получаем название слайса из action.type

		// Добавляем ошибку в глобальный лог
		store.dispatch(
			addError({
				message: errorMessage,
				slice: sliceName,
			})
		);
	}

	return next(action);
};

export default errorLoggerMiddleware;