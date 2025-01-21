import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelector_customerOrder } from '../../store/redux/selectors/orders';
import { deleteOrderRow } from '../../store/redux/slices/currentOrdersSlice';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import ProductsTable from '../../components/ProductsTable';
import _log from 'react-dev-log';
import Button from '../../components/ui/Button';
import OrderFooter from '../../components/OrderFooter/OrderFooter';

const CustomerOrderScreen = ({ navigation }) => {
  // _log('/screens/contentScreen/CustomerOrderScreen');
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const querySelector = getSelector_customerOrder({ typeQty: 'order' });
  const rows = useSelector(querySelector);

  if (typeof rows === 'string' && rows === 'empty')
    return (
      <></>
      // <FallbackText
      //   onPress={() => {
      //     navigation.navigate('CustomerOrderManageScreen');
      //   }}
      // >
      //   {'Начать подбор товаров'}
      // </FallbackText>
    );
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
          // dispatch(deleteOrderRow({ code, productCode: event?.code }));
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
        footer={<OrderFooter theme={theme} />}
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
