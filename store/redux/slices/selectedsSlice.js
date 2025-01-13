import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  searchString: '',
  customerSearchString: '',
  selectedRoute: null,
  selectedCustomer: null,
  selectedCustomerListItem: null,
  selectedOrder: null,
  selectedDocTab: 0,
  selectedTheme: 'light',
  selectedProduct: null,
  selectedManager: '95',
  selectedMenuLevel_1: null,
  selectedMenuLevel_2: null,
  tableOptions: {
    fontSize: 12,
  },
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const selectedsSlice = createSlice({
  name: 'selecteds',
  initialState,
  reducers: {
    setTableOptions: (state, action) => {
      state.tableOptions = {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setSelectedCustomerListItem: (state, action) => {
      state.selectedCustomerListItem = action.payload;
    },
    setCustomerSearchString: (state, action) => {
      state.customerSearchString = action.payload;
    },
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
    setSelectedDocTab: (state, action) => {
      state.selectedDocTab = action.payload;
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
    setSelectedManager: (state, action) => {
      state.selectedManager = action.payload;
    },
    setSelectedMenuLevel_1: (state, action) => {
      state.selectedMenuLevel_1 = action.payload;
      state.searchString = '';
    },
    setSelectedMenuLevel_2: (state, action) => {
      state.selectedMenuLevel_2 = action.payload;
      state.searchString = '';
    },
    setUnselectMenu: (state, action) => {
      state.selectedMenuLevel_1 = null;
      state.selectedMenuLevel_2 = null;
      state.searchString = '';
    },
  },
});

// Экспорт действий для использования в компонентах
export const {
  setSelectedProduct,
  setSelectedCustomerListItem,
  setCustomerSearchString,
  setSearchString,
  setSelectedRoute,
  setSelectedCustomer,
  setSelectedOrder,
  setSelectedDocTab,
  setSelectedTheme,
  setSelectedManager,
  setSelectedMenuLevel_1,
  setSelectedMenuLevel_2,
  setUnselectMenu,
  setTableOptions,
} = selectedsSlice.actions;

// Экспорт редьюсера для добавления в store
export default selectedsSlice.reducer;
