import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelector_customerOrder, selectReturns } from '../../store/redux/selectors/orders';
import FallbackText from '../../components/FallbackText';
import { deleteReturnRow } from '../../store/redux/slices/currentOrdersSlice';
import { getTheme } from '../../store/redux/selectors/theme';
import ProductsTable from '../../components/ProductsTable';
import _log from 'react-dev-log';

const CustomerReturnScreen = () => {
  _log('/screens/contentScreen/CustomerReturnScreen');
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const querySelector = getSelector_customerOrder({
    stateName: 'draft',
    typeQty: 'return',
  });
  const rows = useSelector(querySelector);
  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;

  function onLongPressHandler(event) {
    Alert.alert('Удалить?', `Вы хотите удалить элемент: ${event.name}?`, [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Удалить',
        onPress: () => {
          // dispatch(deleteReturnRow({ customerCode, productCode: event?.code }));
        },
      },
    ]);
  }

  return (
    <View style={[styles.rootContainer]}>
      <ProductsTable
        rows={rows}
        goal={'return'}
        onLongPress={onLongPressHandler}
        headerColor={theme.style.customerList.dangerBg}
        theme={theme}
      />
    </View>
  );
};

export default CustomerReturnScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
