import { createSelector } from 'reselect';
const getPalette = (state) => state.palette;
export const getThemePalette = createSelector(
	[getPalette],
	(palette) => {
		try {
			const toReturn = { ...palette.colors[palette.theme] };
			toReturn['theme'] = palette.theme;
			toReturn['bg'] = { backgroundColor: palette.colors[palette.theme].background.default };
			return toReturn;
		} catch (error) {
			return { error: error }
		}

	});
