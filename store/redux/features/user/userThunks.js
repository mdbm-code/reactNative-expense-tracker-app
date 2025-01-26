import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteFromStore, saveToStore } from '../../helpers';
// import { saveToStore, deleteFromStore } from '../../helpers';

// Асинхронная операция для сохранения токенов
export const authenticate = createAsyncThunk(
	'user/loginUser',
	async (data, { rejectWithValue }) => {
		try {
			const tokenKeys = [
				'refresh_token',
				'refreshToken',
				'accessToken',
				'access_token',
				'jwt_token',
				'jwtToken',
			];
			for (const key of tokenKeys) {
				if (data?.[key]) {
					await saveToStore(key, data[key]);
				}
			}
			return data;
		} catch (error) {
			console.error('loginUser. Ошибка сохранения токена:', error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Асинхронная операция для выхода из системы
export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			await deleteFromStore('jwt_token');
			await deleteFromStore('refresh_token');
			await deleteFromStore('access_token');
		} catch (error) {
			console.error('Ошибка при logout:', error.message);
			return rejectWithValue(error.message);
		}
	}
);

export const logout2 = () => async (dispatch) => {
	try {
		dispatch(userSlice.actions.logout());
		await deleteFromStore('jwt_token');
		await deleteFromStore('refresh_token');
		await deleteFromStore('access_token');
	} catch (error) {
		console.log(error);
		dispatch(
			addError({
				message: error.message,
				slice: 'user', // Указываем, что ошибка произошла в userSlice
			})
		);
	}
};