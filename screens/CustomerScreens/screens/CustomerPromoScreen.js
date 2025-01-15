import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../store/redux/selectors/theme';
import ScreenWithDrawer from '../../ScreenWithDrawer';
import CustomerOrderScreen from './CustomerOrderScreen';
import CustomerDebtScreen from './CustomerDebtScreen';
import CustomerReturnScreen from './CustomerReturnScreen';
import CustomerProfileScreen from './CustomerProfileScreen';

const CustomerPromoScreen = ({ }) => {
  // const { selectedCustomer } = useSelector((state) => state.selecteds);
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const headerParts = [
    {
      title: 'left',
      color: 'yellow',
      position: 'left',
      openDrawer: true,
      type: 'button',
      style: {
        backgroundColor: 'blue',
      }
    },
    {
      title: 'center',
      color: 'orange',
      type: 'title',
    },
    {
      title: 'right',
      color: 'red',
      position: 'right',
      openDrawer: true,
      type: 'button',
      style: {
        backgroundColor: 'blue'
      }
    },

  ];

  const screens = [
    {
      name: 'CustomerOrderScreen',
      component: CustomerOrderScreen,
      drawer: {
        label: 'Заявка',
      },
      header: {
        backgroundColor: 'green',
        title: 'Заявка'
      },
    },
    {
      name: 'CustomerDebtScreen',
      component: CustomerDebtScreen,
      drawer: {
        label: 'Акт-сверки',
      },
      header: {
        backgroundColor: 'blue',
        title: 'Акт-сверки'
      },
    },
    {
      name: 'CustomerReturnScreen',
      component: CustomerReturnScreen,
      drawer: {
        label: 'Возврат',
      },
      header: {
        backgroundColor: 'pink',
        title: 'Возврат'
      },
    },
    {
      name: 'CustomerProfileScreen',
      component: CustomerProfileScreen,
      drawer: {
        label: 'Сведения',
      },
      header: {
        backgroundColor: 'yellow',
        title: 'Сведения'
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
    // console.log(value);
  }

  const customDrawerContent = <Text>Custom</Text>;

  return (
    <ScreenWithDrawer
      screens={screens}
      theme={theme}
      onChangeScreen={changeScreenHandler}
      screenOptions={screenOptions}
      headerParts={headerParts}
      customDrawerContent={customDrawerContent}
    />
  );
};

export default CustomerPromoScreen;

const styles = StyleSheet.create({});
