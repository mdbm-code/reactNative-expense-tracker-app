import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customers } from '../../../data/customers';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
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

export const uploadPhoto = createAsyncThunk(
  'photo/uploadPhoto',
  async (photoUri, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post(
        'https://your-server.com/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  photos: [],
  catalog: customers,
  error: {
    catalog: null,
    photos: null,
  },
  status: {
    catalog: 'idle', // idle | loading | succeeded | failed
    photos: 'idle', // idle | loading | succeeded | failed
  },
};

// Создание слайса
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomerPhoto: (state, action) => {
      const { code, uri } = action.payload;

      const existingCustomer = state.photos.find(
        (customer) => customer.code === code
      );

      if (existingCustomer) {
        existingCustomer.uri = uri;
      } else {
        state.photos.push({ code, uri });
      }
    },
    // Добавление нового клиента
    addNewCustomer: (state, action) => {
      state.catalog.push(action.payload);
    },
    // Добавление списка
    addCustomers: (state, action) => {
      state.catalog = action.payload;
    },
    addRoutes: (state, action) => {
      state.routes = action.payload;
    },
    // Удаление клиента по ID
    removeCustomer: (state, action) => {
      state.catalog = state.catalog.filter(
        (customer) => customer.id !== action.payload
      );
    },
    // Обновление информации о клиенте
    updateCustomer: (state, action) => {
      const { id, changes } = action.payload;
      const existingCustomer = state.catalog.find(
        (customer) => customer.id === id
      );
      if (existingCustomer) {
        Object.assign(existingCustomer, changes);
      }
    },
  },
  //- **extraReducers**: Обрабатывает действия, созданные `createAsyncThunk`.
  // Позволяет управлять состоянием загрузки и ошибками:
  // - **pending**: Устанавливает статус загрузки.
  // - **fulfilled**: Обновляет состояние при успешной загрузке данных.
  // - **rejected**: Устанавливает ошибку, если загрузка не удалась.
  extraReducers: (builder) => {
    builder
      // Обработчики для fetchCustomers
      .addCase(fetchCustomers.pending, (state) => {
        state.status.catalog = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status.catalog = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status.catalog = 'failed';
        state.error.catalog = action.payload;
      })

      // Обработчики для uploadPhoto
      .addCase(uploadPhoto.pending, (state) => {
        state.status.photos = 'loading';
      })
      .addCase(uploadPhoto.fulfilled, (state) => {
        state.status.photos = 'succeeded';
        //state.photos = []; // Очищаем URI после успешной загрузки
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.status.photos = 'failed';
        state.error.photos = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const {
  setCustomerPhoto,
  addNewCustomer,
  addCustomers,
  removeCustomer,
  updateCustomer,
} = customersSlice.actions;

// Экспорт редьюсера для добавления в store
export default customersSlice.reducer;
