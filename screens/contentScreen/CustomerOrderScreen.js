import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder } from '../../store/redux/selectors/orders';
import { deleteOrderRow } from '../../store/redux/slices/currentOrdersSlice';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import ProductsTable from '../../components/ProductsTable';

const CustomerOrderScreen = () => {
  const dispatch = useDispatch();
  const { customerCode } = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  const theme = useSelector(getTheme);
  const rows = useSelector(selectOrder);


  console.log('/screens/contentScreen/CustomerOrderScreen/');


  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
  if (!typeof customerCode === 'string')
    return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

  function onLongPressHandler(event) {
    Alert.alert('Удалить?', `Вы хотите удалить элемент: ${event.name}?`, [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Удалить',
        onPress: () => {
          dispatch(deleteOrderRow({ customerCode, productCode: event?.code }));
        },
      },
    ]);
  }

  return (
    <View style={[styles.rootContainer]}>
      <ProductsTable
        rows={rows}
        goal={'order'}
        onLongPress={onLongPressHandler}
        headerColor={theme.style.drawer.header.bg}
        theme={theme}
      />
    </View>
  );
};

export default CustomerOrderScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
