import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../constans/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPrimaryColor, setSecondaryColor, toggleTheme } from '../store/redux/slices/themeSlice';
import { getThemePalette } from '../store/redux/selectors/theme';
import IconButton from '../components/ui/IconButton';
const ThemeScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getThemePalette);
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  }

  const setPrimaryColorHandler = (color) => {
    dispatch(setPrimaryColor(color));
  }
  const setSecondaryColorHandler = (color) => {
    dispatch(setSecondaryColor(color));
  }

  return (
    <View style={styles.root}>
      <View style={styles.buttonContainer}>
        <Button onPress={toggleThemeHandler} title={theme.mode === 'light' ? 'Сменить на темную тему' : 'Сменить на светлую тему'} />
      </View>
      <ScrollView >
        <View style={styles.scrollView}>
          <View style={styles.primaryContainer}>
            {typeof theme?.colors === 'object' && Object.keys(theme.colors).map((key) => {
              return <View style={[styles.paletteContainer, { backgroundColor: theme.colors[key] }]} key={key}>
                {key === theme.primaryColor
                  ? <IconButton name={'checkmark'} size={30} title={key} />
                  : <Button onPress={() => setPrimaryColorHandler(key)} title={key} />
                }
              </View>
            })}
          </View>
          <View style={styles.secondaryContainer}>
            {typeof theme?.colors === 'object' && Object.keys(theme.colors).map((key) => {
              return <View style={[styles.paletteContainer, { backgroundColor: theme.colors[key] }]} key={key}>
                {key === theme.secondaryColor
                  ? <IconButton name={'checkmark'} size={30} title={key} />
                  : <Button onPress={() => setSecondaryColorHandler(key)} title={key} />
                }
              </View>
            })}
          </View>
        </View>
      </ScrollView>


    </View >
  );
};

export default ThemeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,

  },
  scrollView: {
    flex: 1,
    flexDirection: 'row'
  },
  primaryContainer: { flex: 2 },
  secondaryContainer: { flex: 2 },
  paletteContainer: {
    margin: 10
  },


  bg: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 2,
    backgroundColor: GlobalStyles.colors.primary800,
  }
});
