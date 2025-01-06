import { createSlice } from '@reduxjs/toolkit';
import {
  colorPalettes,
  colorShades,
  mainColors,
} from '../../../constans/colors';

const initialState = {
  mode: 'light', // или 'dark'
  palette: { ...colorPalettes },
  colors: { ...mainColors },
  shades: { ...colorShades },
  primaryColor: 'deepPurple',
  secondaryColor: 'deepPurple',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColors(state, action) {
      state.colors = action.payload;
    },
    setShades(state, action) {
      state.shades = action.payload;
    },
    setPalette(state, action) {
      state.palette = action.payload;
    },
    setPrimaryColor(state, action) {
      state.primaryColor = action.payload;
    },
    setSecondaryColor(state, action) {
      state.secondaryColor = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      state.mode = action.payload;
    },
  },
});

// Асинхронное действие для загрузки палитры
export const loadColors = () => async (dispatch) => {
  try {
    // Здесь вы можете добавить логику для загрузки палитры из API или файла
    //const colors = colorPalettes; // Загружаем палитру из файла
    dispatch(setTheme('light'));
    dispatch(setColors(mainColors));
    dispatch(setShades(colorShades));
    dispatch(setPalette(colorPalettes));
    dispatch(setPrimaryColor('indigo'));
    dispatch(setSecondaryColor('indigo'));
  } catch (error) {
    console.error('Failed to load colors:', error);
  }
};

export const {
  setColors,
  toggleTheme,
  setTheme,
  setShades,
  setPalette,
  setPrimaryColor,
  setSecondaryColor,
} = themeSlice.actions;
export default themeSlice.reducer;
