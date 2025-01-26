import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { createApiUrl } from '../api/axiosConfig';
import { deleteFromStore, getFromStore, saveToStore } from '../localStorage';

const tokenFields = {
	access_token: '',
	refresh_token: '',
	expires_in: '',
	jti: '',//(JWT ID): Уникальный идентификатор токена. Это поле может использоваться для предотвращения повторного использования токена (replay attack).
	iat: '',// (Issued At): Время, когда токен был выдан. Это значение обычно представляется в формате Unix timestamp (количество секунд с 1 января 1970 года).
	exp: '',//(Expiration Time): Время, когда токен истекает. После этого времени токен больше не будет действителен. Также представляется в формате Unix timestamp.
	iss: '',//(Issuer): Указывает на того, кто выдал токен. Это может быть URL или идентификатор вашего сервиса.
	aud: '',// (Audience): Указывает на целевую аудиторию токена. Это может быть идентификатор приложения или сервиса, для которого предназначен токен.
	sub: '',// (Subject): Указывает на субъекта токена, то есть на пользователя или объект, к которому относится токен. Обычно это идентификатор пользователя.
	typ: '',//(Type): Указывает на тип токена. Обычно используется для указания, что это JWT, и может быть полезно, если в системе используются разные типы токенов.
	azp: '',//(Authorized Party): Указывает на сторону, которая была авторизована для использования токена. Это поле может быть полезно в сценариях, когда токен выдается для использования несколькими клиентами.
	session_state: '',//Состояние сессии пользователя. Может использоваться для отслеживания состояния сессии в системе.
	acr: '',//Authentication Context Class Reference. Указывает на уровень аутентификации, который был использован для получения токена.
	allowedOrigins: '',//Список разрешенных источников (origin), с которых могут поступать запросы. Это может быть полезно для настройки CORS (Cross-Origin Resource Sharing).
	client_id: '',//Идентификатор клиента, который запрашивает токен. Обычно это уникальный идентификатор приложения.
	origin: '',//Исходный адрес, с которого был выполнен запрос на получение токена.
	realm_access: '',//Доступ к различным ресурсам в рамках определенной области (realm). Обычно содержит информацию о ролях и разрешениях для данного пользователя.
	resource_access: '',//Доступ к конкретным ресурсам. Может содержать информацию о том, к каким ресурсам у пользователя есть доступ и какие роли он имеет для этих ресурсов.
	scope: '',//Области доступа, которые были запрошены и предоставлены пользователю. Указывает, какие действия пользователь может выполнять.
	sub: '',//Subject (субъект) — уникальный идентификатор пользователя в системе. Обычно это идентификатор, который используется для идентификации пользователя.
	token_use: '',//Указывает, как должен использоваться токен (например, для аутентификации или авторизации).
	username: '',
	ver: '',//Версия токена или версии протокола, используемого для его создания. 
	roles: [],//Массив ролей, присвоенных пользователю. Роли могут определять, какие действия пользователь может выполнять в приложении.
	permissions: [],//Массив разрешений, которые были предоставлены пользователю. Разрешения могут быть более детализированными, чем роли.
	groups: [],//Массив групп, к которым принадлежит пользователь. Группы могут использоваться для управления доступом и разрешениями.
}

export const authenticateWithSecureStore = createAsyncThunk(
	'manager/authenticateWithSecureStore',
	async (data, { getState, rejectWithValue }) => {
		console.log('authenticateWithSecureStore', data);

		const state = getState();
		const body = {};
		let accessToken = null;
		let url = '';
		try {
			switch (data.type) {
				case 'login':
					if (!data.email || !data.password) {
						return rejectWithValue('Username and password are required');
					}
					body.email = data.email;
					body.password = data.password;
					url = createApiUrl('signInWithEmailAndPassword');
					break;
				case 'logout':
					state.manager.tokens = {};
					await deleteFromStore('accessToken');
					await deleteFromStore('refreshToken');
					return '';
				case 'register':
					if (!data.password || !data.email) {
						return rejectWithValue('Username, password, and email are required');
					}
					body.email = data.email;
					body.password = data.password;
					body.email = data.email;
					url = createApiUrl('signUpWithEmailAndPassword');
					break;
				case 'refresh':
					body.refresh = await getFromStore('refreshToken');
					if (!body.refresh) {
						return rejectWithValue('No refresh token found');
					}
					return '';
					break;
				default:
					return rejectWithValue('Invalid authentication type');
			}

			console.log('body', body);
			const response = await apiClient.post(url, body);
			// const response = await apiClient.post(`/user/${data.type}`, body);
			console.log('response.data', response.data);


			accessToken = response.data?.token || response.data.accessToken;

			if (accessToken) {
				await saveToStore('accessToken', accessToken);
				if (response.data.refreshToken) {
					await saveToSecureStore('refreshToken', response.data.refreshToken);
				}
			}

			console.log('Пользователь успешно авторизован');
			return { accessToken, user: response.data.user };
		} catch (error) {
			console.error('Ошибка авторизации:', error.message);
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const authenticateWithAsyncStorage = createAsyncThunk(
	'selecteds/authenticate',
	async (data, { getState, dispatch, rejectWithValue }) => {
		const state = getState();
		const body = {};
		let accessToken = null;

		try {
			switch (data.type) {
				case 'login':
					if (!data.username || !data.password) {
						return rejectWithValue('Username and password are required');
					}
					body.username = data.username;
					body.password = data.password;
					break;
				case 'logout':
					state.manager.tokens = {};
					await deleteFromStore('accessToken');
					await deleteFromStore('refreshToken');
					return '';
				case 'register':
					if (!data.username || !data.password || !data.email) {
						return rejectWithValue('Username, password, and email are required');
					}
					body.username = data.username;
					body.password = data.password;
					body.email = data.email;
					break;
				case 'refresh':
					body.refresh = await getFromStore('refreshToken');
					if (!body.refresh) {
						return rejectWithValue('No refresh token found');
					}
					break;
				default:
					return rejectWithValue('Invalid authentication type');
			}

			const response = await apiClient.post(`/user/${data.type}`, body);
			accessToken = response.data?.token || response.data.accessToken;

			if (accessToken) {
				await saveToStore('accessToken', accessToken);
				if (response.data.refreshToken) {
					await saveToStore('refreshToken', response.data.refreshToken);
				}
			}

			console.log('Пользователь успешно авторизован');
			return { accessToken, user: response.data.user };
		} catch (error) {
			console.error('Ошибка авторизации:', error.message);
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);