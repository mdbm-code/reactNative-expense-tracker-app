import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import customersReducer from './slices/customersSlice';
import debitCreditReducer from './slices/debitCreditSlice';
import productsReducer from './slices/productsSlice';
import groupsReducer from './slices/groupsSlice';
import routesReducer from './slices/routesSlice';
import selectedsReducer from './slices/selectedsSlice';
import ordersReducer from './slices/ordersSlice';
import currentOrderReducer from './slices/currentOrdersSlice';
import themesReducer from './slices/themeSlice';
import salesReducer from './slices/salesSlice';

//Объединяю все редьюсеры с помощью `combineReducers`
//Используется для объединения всех редьюсеров в один корневой редьюсер.
const rootReducer = combineReducers({
  customers: customersReducer,
  debitCredit: debitCreditReducer,
  products: productsReducer,
  groups: groupsReducer,
  routes: routesReducer,
  selecteds: selectedsReducer,
  orders: ordersReducer,
  currentOrders: currentOrderReducer,
  theme: themesReducer,
  sales: salesReducer,
  //   productGroups: productGroupsReducer,
  //   prices: pricesReducer,
  //   tasks: tasksReducer,
  //   orders: ordersReducer,
});

// Настраиваю конфигурацию persist
//тут можно настроить  `blacklist` или `whitelist`,
// чтобы указать, какие редьюсеры должны или не должны сохраняться.
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['palette'], // Укажите здесь слайсы, которые не нужно сохранять
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
  //getDefaultMiddleware -  Это функция, предоставляемая Redux Toolkit,
  // которая позволяет  настраивать middleware по умолчанию.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Отключаем проверку неизменности
      serializableCheck: false, // Отключаем проверку сериализуемости, если необходимо
      // serializableCheck: {
      //   // Игнорируем действия redux-persist
      //   ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // },
    }),
});
//serializableCheck**: Это опция, которая позволяет вам игнорировать проверку
// сериализуемости для определенных действий.
// В данном случае мы игнорируем действия `persist/PERSIST` и `persist/REHYDRATE`,
// которые используются `redux-persist`.

// Создание persistStore
const reduxPersistor = persistStore(reduxStore);
//затем в App.js оборачиваю приложение с помощью <PersistGate loading={null} persistor={persistor}>
//чтобы обеспечить восстановление состояния перед рендерингом.

export { reduxStore, reduxPersistor };
