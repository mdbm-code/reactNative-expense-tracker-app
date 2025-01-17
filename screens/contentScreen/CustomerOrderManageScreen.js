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

  // rows item:
  // {"base_price": 105.6, "code": "ТД008072", "default_price": 134.4, "description": "",
  // "multiple": 12, "name": "Масло 82,5% традиционное, золотая корова 0,2 кг.",
  // "parentCode": "6", "price": 134.4, "prices": {"base_price": 105.6, "default_price": 134.4},
  // "qty": "", "rest": "60", "shortName": "Масло 82,5% традиционное, золотая корова 0,2 кг.",
  // "specs": [[Object]], "unit": "шт"}

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
