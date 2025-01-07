import React, { useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { GlobalStyles } from '../../constans/styles';
import FallbackText from '../FallbackText';
import GridTableRow from './GridTableRow';
import GridTableHead from './GridTableHead';

const GridTable = ({
  onRefresh = () => {},
  refreshing = false,
  rows,
  columns,
  onPress,
  onChangeText,
  onLongPress,
  rowId = 'id',
  simple,
}) => {
  const [selectedRow, setSelectedRow] = useState('');
  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;

  // console.log('rowId', rowId);
  // console.log('GridTable.rows', rows);

  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <FallbackText>
        Параметр colums должен быть массивом с описанием колонок
      </FallbackText>
    );
  }

  const onPressHandler = (value) => {
    setSelectedRow(value[rowId]);
    if (typeof onPress === 'function') {
      onPress(value);
    }
  };

  const onChangeValueHandler = (value) => {
    if (typeof onChangeText === 'function') {
      onChangeText(value);
    }
  };
  const onLongPressHandler = (value) => {
    if (typeof onLongPress === 'function') {
      onLongPress(value);
    }
  };

  //rows = [{"code": "ТД000109", "name": "Айран БУДЬ ЗДОРОВ 0,1% 0,5 л.", "price": 39.32, "qty": "2", "unit": "шт"}]

  //columns = [
  // 	{ id: 'name', title: 'Наименование', flex: 8, titleStyle: { textAlign: 'left' }, rowId },
  // 	{ id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' }, rowId },
  // 	{ id: 'qty', title: 'Колво', flex: 2, rowId: 'code', as:'input },
  // ]

  const renderItem = ({ item }) => {
    const cells = [];
    columns.forEach((column) => {
      cells.push({
        title: item[column.id],
        flex: column?.flex,
        titleStyle: column?.titleStyle,
        returnParams: { ...item, column: column.id },
        as: column?.as,
        onPress: onPressHandler,
        onChangeValue: onChangeValueHandler,
        onLongPress: onLongPressHandler,
      });
    });
    return (
      <GridTableRow cells={cells} selected={selectedRow === item[rowId]} />
    );
  };

  return (
    <View style={[styles.rootContainer]}>
      <GridTableHead columns={columns} style={styles.headerContainer} />
      {refreshing && <ActivityIndicator size='large' color='#00ff00' />}
      <KeyboardAwareFlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item) => item[rowId]}
        extraHeight={100} // Дополнительное пространство для клавиатуры
      />
    </View>
  );
};

export default GridTable;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
