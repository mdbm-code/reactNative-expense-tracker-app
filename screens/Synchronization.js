import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FallbackText from '../components/FallbackText';
import { GlobalStyles } from '../constans/styles';

const Synchronization = () => {
  return <FallbackText style={styles.bg}>Synchronization Screen</FallbackText>;
};

export default Synchronization;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
});


try {
  
} catch (error) {
  
}