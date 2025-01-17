import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import ScreenWithDrawer from '../ScreenWithDrawer';
import CustomerOrderScreen from '../contentScreen/CustomerOrderScreen';
import CustomerDebtScreen from '../contentScreen/CustomerDebtScreen';
import CustomerReturnScreen from '../contentScreen/CustomerReturnScreen';
import CustomerProfileScreen from '../contentScreen/CustomerProfileScreen';
import _log from 'react-dev-log';
import CustomerDocumentsScreen from '../contentScreen/CustomerDocumentsScreen';
import IconButton from '../../components/ui/IconButton';

const CustomerScreensDrawer = ({ navigation }) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  // const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const shareCurrentOrder = () => {};

  _log('/screens/drawerScreen/CustomerScreensDrawer/');
  const pressShareIconHandler = () => {
    Alert.alert(
      '',
      'Отправить заявку на сервер ?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Удалить нажато'),
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: () => shareCurrentOrder('Отмена нажата'),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert был закрыт'), // Вызывается при закрытии
      } // Если true, Alert можно закрыть, нажав вне него);
    );
  };

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
      ),
      headerRight: () => (
        <IconButton
          name='share-outline'
          color={'white'}
          size={30}
          onPress={pressShareIconHandler}
        />
      ),
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
      onPress: () => navigation.navigate('CustomerOrderManageDrawer'),
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
      onPress: () => navigation.navigate('CustomerReturnManageDrawer'),
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
        style: {
          backgroundColor: theme.style.customerList.dangerBg,
          labelSelectedColor: theme.style.text.main,
        },
      },
      header: {
        title: 'Возврат',
        style: { backgroundColor: theme.style.customerList.dangerBg },
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
    {
      name: 'CustomerDocumentsScreen',
      component: CustomerDocumentsScreen,
      drawer: {
        label: 'Архив',
      },
      header: {
        style: { backgroundColor: theme.style.drawer.header.bg },
        title: 'Архив',
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
    // console.log(value);
  }

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
