import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  selectedProductMenu: {
    title: '',
    level: '',
    code: '',
  },
  selectedProductManageView: { type: 'table', mode: '' },
  searchString: '',
  customerSearchString: '',
  selectedScreen: null,
  selectedRoute: null,
  selectedCustomer: null,
  selectedCustomerListItem: null,
  selectedDocTab: 0,
  selectedCustomerScreen: null,
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
    setSelectedScreen: (state, action) => {
      state.searchString = '';
      state.selectedProduct = null;
      if (action.payload?.key) {
        state.selectedScreen = {
          ...state,
          [action.payload.key]: action.payload?.value,
        };
      } else {
        state.selectedScreen = action.payload;
      }
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedProductManageView: (state, action) => {
      state.selectedProductManageView = action.payload;
    },
    setSelectedProductMenu: (state, action) => {
      state.searchString = '';
      state.selectedProductMenu = action.payload;
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
    setSelectedCustomerScreen: (state, action) => {
      state.selectedCustomerScreen = action.payload;
    },
    // Добавление списка
    // setSelectedOrder: (state, action) => {
    //   state.selectedOrder = action.payload;
    // },
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
  setSelectedScreen,
  setSelectedProduct,
  setSelectedCustomerListItem,
  setCustomerSearchString,
  setSearchString,
  setSelectedRoute,
  setSelectedCustomer,
  setSelectedDocTab,
  setSelectedTheme,
  setSelectedManager,
  setSelectedProductMenu,
  setSelectedMenuLevel_1,
  setSelectedMenuLevel_2,
  setUnselectMenu,
  setTableOptions,
  setSelectedCustomerScreen,
  setSelectedProductManageView,
} = selectedsSlice.actions;

// Экспорт редьюсера для добавления в store
export default selectedsSlice.reducer;
