import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Пример асинхронной операции для получения списка клиентов с сервера
export const fetchDocuments = createAsyncThunk(
  'debitCredit/fetchDocuments',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://api.example.com/customers');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch debit/credit');
    }
  }
);

// Начальное состояние
//initialState**: Это состояние будет использоваться только при первом запуске
// приложения или если данные не были сохранены ранее.
// После того как `redux-persist` сохранит состояние,
// оно будет загружено из хранилища (например, `AsyncStorage`) при следующем запуске приложения.
const initialState = {
  documents: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Создание слайса
const debitCreditSlice = createSlice({
  name: 'debitCredit',
  initialState,
  reducers: {
    // Добавление нового клиента
    addOneDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    // Добавление списка
    addDocuments: (state, action) => {
      state.documents = action.payload;
    },
    // Удаление клиента по ID
    removeDocument: (state, action) => {
      state.documents = state.documents.filter(
        (doc) => doc.id !== action.payload
      );
    },
    // Обновление информации о клиенте
    updateDocument: (state, action) => {
      const { id, changes } = action.payload;
      const existingDoc = state.documents.find((doc) => doc.id === id);
      if (existingDoc) {
        Object.assign(existingDoc, changes);
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
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Экспорт действий для использования в компонентах
export const { addOneDocument, addDocuments, removeDocument, updateDocument } =
  debitCreditSlice.actions;

// Экспорт редьюсера для добавления в store
export default debitCreditSlice.reducer;
