import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { storeOrder } from '../../../util/http';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
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
  numberPerPage: 30,
  catalog: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setNumberPerPage: (state, action) => {
      state.numberPerPage = action.payload;
    },
    insertUpdateDocument: (state, action) => {
      const { code } = action.payload;
      const existingOrder = state.catalog.find((order) => order.code === code);
      if (existingOrder) {
        Object.assign(existingOrder, action.payload);
      } else {
        state.catalog.push(action.payload);
      }
    },
    bulkInsertUpdateDocuments: (state, action) => {
      if (!Array.isArray(action.payload)) {
        return;
      }
      action.payload.forEach((doc) => {
        const existingOrder = state.catalog.find(
          (order) => order.code === doc.code
        );
        if (existingOrder) {
          Object.assign(existingOrder, doc);
        } else {
          state.catalog.push(doc);
        }
      });
    },
  },
  //- **extraReducers**: Обрабатывает действия, созданные `createAsyncThunk`.
  // Позволяет управлять состоянием загрузки и ошибками:
  // - **pending**: Устанавливает статус загрузки.
  // - **fulfilled**: Обновляет состояние при успешной загрузке данных.
  // - **rejected**: Устанавливает ошибку, если загрузка не удалась.
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const {
  insertUpdateDocument,
  bulkInsertUpdateDocuments,
  setNumberPerPage,
} = documentsSlice.actions;

// Экспорт редьюсера для добавления в store
export default documentsSlice.reducer;
