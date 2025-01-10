import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerOrderScreen from './screens/CustomerOrderScreen';
import CustomerDebtScreen from './screens/CustomerDebtScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import CustomerReturnScreen from './screens/CustomerReturnScreen';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';
import { setSelectedDocTab } from '../../store/redux/slices/selectedsSlice';

const Drawer = createDrawerNavigator();

export const CustomerDrawerScreens = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  const currentScreen = useSelector((state) => state.selecteds.selectedDocTab);
  const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  // const [currentScreen, setCurrentScreen] = useState('CustomerOrderScreen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCustomer?.name,
      headerBackTitle: '',
    });
  }, [navigation, selectedCustomer]);

  function changeScreenHandler(screenName) {
    // console.log(screenName);

    dispatch(setSelectedDocTab(screenName));
  }

  return (
    <Drawer.Navigator
      initialRouteName={currentScreen ? currentScreen : 'CustomerOrderScreen'} // Устанавливаем начальный экран
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.bar.color },
        headerTintColor: theme.bar.active,
        // drawerType: 'back', // overlay effect
        drawerType: 'front', // front overlay
        // drawerType: 'permanent', // всегда открытый
        overlayColor: 'rgba(0, 0, 0, 0.5)', // цвет затемнения
      })}
    // Отслеживание изменения состояния навигации
    // screenListeners={{
    //   state: (e) => {
    //     // Do something with the state
    //     const currentRoute = e.data.state.routes[e.data.state.index];
    //     console.log('Drawer.Navigator state changed', currentRoute);
    //   },
    // }}
    >
      <Drawer.Screen
        name='CustomerOrderScreen'
        component={CustomerOrderScreen}
        options={{
          drawerLabel: 'Заявка',
          title: 'Заявка',
          headerRight: () => (
            <Button
              style={[
                styles.manageButton,
                { backgroundColor: theme.success.light },
              ]}
              onPress={() => {
                navigation.navigate('ManageProductsScreen');
              }}
            >
              Подбор
            </Button>
          ),
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerOrderScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerDebtScreen'
        component={CustomerDebtScreen}
        options={{
          drawerLabel: 'Акт-сверки',
          title: 'Акт-сверки',
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerDebtScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerReturnScreen'
        component={CustomerReturnScreen}
        options={{
          drawerLabel: 'Возврат',
          title: 'Возврат',
          headerRight: () => (
            <Button
              style={[
                styles.manageButton,
                { backgroundColor: theme.success.light },
              ]}
              color={theme.success.light}
              onPress={() => {
                navigation.navigate('ManageProductsScreen');
              }}
            >
              Подбор
            </Button>
          ),
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerReturnScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerProfileScreen'
        component={CustomerProfileScreen}
        options={{
          drawerLabel: 'Сведения',
          title: 'Сведения',
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerProfileScreen'),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  manageButton: {
    borderStartStartRadius: 16,   // Закругленный угол слева
    // borderStartEndRadius: 10,     // Закругленный угол справа
    borderEndStartRadius: 16,     // Закругленный угол справа
    paddingLeft: 10,
  },
});
