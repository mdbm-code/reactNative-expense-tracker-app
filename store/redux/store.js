import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import customersReducer from './slices/customersSlice';
import debitCreditReducer from './slices/debitCreditSlice';
import productsReducer from './slices/productsSlice';
import groupsReducer from './slices/groupsSlice';
import routesReducer from './slices/routesSlice';
import selectedsReducer from './slices/selectedsSlice';
import documentsReducer from './slices/documentsSlice';
import currentOrderReducer from './slices/currentOrdersSlice';
import themesReducer from './slices/themeSlice';
import salesReducer from './slices/salesSlice';
import imagesReducer from './slices/imagesSlice';
import ordersReduxer from './slices/ordersSlice';
import updateReducer from './slices/updateSlice';
import postsReducer from './slices/postsSlice';
import manageReducer from './slices/managerSlice';
import { apiSlice } from './api/apiSlices';
import { createLogger } from 'redux-logger'; // Импорт logger

// const logger = createLogger(); // Создайте экземпляр logger
// Фильтруем действия для конкретного слайса
const logger = createLogger({
  predicate: (getState, action) => {
    // например, вы хотите видеть только действия, связанные с слайсом "orders"
    return action.type.startsWith('orders/'); // или другой префикс в зависимости от вашего слайса
  },
  // logger: {
  //   log: (message) => {
  //     // Например, вы можете выводить только нужные части состояния
  //     const orderState = getState().orders; // Ваш слайс
  //     console.log('Order State:', orderState);
  //   },
  // },
  // Используем transform для настройки вывода
  transformed: (getState) => {
    const orderState = getState().orders; // Получаем состояние слайса
    console.log('Order State:', orderState);
  },
});

//Объединяю все редьюсеры с помощью `combineReducers`
//Используется для объединения всех редьюсеров в один корневой редьюсер.
const appReducer = combineReducers({
  api: apiSlice.reducer, // Добавляем редюсер из apiSlice
  customers: customersReducer,
  debitCredit: debitCreditReducer,
  products: productsReducer,
  groups: groupsReducer,
  routes: routesReducer,
  selecteds: selectedsReducer,
  documents: documentsReducer,
  currentOrders: currentOrderReducer,
  theme: themesReducer,
  sales: salesReducer,
  images: imagesReducer,
  orders: ordersReduxer,
  updateSlice: updateReducer,
  posts: postsReducer,
  manage: manageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    // Возвращаем начальное состояние для всех редьюсеров
    state = undefined;
  }
  return appReducer(state, action);
};

// Настраиваю конфигурацию persist
//тут можно настроить  `blacklist` или `whitelist`,
// чтобы указать, какие редьюсеры должны или не должны сохраняться.
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['documents'], // Укажите здесь слайсы, которые не нужно сохранять
  //whitelist: ['customers'], // Укажите здесь только те слайсы, которые нужно сохранять
};

// Создаю persistReducer
//Применяется к корневому редьюсеру, чтобы добавить функциональность сохранения состояния.
const persistedReducer = persistReducer(persistConfig, rootReducer);
//redux-persist**: Он автоматически заменяет `initialState` сохраненными данными,
// если они существуют в хранилище. Если правильно настроили `persistReducer`,
// то не нужно беспокоиться о том, что `initialState` будет перезаписывать сохраненные данные.

// Настройка store
const reduxStore = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production', // Только в разработке
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Отключаем проверку неизменности
      serializableCheck: false, // Отключаем проверку сериализуемости, если необходимо
    }).concat(apiSlice.middleware), // Добавляем middleware из apiSlice
  // }).concat(logger, apiSlice.middleware), // Добавляем middleware из apiSlice
});

//serializableCheck**: Это опция, которая позволяет вам игнорировать проверку
// сериализуемости для определенных действий.
// В данном случае мы игнорируем действия `persist/PERSIST` и `persist/REHYDRATE`,
// которые используются `redux-persist`.

// Создание persistStore
const reduxPersistor = persistStore(reduxStore);
//затем в App.js оборачиваю приложение с помощью <PersistGate loading={null} persistor={persistor}>
//чтобы обеспечить восстановление состояния перед рендерингом.

// Функция для перезапуска хранилища// Функция для сброса состояния
export const resetStore = async () => {
  // Очистка сохраненного состояния в AsyncStorage
  //persistor.purge() очищает сохраненное состояние
  // в AsyncStorage(или другом хранилище, которое вы используете).
  await reduxPersistor.purge();

  // Действие RESET_STORE сбрасывает состояние всех редьюсеров,
  // так как в rootReducer состояние устанавливается в undefined
  reduxStore.dispatch({ type: 'RESET_STORE' });
};

export { reduxStore, reduxPersistor };
