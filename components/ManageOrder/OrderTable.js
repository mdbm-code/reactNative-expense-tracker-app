import { StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Table from './table/Table';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../ui/IconButton';

const OrderTable = ({
  rows,
  keyName,
  style,
  header,
  fallbackText,
  onPress,
  onUpdateValue,
}) => {
  return (
    <Table
      header={header}
      rows={rows}
      keyName={keyName}
      onPress={onPress}
      fallbackText={fallbackText}
      style={style}
      onUpdateValue={onUpdateValue}
    />
  );
};

export default OrderTable;

const styles = StyleSheet.create({});
