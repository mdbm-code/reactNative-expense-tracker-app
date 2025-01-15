import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/redux/selectors/products';
import { getTheme } from '../../store/redux/selectors/theme';
import ProductsTable from '../../components/ProductsTable';

const ManageReturnProductsTableScreen = () => {
  const { customerCode } = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  const theme = useSelector(getTheme);
  const rows = useSelector(selectProducts);
  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
  if (!typeof customerCode === 'string')
    return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

  return (
    <View style={[styles.rootContainer]}>
      <ProductsTable
        rows={rows}
        goal={'return'}
        headerColor={theme.style.error.light}
        theme={theme}
      />
    </View>
  );
};

export default ManageReturnProductsTableScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
