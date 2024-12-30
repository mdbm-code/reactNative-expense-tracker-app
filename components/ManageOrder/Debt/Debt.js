import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import FallbackText from '../../FallbackText';

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
