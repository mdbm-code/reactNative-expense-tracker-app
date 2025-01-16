import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/redux/selectors/products';
import { getTheme } from '../../store/redux/selectors/theme';
import ProductsTable from '../../components/ProductsTable';

const CustomerReturnManageScreen = () => {
  const { customerCode } = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  const theme = useSelector(getTheme);
  const rows = useSelector(selectProducts);
  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
  if (!typeof customerCode === 'string')
    return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

  console.log('/screens/contentScreen/CustomerReturnManageScreen');

  return (
    <View style={[styles.rootContainer]}>
      <ProductsTable
        searchable
        rows={rows}
        goal={'return'}
        headerColor={theme.style.customerList.dangerBg}
        theme={theme}
      />
    </View>
  );
};

export default CustomerReturnManageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
