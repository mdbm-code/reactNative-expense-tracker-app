import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { Ionicons } from '@expo/vector-icons';
import CustomerOrderScreen from '../CustomerScreen/CustomerOrderScreen';
import CustomerDebtScreen from '../CustomerScreen/CustomerDebtScreen';
import CustomerReturnScreen from '../CustomerScreen/CustomerReturnScreen';
import CustomerProfileScreen from '../CustomerScreen/CustomerProfileScreen';

const BottomTab = createBottomTabNavigator();

export const CustomerBNScreens = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false, // Скрыть заголовок BottomTab.Navigator
        tabBarStyle: { backgroundColor: theme.bar.color },
        tabBarActiveTintColor: theme.bar.active,
        tabBarInactiveTintColor: theme.bar.text,
      }}
    >
      <BottomTab.Screen
        name='CustomerOrderScreen'
        options={{
          title: 'Заявка',
          tabBarLabel: 'Заявка',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='document-text-outline' color={color} size={size} />
          ),
          // headerBackTitle: '',
        }}
      >
        {(props) => (
          <CustomerOrderScreen {...props} stackNavigation={navigation} />
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name='CustomerDebtScreen'
        component={CustomerDebtScreen}
        options={{
          title: 'Сверка',
          tabBarLabel: 'Сверка',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='pulse-outline' color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name='CustomerReturnScreen'
        component={CustomerReturnScreen}
        options={{
          title: 'Возврат',
          tabBarLabel: 'Возврат',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='return-up-back-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
      <BottomTab.Screen
        name='CustomerProfileScreen'
        component={CustomerProfileScreen}
        options={{
          title: 'Профиль',
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name='information-circle-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({});
