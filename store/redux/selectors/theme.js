import { createSelector } from 'reselect';
const getTheme = (state) => state.theme;
export const getThemePalette = createSelector(
	[getTheme],
	(theme) => {

		// const toReturn = {};
		// const primaryMainShade = theme.shades[theme.mode].primary.main;
		// const primaryLightShade = theme.shades[theme.mode].primary.light;
		// toReturn['bg'] = theme.palette[theme.mode].background.default;
		const toReturn = {
			primary: {
				main: theme.colors[theme.primaryColor][theme.shades[theme.mode].primary['main']],
				light: theme.colors[theme.primaryColor][theme.shades[theme.mode].primary['light']],
				dark: theme.colors[theme.primaryColor][theme.shades[theme.mode].primary['dark']],
				contrastText: theme.palette[theme.mode].primary.contrastText,
			},
			secondary: {
				main: theme.colors[theme.secondaryColor][theme.shades[theme.mode].secondary['main']],
				light: theme.colors[theme.secondaryColor][theme.shades[theme.mode].secondary['light']],
				dark: theme.colors[theme.secondaryColor][theme.shades[theme.mode].secondary['dark']],
				contrastText: theme.palette[theme.mode].secondary.contrastText,
			},
			mode: theme.mode,
			primaryColor: theme.primaryColor,
			secondaryColor: theme.secondaryColor,
			error: {
				main: theme.palette[theme.mode].error.main,
				light: theme.palette[theme.mode].error.light,
				dark: theme.palette[theme.mode].error.dark,
			},
			warning: {
				main: theme.palette[theme.mode].warning.main,
				light: theme.palette[theme.mode].warning.light,
				dark: theme.palette[theme.mode].warning.dark,
			},
			info: {
				main: theme.palette[theme.mode].info.main,
				light: theme.palette[theme.mode].info.light,
				dark: theme.palette[theme.mode].info.dark,
			},
			success: {
				main: theme.palette[theme.mode].success.main,
				light: theme.palette[theme.mode].success.light,
				dark: theme.palette[theme.mode].success.dark,
			},
			text: {
				primary: theme.palette[theme.mode].text.primary,
				secondary: theme.palette[theme.mode].text.secondary,
				disabled: theme.palette[theme.mode].text.disabled,
				icon: theme.palette[theme.mode].text.icon,
			},
			buttons: {
				primary: theme.palette[theme.mode].buttons.primary,
				secondary: theme.palette[theme.mode].buttons.secondary,
			},
			colors: {
				deepPurple: theme.colors.deepPurple[500],
				indigo: theme.colors.indigo[500],
				blue: theme.colors.blue[500],
				teal: theme.colors.teal[500],
				green: theme.colors.green[500],
				red: theme.colors.red[500],
				orange: theme.colors.orange[500],
				yellow: theme.colors.yellow[500],
				grey: theme.colors.grey[500],
				brown: theme.colors.brown[500],
				blueGrey: theme.colors.blueGrey[500],
				pink: theme.colors.pink[500],
				cyan: theme.colors.cyan[500],
			}
		};
		if (theme.mode === 'dark') {
			toReturn['buttons'] = {
				primary: theme.palette[theme.mode].buttons.primary,
				secondary: theme.palette[theme.mode].buttons.secondary,
				disabled: theme.palette[theme.mode].buttons.disabled
			}
		} else {
			toReturn['buttons'] = {
				primary: theme.colors[theme.primaryColor][theme.shades[theme.mode].primary['main']],
				secondary: theme.colors[theme.secondaryColor][theme.shades[theme.mode].secondary['light']],
				disabled: theme.colors[theme.primaryColor][theme.shades[theme.mode].primary['dark']],
			}
		}

		// const primaryColor = 'deepPurple';//theme.primaryColor
		const primaryColor = theme.primaryColor;
		if (theme.mode === 'dark') {
			toReturn['bg'] = theme.palette[theme.mode].background.default;
			toReturn['border'] = theme.palette[theme.mode].text.disabled;
			toReturn['listItem'] = theme.palette[theme.mode].buttons.hover;
			toReturn['selectedCell'] = theme.palette[theme.mode].buttons.disabled;
		} else {
			toReturn['bg'] = theme.colors[primaryColor][900];
			toReturn['border'] = theme.colors[primaryColor][500];
			toReturn['listItem'] = theme.colors[primaryColor][400];
			toReturn['selectedCell'] = theme.colors[primaryColor][100];
		}
		//console.log('theme.colors[theme.primaryColor] : ', theme.colors[theme.primaryColor]);
		//console.log('theme.color : ', theme.colors[theme.primaryColor][theme.shades[theme.mode]]);
		//console.log('theme.shades : ', theme.shades);
		// console.log('theme.secondaryColor : ', theme.secondaryColor);
		// console.log('theme.shades[theme.mode].primary.main : ', theme.shades[theme.mode].primary.main);
		// console.log('theme.shades[theme.mode] : ', theme.shades[theme.mode]);

		// console.log('toReturn', toReturn);


		//const theme = palette.theme;
		// const primaryColor = palette.primaryColor;
		// const secondaryColor = palette.secondaryColor;
		// console.log('theme', theme);
		// console.log('primaryColor', primaryColor);
		// console.log('secondaryColor', secondaryColor);
		// const primaryMain = palette.shades[theme].primary;
		// const secondaryMain = palette.shades[theme].secondary;
		// console.log('primaryMain', primaryMain);
		// console.log('secondaryMain', secondaryMain);


		// try {
		// 	const toReturn = { ...palette.colors[palette.theme] };
		// 	toReturn['theme'] = palette.theme;
		// 	toReturn['bg'] = { backgroundColor: palette.colors[palette.theme].background.default };
		// 	return toReturn;
		// } catch (error) {
		// 	return { error: error }
		// }
		return toReturn;

	});
