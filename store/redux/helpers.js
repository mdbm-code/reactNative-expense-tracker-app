import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const secureStore = {
	keys: [
		'jwtToken',
		'refreshToken',
		'accessToken',
		'jwt_token',
		'refresh_token',
		'access_token',
	]
	// keychainAccessible(необязательный, enum):
	// 	Определяет, когда данные будут доступны в хранилище.
	// 	Это свойство используется только на устройствах iOS.
	// 	Возможные значения:
	// 	SecureStore.WHEN_UNLOCKED(по умолчанию): Данные доступны только тогда, когда устройство разблокировано.
	// 	SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY: Данные доступны только на текущем устройстве и только когда оно разблокировано.
	// 	SecureStore.AFTER_FIRST_UNLOCK: Данные доступны после первого разблокирования устройства после перезагрузки.
	// 	SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: Данные доступны только на текущем устройстве после первого разблокирования.
	// 	SecureStore.ALWAYS: Данные доступны всегда, даже если устройство заблокировано.
	// 	SecureStore.ALWAYS_THIS_DEVICE_ONLY: Данные доступны всегда, но только на текущем устройстве.
	// 	SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: Данные доступны только на текущем устройстве, если установлен пароль блокировки экрана.
	// 	Пример:
	// 	keychainAccessible: SecureStore.WHEN_UNLOCKED

	// requireAuthentication(необязательный, boolean):
	// 	Определяет, требуется ли аутентификация пользователя(например, с помощью Face ID, Touch ID или пароля) 
	// 	для доступа к данным.
	// 	Это свойство используется только на устройствах iOS.
	// 	Значение по умолчанию: false.
	// 	Если установлено в true, пользователь должен пройти аутентификацию перед доступом к данным.
	// 	Пример:
	// 	requireAuthentication: true
}

function isJSONString(str) {
	// Проверяем, является ли входное значение строкой
	if (typeof str !== 'string') {
		return false;
	}

	try {
		// Пытаемся преобразовать строку в объект
		const parsed = JSON.parse(str);

		// Проверяем, что результат парсинга — это объект или массив
		return typeof parsed === 'object' && parsed !== null;
	} catch (error) {
		// Если произошла ошибка, значит строка не является валидным JSON
		return false;
	}
}

// Функции для работы с SecureStore
export const saveToStore = async (key, value) => {
	let toStore = value;
	if (typeof toStore === 'object') {
		toStore = JSON.stringify(toStore);
	}
	if (secureStore.keys.includes(key)) {
		try {
			await SecureStore.setItemAsync(key, toStore);
		} catch (error) {
			console.error(`Ошибка сохранения в SecureStore (${key}):`, error.message);
			throw new Error('Failed to save data securely');
		}
	} else {
		try {
			await AsyncStorage.setItem(key, toStore);
		} catch (error) {
			console.error(`Ошибка сохранения в AsyncStorage (${key}):`, error.message);
			throw new Error('Failed to save data securely');
		}
	}

};

export const getFromStore = async (key, isObject = false) => {
	if (secureStore.keys.includes(key)) {
		try {
			const returnValue = await SecureStore.getItemAsync(key);
			if (isObject) {
				return isJSONString(returnValue) ? JSON.parse(returnValue) : returnValue;
			}
			return returnValue;
		} catch (error) {
			console.error(`Ошибка чтения из SecureStore (${key}):`, error.message);
			throw new Error('Failed to read data securely');
		}
	} else {
		try {
			const returnValue = await AsyncStorage.getItem(key);
			if (isObject) {
				return isJSONString(returnValue) ? JSON.parse(returnValue) : returnValue;
			}
			return returnValue;
		} catch (error) {
			console.error(`Ошибка чтения из AsyncStorage (${key}):`, error.message);
			throw new Error('Failed to read data securely');
		}
	}
};

export const deleteFromStore = async (key) => {
	if (secureStore.keys.includes(key)) {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch (error) {
			console.error(`Ошибка удаления из SecureStore (${key}):`, error.message);
			throw new Error('Failed to delete data securely');
		}
	} else {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.error(`Ошибка удаления из AsyncStorage (${key}):`, error.message);
			throw new Error('Failed to delete data securely');
		}
	}
};

export const getAccessToken = async () => {
	try {
		const accessToken = await getFromStore('accessToken');
		console.log('Access Token:', accessToken);
		return accessToken;
	} catch (error) {
		console.error('Ошибка получения токена:', error.message);
		return null;
	}
};