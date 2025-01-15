import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import ScreenWithDrawer from '../ScreenWithDrawer';
// import ManageProductsTableScreen from './ManageProductsTableScreen';
import CustomerReturnManageScreen from '../contentScreen/CustomerReturnManageScreen';
import ProductsMenu from '../../components/ManageProductsScreen/ProductsMenu';

const CustomerReturnManageDrawer = ({ navigation }) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  console.log('/screens/drawerScreen/CustomerReturnManageDrawer');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `(Возврат) ${selectedCustomer?.name}`,
      headerStyle: { backgroundColor: theme.style.bar },
      headerTintColor: theme.style.nav.text,
      headerBackTitle: '',
      headerBackVisible: true, // Показать кнопку "Назад"
      headerBackTitle: '', // Установка текста кнопки "Назад" на пустое значение
      headerBackImage: () => (
        <Ionicons
          name={'chevron-back-outline'}
          size={24}
          color={theme.style.text.main}
        />
      ), // ваш компонент иконки
    });
  }, [navigation, selectedCustomer]);

  const headerItems = {
    1: {
      title: 'Фильтр',
      color: theme.style.nav.text,
      position: 'right',
      openDrawer: true,
      type: 'button',
      style: {
        backgroundColor: theme.style.error.main,
        color: theme.style.drawer.header.button.dark.text,
      },
    },
    2: {
      color: theme.style.drawer.listItem.title,
      type: 'title',
      position: 'center',
      style: {
        color: theme.style.drawer.header.button.dark.text,
      },
    },
  };

  const screens = [
    {
      name: 'CustomerReturnManageScreen',
      component: CustomerReturnManageScreen,
      drawer: {
        label: 'Заявка',
      },
      header: {
        style: { backgroundColor: theme.style.error.light },
        title: 'Заявка',
        items: [headerItems[1], headerItems[2]],
      },
    },
  ];

  const screenOptions = {
    drawerType: 'front',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    drawerStyle: {
      backgroundColor: theme.style.drawer.bg, // Цвет фона для выезжающей панели
      width: '70%', // Пример ширины
      label: {
        selected: {
          color: theme.style.text.main,
          fontWeight: 'bold',
          backgroundColor: theme.style.error.light
        }
      }
    },
  };

  function changeScreenHandler(value) {
    // console.log(value);
  }


  return (
    <ScreenWithDrawer
      screens={screens}
      theme={theme}
      onChangeScreen={changeScreenHandler}
      screenOptions={screenOptions}
      customDrawerContent={ProductsMenu}
    >

    </ScreenWithDrawer>
  );
};

export default CustomerReturnManageDrawer;

const styles = StyleSheet.create({});
