import * as SecureStore from 'expo-secure-store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Функции для работы с SecureStore
export const saveToSecureStore = async (key, value) => {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.error(`Ошибка сохранения в SecureStore (${key}):`, error.message);
		throw new Error('Failed to save data securely');
	}
};

export const getFromSecureStore = async (key) => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.error(`Ошибка чтения из SecureStore (${key}):`, error.message);
		throw new Error('Failed to read data securely');
	}
};

export const deleteFromSecureStore = async (key) => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.error(`Ошибка удаления из SecureStore (${key}):`, error.message);
		throw new Error('Failed to delete data securely');
	}
};

export const getAccessToken = async () => {
	try {
		const accessToken = await getFromSecureStore('accessToken');
		console.log('Access Token:', accessToken);
		return accessToken;
	} catch (error) {
		console.error('Ошибка получения токена:', error.message);
		return null;
	}
};


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
	'selecteds/authenticate',
	async (data, { getState, rejectWithValue }) => {
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
					await deleteFromSecureStore('accessToken');
					await deleteFromSecureStore('refreshToken');
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
					body.refresh = await getFromSecureStore('refreshToken');
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
				await saveToSecureStore('accessToken', accessToken);
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
					await AsyncStorage.removeItem('accessToken');
					await AsyncStorage.removeItem('refreshToken');
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
					body.refresh = await AsyncStorage.getItem('refreshToken');
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
				await AsyncStorage.setItem('accessToken', accessToken);
				if (response.data.refreshToken) {
					await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
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

const initialState = {
	id: null,
	code: '',
	name: '',
	phone: '',
	email: '',
	isAuthorized: false,
	tokens: {
		refresh_token: '',
		access_token: '',
		expires_in: '',
	},
	status: 'idle', // idle | loading | succeeded | failed
	error: null,
};

// Создание слайса
const managerSlice = createSlice({
	name: 'manager',
	initialState,
	reducers: {
		setSelectedManager: (state, action) => {
			state.name = action.payload?.name || state.name;
			state.phone = action.payload?.phone || state.phone;
			state.email = action.payload?.email || state.email;
			if (!'tokens' in action.state) {
				action.state.tokens = {};
			}
			if ('refresh_token' in action.payload) {
				state.tokens.refresh_token = action.payload.refresh_token;
			}
			if ('access_token' in action.payload) {
				state.tokens.access_token = action.payload.access_token;
			}
			if ('expires_in' in action.payload) {
				state.tokens.expires_in = action.payload.expires_in;
			}
		},
		updateManagerValue: (state, action) => {
			if (action.payload.key) {
				state[action.payload.key] = action.payload.value;
			}
		},
		logout: (state, action) => {
			state.isAuthorized = false;
		},
		authenticate: (state, action) => {
			state.isAuthorized = true;
		},
	},
});

// Экспорт действий для использования в компонентах
export const { setSelectedManager, updateManagerValue } = managerSlice.actions;

// Экспорт редьюсера для добавления в store
export default managerSlice.reducer;

export const logout = () => async (dispatch) => {
	dispatch(managerSlice.actions.logout());
	await deleteFromSecureStore('jwtToken');
	await deleteFromSecureStore('refreshToken');
	// await AsyncStorage.removeItem('jwtToken');
	// await AsyncStorage.removeItem('refreshToken');
};
export const authenticate = () => async (dispatch) => {
	dispatch(managerSlice.actions.authenticate());
	// await AsyncStorage.removeItem('jwtToken');
	// await AsyncStorage.removeItem('refreshToken');
};







//************************************************************************************ */
//ПРИМЕР ИСПОЛЬЗОВАНИЯ
//
// const AuthScreen = () => {
// 	const dispatch = useDispatch();
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');

// 	const handleLogin = async () => {
// 		try {
// 			const resultAction = await dispatch(
// 				authenticate({ type: 'login', username, password })
// 			);

// 			if (authenticate.fulfilled.match(resultAction)) {
// 				const { accessToken, user } = resultAction.payload;
// 				Alert.alert('Успех', `Добро пожаловать, ${user.username}`);
// 				console.log('Access Token:', accessToken);
// 			} else {
// 				Alert.alert('Ошибка', resultAction.payload || 'Не удалось авторизоваться');
// 			}
// 		} catch (error) {
// 			console.error('Ошибка авторизации:', error.message);
// 			Alert.alert('Ошибка', 'Что-то пошло не так');
// 		}
// 	};