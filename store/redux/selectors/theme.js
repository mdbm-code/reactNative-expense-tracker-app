import { createSelector } from 'reselect';
import {
  mainColors,
  colorShades,
  colorPalettes,
} from '../../../constans/colors';
const getTheme = (state) => state?.theme;
export const getThemePalette = createSelector([getTheme], (theme) => {
  // console.log('getThemePalette');

  // const toReturn = {};
  // const primaryMainShade = shades[mode].primary.main;
  // const primaryLightShade = shades[mode].primary.light;
  // toReturn['bg'] = palette[mode].background.default;
  let colors = mainColors;
  if (theme?.colors) {
    colors = theme.colors;
  }
  let palette = colorPalettes;
  if (theme?.palette) {
    palette = theme.palette;
  }
  let shades = colorShades;
  if (theme?.shades) {
    shades = theme.shades;
  }
  let mode = 'light';
  if (theme?.mode) {
    mode = theme?.mode;
  }
  let primaryColor = 'indigo';
  if (theme?.primaryColor) {
    primaryColor = theme.primaryColor;
  }
  let secondaryColor = 'indigo';
  if (theme?.secondaryColor) {
    secondaryColor = theme.secondaryColor;
  }

  // console.log('colors', colors);
  // console.log('palette', palette);
  // console.log('shades', shades);
  // console.log('mode', mode);
  // console.log('primaryColor', primaryColor);
  // console.log('secondaryColor', secondaryColor);

  let toReturn = {};

  try {
    toReturn['primary'] = {
      main: colors[primaryColor][shades[mode].primary['main']],
      light: colors[primaryColor][shades[mode].primary['light']],
      dark: colors[primaryColor][shades[mode].primary['dark']],
      contrastText: palette[mode].primary.contrastText,
    };
  } catch (error) {
    console.log('toReturn[primary]', error);
  }

  try {
    toReturn['secondary'] = {
      main: colors[secondaryColor][shades[mode].secondary['main']],
      light: colors[secondaryColor][shades[mode].secondary['light']],
      dark: colors[secondaryColor][shades[mode].secondary['dark']],
      contrastText: palette[mode].secondary.contrastText,
    };
  } catch (error) {
    console.log(
      'toReturn[secondary]',
      error,
      'secondaryColor = ',
      secondaryColor
    );
  }

  try {
    toReturn['paper'] = {
      light: colors[primaryColor][shades[mode].paper['light']],
      main: colors[primaryColor][shades[mode].paper['main']],
      dark: colors[primaryColor][shades[mode].paper['dark']],
      contrastText: palette[mode].text.primary,
    };
  } catch (error) {
    console.log(
      'toReturn[secondary]',
      error,
      'secondaryColor = ',
      secondaryColor
    );
  }

  toReturn['mode'] = mode;
  toReturn['primaryColor'] = primaryColor;
  toReturn['secondaryColor'] = secondaryColor;

  try {
    toReturn['error'] = {
      main: palette[mode].error.main,
      light: palette[mode].error.light,
      dark: palette[mode].error.dark,
    };

    toReturn['warning'] = {
      main: palette[mode].warning.main,
      light: palette[mode].warning.light,
      dark: palette[mode].warning.dark,
    };
    toReturn['info'] = {
      main: palette[mode].info.main,
      light: palette[mode].info.light,
      dark: palette[mode].info.dark,
    };
    toReturn['success'] = {
      main: palette[mode].success.main,
      light: palette[mode].success.light,
      dark: palette[mode].success.dark,
    };
  } catch (error) {
    console.log('toReturn[error,warning,info,success]', error);
  }

  try {
    toReturn['text'] = {
      primary: palette[mode].text.primary,
      secondary: palette[mode].text.secondary,
      disabled: palette[mode].text.disabled,
      icon: palette[mode].text.icon,
    };
  } catch (error) {
    console.log('toReturn[text]', error);
  }

  try {
    toReturn['colors'] = {
      deepPurple: colors.deepPurple[500],
      indigo: colors.indigo[500],
      blue: colors.blue[500],
      teal: colors.teal[500],
      green: colors.green[500],
      red: colors.red[500],
      orange: colors.orange[500],
      yellow: colors.yellow[500],
      grey: colors.grey[500],
      brown: colors.brown[500],
      blueGrey: colors.blueGrey[500],
      pink: colors.pink[500],
      cyan: colors.cyan[500],
    };
  } catch (error) {
    console.log('toReturn[colors]', error);
  }
  try {
    if (mode === 'dark') {
      toReturn['buttons'] = {
        primary: palette[mode].buttons.primary,
        secondary: palette[mode].buttons.secondary,
        disabled: palette[mode].buttons.disabled,
      };
    } else {
      toReturn['buttons'] = {
        primary: colors[primaryColor][shades[mode].primary['main']],
        secondary: colors[secondaryColor][shades[mode].secondary['light']],
        disabled: colors[primaryColor][shades[mode].primary['dark']],
      };
    }
  } catch (error) {
    console.log('error buttons', error);
  }

  // const primaryColor = 'deepPurple';//primaryColor
  try {
    if (mode === 'dark') {
      toReturn['bg'] = {
        color: palette[mode].background.default,
        text: palette[mode].text.primary,
        active: palette[mode].text.secondary,
      };
      toReturn['bar'] = {
        color: colors[primaryColor][700],
        text: palette[mode].primary.disabledText,
        active: palette[mode].primary.contrastText,
      };
      toReturn['border'] = palette[mode].text.disabled;
      toReturn['listItem'] = {
        active: colors['grey'][600],
        disabled: colors['grey'][700],
      };
      toReturn['selectedCell'] = palette[mode].buttons.disabled;
    } else {
      toReturn['bg'] = {
        color: colors[primaryColor][900],
        text: colors[primaryColor][100],
        active: palette[mode].primary.contrastText,
      };
      toReturn['bar'] = {
        color: colors[primaryColor][700],
        text: colors[primaryColor][200],
        active: palette[mode].primary.contrastText,
      };
      toReturn['border'] = colors[primaryColor][500];
      toReturn['listItem'] = {
        active: colors[secondaryColor][600],
        disabled: colors[secondaryColor][800],
      };
      toReturn['selectedCell'] = colors[primaryColor][100];
    }
  } catch (error) {
    console.log('error border', error);
  }

  //console.log('colors[primaryColor] : ', colors[primaryColor]);
  //console.log('theme.color : ', colors[primaryColor][shades[mode]]);
  //console.log('shades : ', shades);
  // console.log('secondaryColor : ', secondaryColor);
  // console.log('shades[mode].primary.main : ', shades[mode].primary.main);
  // console.log('shades[mode] : ', shades[mode]);

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
