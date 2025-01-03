import { createSlice } from '@reduxjs/toolkit';

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
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // Добавление списка
    addGroups: (state, action) => {
      state.catalog = action.payload;
    },
  }
});

// Экспорт действий для использования в компонентах
export const { addGroups } = groupsSlice.actions;

// Экспорт редьюсера для добавления в store
export default groupsSlice.reducer;
