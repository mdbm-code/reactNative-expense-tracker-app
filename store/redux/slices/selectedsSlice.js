import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  selectedRoute: null,
  selectedCustomer: null,
  selectedOrder: null,
  selectedOrderTab: 0,
  selectedTheme: 'light',
  selectedManager: '95',
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const selectedsSlice = createSlice({
  name: 'selecteds',
  initialState,
  reducers: {
    // Добавление нового клиента
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    // Добавление списка
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setSelectedOrderTab: (state, action) => {
      state.selectedOrderTab = action.payload;
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
    setSelectedManager: (state, action) => {
      state.selectedManager = action.payload;
    },
  },
});

// Экспорт действий для использования в компонентах
export const {
  setSelectedRoute,
  setSelectedCustomer,
  setSelectedOrder,
  setSelectedOrderTab,
  setSelectedTheme,
  setSelectedManager,
} = selectedsSlice.actions;

// Экспорт редьюсера для добавления в store
export default selectedsSlice.reducer;
