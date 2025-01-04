import { createSlice } from '@reduxjs/toolkit';
import { colorPalettes, colorShades } from '../../../constans/colors';

const initialState = {
	theme: 'light', // или 'dark'
	colors: { ...colorPalettes },
	shades: { ...colorShades },
	primaryColor: 'blue',
	secondaryColor: 'purple',
};

const themeSlice = createSlice({
	name: 'palette',
	initialState,
	reducers: {
		setColors(state, action) {
			state.colors = action.payload;
		},
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
		setTheme(state, action) {
			state.theme = action.payload;
		},
	},
});

// Асинхронное действие для загрузки палитры
export const loadColors = () => async (dispatch) => {
	try {
		// Здесь вы можете добавить логику для загрузки палитры из API или файла
		const colors = colorPalettes; // Загружаем палитру из файла
		dispatch(setColors(colors));
	} catch (error) {
		console.error('Failed to load colors:', error);
	}
};

export const { setColors, toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;