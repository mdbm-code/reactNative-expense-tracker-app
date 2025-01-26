import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteFromStore, saveToStore } from '../../helpers';
import { addError } from '../../slices/errorLoggerSlice';
import { userExtraReducers } from './userExtraReducers';


const initialState = {
	id: null,
	code: '',
	name: '',
	phone: '',
	email: '',
	isAuthorized: false,
	token_expires_in: '',
	status: 'idle', // idle | loading | succeeded | failed
	error: null,
};

// Создание слайса
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserParams: (state, action) => {
			state.id = action.payload?.id || state.id;
			state.code = action.payload?.code || state.code;
			state.name = action.payload?.name || state.name;
			state.phone = action.payload?.phone || state.phone;
			state.email = action.payload?.email || state.email;
			state.token_expires_in = action.payload?.token_expires_in || state.token_expires_in;
			if ('isAuthorized' in action.state) {
				state.isAuthorized = action.state.isAuthorized;
			}
		},
		updateUserValue: (state, action) => {
			if (action.payload.key) {
				state[action.payload.key] = action.payload.value;
			}
		},
		logout: (state) => {
			state.id = null;
			state.code = '';
			state.name = '';
			state.phone = '';
			state.email = '';
			state.isAuthorized = false;
			state.token_expires_in = '';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		userExtraReducers(builder);
	},
});

// Экспорт действий для использования в компонентах
export const { setUserParams, updateUserValue } = userSlice.actions;

// Экспорт редьюсера для добавления в store
export default userSlice.reducer;