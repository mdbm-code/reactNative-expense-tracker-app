// import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Импортируем GestureHandlerRootView
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

//constants
// import { GlobalStyles } from './constans/styles';

//screens
// import ManageOrder from './screens/ManageOrder.js';
// import AllExpenses from './screens/AllExpenses';
// import RecentExpenses from './screens/RecentExpenses.js';
// import ManageOrderProducts from './screens/ManageOrderProducts.js';
import CustomersListScreen from './screens/CustomersListScreen.js';

//components
import IconButton from './components/ui/IconButton.js';

//state
import OrderContextProvider from './store/context/order-context.js';
import ClientContextProvider from './store/context/client-context.js';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { reduxPersistor, reduxStore } from './store/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
// import YaMap from 'react-native-yamap';
// import { useEffect } from 'react';
import SynchronizationScreen from './screens/SynchronizationScreen.js';
import CustomerScreen from './screens/CustomerScreen.js';
import ManageProductsScreen from './screens/ManageProductsScreen.js';
// import ThemeProvider from './store/context/theme-context.js';
import { getThemePalette } from './store/redux/selectors/theme.js';
import ThemeScreen from './screens/ThemeScreen.js';
import DaySummaryScreen from './screens/DaySummaryScreen.js';
import DocumentListScreen from './screens/DocumentListScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
// import { loadColors } from './store/redux/slices/themeSlice.js';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function CustomersOverview() {
  const theme = useSelector(getThemePalette);
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.bar.color },
        //headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: theme.bar.active,
        tabBarStyle: { backgroundColor: theme.bar.color },
        // tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: theme.bar.active,
        tabBarInactiveTintColor: theme.bar.text,
        // tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            name='search'
            color={tintColor}
            size={24}
            onPress={() => navigation.navigate('CustomerScreen')}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name='CustomersListScreen'
        component={CustomersListScreen}
        options={{
          title: 'Мои клиенты',
          tabBarLabel: 'Клиенты',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='people-outline' color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              name='search'
              color={tintColor}
              size={24}
              onPress={() => navigation.navigate('CustomerScreen')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name='DaySummary'
        component={DaySummaryScreen}
        options={{
          title: 'Итоги дня',
          tabBarLabel: 'Итоги дня',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='flag-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
      <BottomTab.Screen
        name='DocumentListScreen'
        component={DocumentListScreen}
        options={{
          title: 'История',
          tabBarLabel: 'История',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
      {/* <BottomTab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'Все заявки',
          tabBarLabel: 'Журнал',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar' color={color} size={size} />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name='Sync'
        component={SynchronizationScreen}
        options={{
          title: 'Обмен',
          tabBarLabel: 'Обмен',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='sync-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
      <BottomTab.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={{
          title: 'Настройки',
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='settings-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={reduxPersistor}>
            <OrderContextProvider>
              <ClientContextProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      // headerStyle: {
                      //   backgroundColor: GlobalStyles.colors.primary500,
                      // },
                      headerTintColor: 'white',
                    }}
                  >
                    <Stack.Screen
                      name='CustomersOverview'
                      component={CustomersOverview} //маршруты дня (список клиентов)
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name='CustomerScreen'
                      component={CustomerScreen} //страница клиента
                      // options={{
                      //   presentation: 'fullScreenModal',
                      // }}
                    />
                    <Stack.Screen
                      name='ManageProductsScreen'
                      component={ManageProductsScreen} //подбор товаров в заявку клиента
                      // options={{
                      //   presentation: 'fullScreenModal',
                      // }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </ClientContextProvider>
            </OrderContextProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
