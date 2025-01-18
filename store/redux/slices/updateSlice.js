import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для обновления данных
export const updateDataThunk = createAsyncThunk(
	'updateSlice/updateData',
	async (toUpdate, { getState, dispatch, rejectWithValue }) => {
		const state = getState();
		const results = [];

		for (const { sliceName, stateName } of toUpdate) {
			try {
				// Получаем текущую версию из состояния
				const currentVersion =
					state.updateSlice.data?.[sliceName]?.[stateName]?.lastDate;

				// Формируем URL для запроса
				const url = `/api/update/slice/${sliceName}/state/${stateName}`;

				// Делаем запрос на сервер
				const response = await axios.post(url, { currentVersion });

				// Проверяем, что ответ содержит данные
				if (response.data && Array.isArray(response.data) && response.data.length > 0) {
					// Вызываем action целевого слайса
					const updateAction = `${sliceName}/updateData`;
					dispatch({ type: updateAction, payload: response.data });

					// Обновляем дату последнего обновления
					dispatch(updateSlice.actions.setLastDate({ sliceName, stateName, lastDate: new Date().toISOString() }));
				} else {
					// Если ответ пустой или некорректный, записываем ошибку
					dispatch(
						updateSlice.actions.setError({
							sliceName,
							stateName,
							error: 'No updates received or invalid response',
						})
					);
				}

				// Сохраняем результат успешного обновления
				results.push({ sliceName, stateName, status: 'success' });
			} catch (error) {
				// Обрабатываем ошибки запроса
				dispatch(
					updateSlice.actions.setError({
						sliceName,
						stateName,
						error: error.message || 'Unknown error',
					})
				);

				// Сохраняем результат ошибки
				results.push({ sliceName, stateName, status: 'error', error: error.message });
			}
		}

		return results;
	}
);

// Начальное состояние
const initialState = {
	data: {}, // Хранение данных по слайсам и состояниям
};

// Слайс
const updateSlice = createSlice({
	name: 'updateSlice',
	initialState,
	reducers: {
		// Устанавливаем дату последнего обновления
		setLastDate: (state, action) => {
			const { sliceName, stateName, lastDate } = action.payload;
			if (!state.data[sliceName]) {
				state.data[sliceName] = {};
			}
			if (!state.data[sliceName][stateName]) {
				state.data[sliceName][stateName] = {};
			}
			state.data[sliceName][stateName].lastDate = lastDate;
			state.data[sliceName][stateName].status = 'success';
		},
		// Устанавливаем ошибку
		setError: (state, action) => {
			const { sliceName, stateName, error } = action.payload;
			if (!state.data[sliceName]) {
				state.data[sliceName] = {};
			}
			if (!state.data[sliceName][stateName]) {
				state.data[sliceName][stateName] = {};
			}
			state.data[sliceName][stateName].status = error;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateDataThunk.pending, (state) => {
				// Можно добавить логику для обработки состояния загрузки
			})
			.addCase(updateDataThunk.fulfilled, (state, action) => {
				// Можно обработать успешное выполнение thunk
			})
			.addCase(updateDataThunk.rejected, (state, action) => {
				// Можно обработать ошибку выполнения thunk
			});
	},
});

export const { setLastDate, setError } = updateSlice.actions;

export default updateSlice.reducer;



// Объяснение кода:

// Асинхронный thunk updateDataThunk:

// Принимает массив toUpdate, содержащий объекты с sliceName и stateName.
// Для каждого объекта из массива:
// Получает текущую версию(currentVersion) из состояния updateSlice.
// Делает запрос на сервер с использованием axios.
// Если данные успешно получены, вызывает action целевого слайса(например, dispatch({ type: 'customers/updateData', payload: response.data })) и обновляет дату последнего обновления.
// Если произошла ошибка или данные некорректны, записывает ошибку в состояние.
// Состояние data:

// Хранит данные по каждому sliceName и stateName, включая дату последнего обновления(lastDate) и статус(status).
// 	Редьюсеры:

// setLastDate: Обновляет дату последнего обновления для конкретного sliceName и stateName.
// 	setError: Устанавливает ошибку для конкретного sliceName и stateName.
// Обработка ошибок:

// Если запрос на сервер завершился с ошибкой, она записывается в состояние.
// Переход к следующему объекту:

// Используется цикл for, чтобы дожидаться завершения обработки текущего объекта перед переходом к следующему.



// import { updateDataThunk } from './updateSlice';
// import store from './store';

// const toUpdate = [
// 	{ sliceName: 'customers', stateName: 'catalog' },
// 	{ sliceName: 'products', stateName: 'catalog' },
// 	{ sliceName: 'products', stateName: 'prices' },
// ];

// store.dispatch(updateDataThunk(toUpdate));