import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerOrderScreen from './screens/CustomerOrderScreen';
import CustomerDebtScreen from './screens/CustomerDebtScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import CustomerReturnScreen from './screens/CustomerReturnScreen';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';

const Drawer = createDrawerNavigator();

export const CustomerDrawerScreens = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  const selectedCustomer = useSelector(
    (state) => state.selecteds.selectedCustomer
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCustomer?.name,
      headerBackTitle: 'Назад',
      //   headerRight: () => (
      //     <IconButton
      //       name='add-circle-outline'
      //       color={'white'}
      //       size={30}
      //       onPress={() => {
      //         stackNavigation.navigate('ManageProductsScreen');
      //       }}
      //     />
      //   ),
    });
  }, [navigation]);

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.bar.color },
        headerTintColor: theme.bar.active,
      })}
    >
      <Drawer.Screen
        name='CustomerOrderScreen'
        component={CustomerOrderScreen}
        options={{
          drawerLabel: 'Заявка',
          title: 'Заявка',
          // headerStyle: { backgroundColor: theme.bar.color },
          // headerShown: false
          headerRight: () => (
            // <IconButton
            //   name='add-circle-outline'
            //   color={'white'}
            //   size={30}
            //   onPress={() => {
            //     navigation.navigate('ManageProductsScreen');
            //   }}
            // />
            <Button
              onPress={() => {
                navigation.navigate('ManageProductsScreen');
                // navigation.navigate('CustomerManageProductsScreen');
              }}
            >
              Подбор
            </Button>
          ),
        }}
      />
      <Drawer.Screen
        name='CustomerDebtScreen'
        component={CustomerDebtScreen}
        options={{
          drawerLabel: 'Акт-сверки',
          title: 'Акт-сверки',
          // headerShown: false,
          // headerStyle: { backgroundColor: theme.bar.color },
        }}
      />
      <Drawer.Screen
        name='CustomerReturnScreen'
        component={CustomerReturnScreen}
        options={{
          drawerLabel: 'Возврат',
          title: 'Возврат',
          // headerShown: false,
          // headerStyle: { backgroundColor: theme.bar.color },
        }}
      />
      <Drawer.Screen
        name='CustomerProfileScreen'
        component={CustomerProfileScreen}
        options={{
          drawerLabel: 'Сведения',
          title: 'Сведения',
          // headerShown: false,
          // headerStyle: { backgroundColor: theme.bar.color },
        }}
      />
    </Drawer.Navigator>
  );
};

CustomerDrawerScreens;

const styles = StyleSheet.create({});
