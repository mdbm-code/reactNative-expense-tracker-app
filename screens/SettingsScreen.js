import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import ThemeScreen from './ThemeScreen';
import IconButton from '../components/ui/IconButton';

const SettingsScreen = ({ navigation }) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'Заявка',
      headerRight: () => (
        <IconButton
          name='add-circle-outline'
          color={'white'}
          size={24}
          onPr
          ess={toggleDrawer}
        />
      ),
    });
  }, [navigation]);

  return <View style={styles.rootContainer}></View>;
};

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
});
