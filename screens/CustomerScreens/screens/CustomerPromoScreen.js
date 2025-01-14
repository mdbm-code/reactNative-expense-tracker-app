import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../store/redux/selectors/theme';
import ScreenWithDrawer from '../../ScreenWithDrawer';
import CustomerOrderScreen from './CustomerOrderScreen';
import CustomerDebtScreen from './CustomerDebtScreen';
import CustomerReturnScreen from './CustomerReturnScreen';
import CustomerProfileScreen from './CustomerProfileScreen';

const CustomerPromoScreen = ({}) => {
  // const { selectedCustomer } = useSelector((state) => state.selecteds);
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const headerParts = [
    {
      title: 'left',
      color: 'purple',
      position: 'left',
      openDrawer: true,
      type: 'button',
    },
    {
      title: 'right',
      color: 'purple',
      type: 'title',
    },
    {
      title: 'right',
      color: 'purple',
      position: 'right',
      openDrawer: true,
      type: 'button',
    },
  ];

  const screens = [
    {
      name: 'CustomerOrderScreen',
      component: CustomerOrderScreen,
      drawerLabel: 'Заявка',
      title: 'Заявка',
      header: {
        backgroundColor: 'green',
      },
    },
    {
      name: 'CustomerDebtScreen',
      component: CustomerDebtScreen,
      drawerLabel: 'Акт-сверки',
      title: 'Акт-сверки',
      header: {
        backgroundColor: 'blue',
      },
    },
    {
      name: 'CustomerReturnScreen',
      component: CustomerReturnScreen,
      drawerLabel: 'Возврат',
      title: 'Возврат',
      header: {
        backgroundColor: 'pink',
      },
    },
    {
      name: 'CustomerProfileScreen',
      component: CustomerProfileScreen,
      drawerLabel: 'Сведения',
      title: 'Сведения',
      header: {
        backgroundColor: 'yellow',
      },
    },
  ];

  const screenOptions = {
    drawerType: 'front',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    drawerStyle: {
      backgroundColor: 'transparent', // Цвет фона для выезжающей панели
      width: '70%', // Пример ширины
    },
  };

  function changeScreenHandler(value) {
    console.log(value);
  }

  return (
    <ScreenWithDrawer
      screens={screens}
      theme={theme}
      onChangeScreen={changeScreenHandler}
      screenOptions={screenOptions}
      headerParts={headerParts}
    />
  );
};

export default CustomerPromoScreen;

const styles = StyleSheet.create({});
