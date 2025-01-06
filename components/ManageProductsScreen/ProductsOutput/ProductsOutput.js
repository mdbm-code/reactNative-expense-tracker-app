import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constans/styles';
import GridTable from '../../GridTable';


const ProductsOutput = ({ rows, style, onLongPress, onChangeText }) => {

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      flex: 8,
      titleStyle: { textAlign: 'left' },
    },
    {
      id: 'base_price',
      title: 'Б.Цена',
      flex: 3,
      titleStyle: { textAlign: 'right' },
    },
    { id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' } },
    { id: 'qty', title: 'Колво', flex: 2, as: 'input' },
  ];

  function onPressHandler(event) {
    // console.log(event);
  }

  return (
    <View style={[styles.rootContainer, style]}>
      <GridTable
        rows={rows}
        columns={columns}
        rowId='code'
        onPress={onPressHandler}
        onChangeText={onChangeText}
        onLongPress={onLongPress}
      />
    </View>
  );
};

export default ProductsOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
  text: {
    color: 'white',
  },
});
