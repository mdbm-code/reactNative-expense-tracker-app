import { createSlice } from '@reduxjs/toolkit';

const errorLoggerSlice = createSlice({
	name: 'errorLogger',
	initialState: {
		errorLog: [], // Массив для хранения ошибок
		isSending: false, // Статус отправки ошибок
	},
	reducers: {
		addError: (state, action) => {
			state.errorLog.push({
				message: action.payload.message,
				timestamp: new Date().toISOString(),
				slice: action.payload.slice, // Название слайса, где произошла ошибка
			});
		},
		clearErrors: (state) => {
			state.errorLog = [];
		},
		setSendingStatus: (state, action) => {
			state.isSending = action.payload;
		},
	},
});

export const { addError, clearErrors, setSendingStatus } = errorLoggerSlice.actions;
export default errorLoggerSlice.reducer;