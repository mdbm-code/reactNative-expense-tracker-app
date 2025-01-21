import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getSelector_selectProducts, selectProducts } from '../../store/redux/selectors/products';
import { getTheme } from '../../store/redux/selectors/theme';
import ProductsTable from '../../components/ProductsTable';
import _log from 'react-dev-log';

const CustomerReturnManageScreen = () => {
  // _log('/screens/contentScreen/CustomerReturnManageScreen');
  const theme = useSelector(getTheme);
  const querySelector = getSelector_selectProducts({ stateName: 'draft', typeQty: 'return' });
  const rows = useSelector(querySelector);

  // console.log('rows', rows);

  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;

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
