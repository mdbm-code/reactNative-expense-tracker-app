import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerDrawerScreens } from './CustomerDrawerScreens';
import { CustomerManageProductsScreen } from './screens/CustomerManageProductsScreen';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export const CustomerRootStackScreen = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  const selectedCustomer = useSelector(
    (state) => state.selecteds.selectedCustomer
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCustomer?.name,
      headerShown: false,
      //   headerBackTitle: '',
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.bar.color },
        headerTintColor: theme.bar.active,
        // headerShown: false, // Скрыть заголовок BottomTab.Navigator
        // tabBarStyle: { backgroundColor: theme.bar.color },
        // tabBarActiveTintColor: theme.bar.active,
        // tabBarInactiveTintColor: theme.bar.text,
        gestureEnabled: false, // Отключает жест свайпа для возврата
      }}
    >
      <Stack.Screen
        name='CustomerDrawerScreens'
        component={CustomerDrawerScreens} //маршруты дня (список клиентов)
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name='CustomerManageProductsScreen'
        component={CustomerManageProductsScreen} //страница клиента
        options={
          {
            //   headerStyle: { backgroundColor: theme.bar.color },
            //   headerTintColor: theme.bar.active,
            // headerBackTitle: '',
            // headerBackTitleVisible: false,
          }
        }
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
