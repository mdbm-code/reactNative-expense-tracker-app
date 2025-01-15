import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import ScreenWithDrawer from '../ScreenWithDrawer';
import CustomerOrderScreen from './screens/CustomerOrderScreen';
import CustomerDebtScreen from './screens/CustomerDebtScreen';
import CustomerReturnScreen from './screens/CustomerReturnScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';

const CustomerScreensDrawer = ({ navigation }) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCustomer?.name,
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
      title: 'Цель!',
      color: theme.style.nav.text,
      position: 'left',
      openDrawer: true,
      type: 'button',
      style: {
        backgroundColor: theme.style.drawer.listItem.bgActive,
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
    3: {
      title: 'Подбор',
      color: theme.style.nav.text,
      position: 'right',
      onPress: () => navigation.navigate('ManageProductsScreen'),
      type: 'button',
      style: {
        backgroundColor: theme.style.drawer.header.button.main.bg,
        color: theme.style.drawer.header.button.dark.text,
      },
    },
    4: {
      title: 'Подбор',
      color: theme.style.nav.text,
      position: 'right',
      onPress: () => navigation.navigate('ManageReturnProductsDrawer'),
      type: 'button',
      style: {
        backgroundColor: theme.style.error.main,
        color: theme.style.drawer.header.button.dark.text,
      },
    },
  };

  const screens = [
    {
      name: 'CustomerOrderScreen',
      component: CustomerOrderScreen,
      drawer: {
        label: 'Заявка',
      },
      header: {
        style: { backgroundColor: theme.style.drawer.header.bg },
        title: 'Заявка',
        items: [headerItems[1], headerItems[2], headerItems[3]],
      },
    },
    {
      name: 'CustomerDebtScreen',
      component: CustomerDebtScreen,
      drawer: {
        label: 'Акт-сверки',
      },
      header: {
        style: { backgroundColor: theme.style.drawer.header.bg },
        title: 'Акт-сверки',
        items: [headerItems[1], headerItems[2]],
      },
    },
    {
      name: 'CustomerReturnScreen',
      component: CustomerReturnScreen,
      drawer: {
        label: 'Возврат',
        style: { backgroundColor: theme.style.error.light },
      },
      header: {
        style: { backgroundColor: theme.style.error.light },
        title: 'Возврат',
        items: [headerItems[1], headerItems[2], headerItems[4]],
      },
    },
    {
      name: 'CustomerProfileScreen',
      component: CustomerProfileScreen,
      drawer: {
        label: 'Сведения',
      },
      header: {
        style: { backgroundColor: theme.style.drawer.header.bg },
        title: 'Сведения',
        items: [headerItems[1], headerItems[2]],
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

  const customDrawerContent = <Text>Custom</Text>;

  return (
    <ScreenWithDrawer
      screens={screens}
      theme={theme}
      onChangeScreen={changeScreenHandler}
      screenOptions={screenOptions}
    />
  );
};

export default CustomerScreensDrawer;

const styles = StyleSheet.create({});
