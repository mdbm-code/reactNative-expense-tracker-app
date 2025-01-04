import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themes } from '../../constans/themes';
import { toggleTheme } from '../redux/slices/themeSlice';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const theme = useSelector((state) => state.palette.theme);
	const dispatch = useDispatch();

	const currentTheme = themes[theme];

	const toggleThemeHandler = () => {
		dispatch(toggleTheme());
	};

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, toggleTheme: toggleThemeHandler }}>
			{children}
		</ThemeContext.Provider>
	);
};
export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);