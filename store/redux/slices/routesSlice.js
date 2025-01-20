import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function manageRouteCustomer(
  selectedManager,
  selectedRoute,
  customerCode,
  state,
  direction,
  changes
) {
  let managerIndex = state.catalog.findIndex(
    (item) => item.managerCode === selectedManager
  );

  if (managerIndex === -1) {
    managerIndex =
      state.catalog.push({ managerCode: selectedManager, routes: [] }) - 1;
  }

  const managerRoutes = state.catalog[managerIndex].routes;
  let routeIndex = managerRoutes.findIndex(
    (item) => item.routeCode === selectedRoute
  );
  if (routeIndex === -1) {
    routeIndex =
      managerRoutes.push({ routeCode: selectedRoute, points: [] }) - 1;
  }

  const existingRoute = managerRoutes[routeIndex];
  const customerIndex = existingRoute.points.findIndex(
    (item) => item.customerCode === customerCode
  );

  if (direction === 'update') {
    if (changes) {
      Object.assign(existingRoute, changes);
    }
  } else if (direction === 'add') {
    if (customerIndex === -1) {
      const sort = existingRoute.points.length + 1;
      existingRoute.points.push({
        customerCode: customerCode,
        sort: sort,
        visit: 1,
      });
    }
  } else {
    const existingCustomer = existingRoute.points[customerIndex];
    if (!existingCustomer) return; // На всякий случай

    if (direction === 'remove') {
      existingRoute.points.splice(customerIndex, 1);
      existingRoute.points.forEach((item, index) => (item.sort = index + 1));
    } else if (direction === 'up' || direction === 'down') {
      const newPosition =
        direction === 'up'
          ? existingCustomer.sort - 1
          : existingCustomer.sort + 1;

      if (newPosition < 1 || newPosition > existingRoute.points.length) return;

      const targetCustomerIndex = existingRoute.points.findIndex(
        (item) => item.sort === newPosition
      );

      if (targetCustomerIndex === -1) return; // Места для перемещения нет

      // онструкция [] = [] в JavaScript используется для "деструктуризации"
      // Предположим, у вас есть два клиента:
      // Клиент A с sort = 1
      // Клиент B с sort = 2
      // После выполнения операции:
      // [clientA.sort, clientB.sort] = [clientB.sort, clientA.sort];
      // Сначала создается массив [clientB.sort, clientA.sort], который равен [2, 1]. Затем:
      // clientA.sort теперь будет равно 2.
      // clientB.sort теперь будет равно 1.
      // Таким образом, clientA и clientB поменялись местами по sort.
      [existingCustomer.sort, existingRoute.points[targetCustomerIndex].sort] =
        [existingRoute.points[targetCustomerIndex].sort, existingCustomer.sort];
    }
  }
}

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://api.example.com/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch customers');
    }
  }
);

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  catalog: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    customerSortUp: (state, action) => {
      const { customerCode, selectedManager, selectedRoute } = action.payload;
      if (!(selectedManager && selectedRoute && customerCode)) return;
      manageRouteCustomer(
        selectedManager,
        selectedRoute,
        customerCode,
        state,
        'up'
      );
    },
    customerSortDown: (state, action) => {
      const { customerCode, selectedManager, selectedRoute } = action.payload;
      if (!(selectedManager && selectedRoute && customerCode)) return;
      manageRouteCustomer(
        selectedManager,
        selectedRoute,
        customerCode,
        state,
        'down'
      );
    },
    removeCustomerFromRoute: (state, action) => {
      const { customerCode, selectedManager, selectedRoute } = action.payload;
      if (!(selectedManager && selectedRoute && customerCode)) return;
      manageRouteCustomer(
        selectedManager,
        selectedRoute,
        customerCode,
        state,
        'remove'
      );
    },
    addCustomerToRoute: (state, action) => {
      const { customerCode, selectedManager, selectedRoute } = action.payload;
      if (!(selectedManager && selectedRoute && customerCode)) return;
      manageRouteCustomer(
        selectedManager,
        selectedRoute,
        customerCode,
        state,
        'add'
      );
    },
    // Добавление списка
    addRoutes: (state, action) => {
      // console.log('routesSlice.addRoutes.action.payload', action.payload);
      state.catalog = action.payload;
    },
    addRoute: (state, action) => {
      state.catalog = [...state.catalog, { ...action.payload }];
    },
    updateRoute: (state, action) => {
      const { customerCode, selectedManager, selectedRoute, changes } =
        action.payload;
      if (!(selectedManager && selectedRoute && customerCode && changes)) {
        return;
      }
      manageRouteCustomer(
        selectedManager,
        selectedRoute,
        customerCode,
        state,
        'update',
        changes
      );
    },
  },
  //- **extraReducers**: Обрабатывает действия, созданные `createAsyncThunk`.
  // Позволяет управлять состоянием загрузки и ошибками:
  // - **pending**: Устанавливает статус загрузки.
  // - **fulfilled**: Обновляет состояние при успешной загрузке данных.
  // - **rejected**: Устанавливает ошибку, если загрузка не удалась.
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const {
  addRoutes,
  addRoute,
  updateRoute,
  customerSortUp,
  customerSortDown,
  addCustomerToRoute,
  removeCustomerFromRoute,
} = routesSlice.actions;

// Экспорт редьюсера для добавления в store
export default routesSlice.reducer;

export const thunk_removeCustomerFromRoute =
  (selectedRouteCode) => (dispatch, getState) => {
    const state = getState();
    const selectedCustomerCode = state.selecteds?.selectedCustomer?.code;
    if (!selectedCustomerCode) return 'Покупатель не выбран';
    const selectedManagerCode = state.selecteds?.selectedManager;
    if (!selectedManagerCode) return 'Менеджер не выбран';
    dispatch(
      removeCustomerFromRoute({
        customerCode: selectedCustomerCode,
        selectedManager: selectedManagerCode,
        selectedRoute: selectedRouteCode,
      })
    );
  };
export const thunk_addCustomerToRoute =
  (selectedRouteCode) => (dispatch, getState) => {
    const state = getState();
    const selectedCustomerCode = state.selecteds?.selectedCustomer?.code;
    if (!selectedCustomerCode) return 'Покупатель не выбран';
    const selectedManagerCode = state.selecteds?.selectedManager;
    if (!selectedManagerCode) return 'Менеджер не выбран';
    dispatch(
      addCustomerToRoute({
        customerCode: selectedCustomerCode,
        selectedManager: selectedManagerCode,
        selectedRoute: selectedRouteCode,
      })
    );
  };

export const thunk_updateRoute =
  (selectedRouteCode, changes) => (dispatch, getState) => {
    const state = getState();
    const selectedCustomerCode = state.selecteds?.selectedCustomer?.code;
    if (!selectedCustomerCode) return 'Покупатель не выбран';
    const selectedManagerCode = state.selecteds?.selectedManager;
    if (!selectedManagerCode) return 'Менеджер не выбран';

    dispatch(
      updateRoute({
        customerCode: selectedCustomerCode,
        selectedManager: selectedManagerCode,
        selectedRoute: selectedRouteCode,
        changes,
      })
    );
  };
