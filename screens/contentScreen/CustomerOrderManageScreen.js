import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/redux/selectors/products';
import { getTheme } from '../../store/redux/selectors/theme';
import ProductsTable from '../../components/ProductsTable';

const CustomerOrderManageScreen = () => {
  const { customerCode } = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  console.log('/screens/contentScreen/CustomerOrderManageScreen');

  const theme = useSelector(getTheme);
  const rows = useSelector(selectProducts);
  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
  if (!typeof customerCode === 'string')
    return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

  return (
    <View style={[styles.rootContainer]}>
      <ProductsTable
        searchable
        rows={rows}
        goal={'order'}
        headerColor={theme.style.drawer.header.button.light.bg}
        theme={theme}
      />
    </View>
  );
};

export default CustomerOrderManageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
