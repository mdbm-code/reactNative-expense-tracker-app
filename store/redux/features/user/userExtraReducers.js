import { authenticate } from './userThunks';

export const userExtraReducers = (builder) => {
	builder
		.addCase(authenticate.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(authenticate.fulfilled, (state, action) => {
			state.status = 'succeeded';
			// Обновляем состояние, если токен успешно сохранен
			state.id = action.payload?.id || state.id;
			state.code = action.payload?.code || state.code;
			state.name = action.payload?.name || state.name;
			state.phone = action.payload?.phone || state.phone;
			state.email = action.payload?.email || state.email;
			state.token_expires_in = action.payload?.token_expires_in || state.token_expires_in;

			const hasToken = !!(action.payload?.accessToken || action.payload?.access_token);
			if (hasToken) {
				state.isAuthorized = true;
			} else {
				state.isAuthorized = false;
			}
		})
		.addCase(authenticate.rejected, (state, action) => {
			state.status = 'failed';
			// Обрабатываем ошибку, если сохранение не удалось
			state.error = action.payload || action.error.message;
		});
};