import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import FallbackText from '../../FallbackText';
import { useNavigation } from '@react-navigation/native';

const Debt = () => {
  const data = useSelector((state) => state.debts);

  if (true) {
    return <FallbackText>Взаиморасчеты не загружены</FallbackText>;
  }

  return (
    <View>
      <Text>Debt</Text>
    </View>
  );
};

export default Debt;

const styles = StyleSheet.create({});
