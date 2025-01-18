import { Alert, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelector_customerOrder } from '../../store/redux/selectors/orders';
import { deleteOrderRow } from '../../store/redux/slices/currentOrdersSlice';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import ProductsTable from '../../components/ProductsTable';
// import { getSelectedCustomer } from '../../store/redux/selectors/selecteds';

const CustomerOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector(state => state.selecteds);
  const theme = useSelector(getTheme);
  const querySelector = getSelector_customerOrder({
    stateName: 'draft',
    customerCode: selectedCustomer?.code,
    typeQty: 'order',
  });
  const rows = useSelector(querySelector);
  console.log('rows', rows);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: selectedCustomer?.name,
  //   });
  // }, [selectedCustomer]);


  console.log('/screens/contentScreen/CustomerOrderScreen/');
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
          dispatch(deleteOrderRow({ code, productCode: event?.code }));
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
