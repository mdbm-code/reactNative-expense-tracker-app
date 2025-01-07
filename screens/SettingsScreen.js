import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ThemeScreen from './ThemeScreen';

const SettingsScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <ThemeScreen />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
});
