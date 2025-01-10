// import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Импортируем GestureHandlerRootView
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
// import OrderContextProvider from './store/context/order-context.js';
// import ClientContextProvider from './store/context/client-context.js';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { reduxPersistor, reduxStore } from './store/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
// import YaMap from 'react-native-yamap';
// import { useEffect } from 'react';
import SynchronizationScreen from './screens/SynchronizationScreen.js';
// import CustomerScreen from './screens/CustomerScreen.js';
import ManageProductsScreen from './screens/ManageProductsScreen/';
// import ThemeProvider from './store/context/theme-context.js';
import { getThemePalette } from './store/redux/selectors/theme.js';
// import ThemeScreen from './screens/ThemeScreen.js';
import DaySummaryScreen from './screens/DaySummaryScreen.js';
import DocumentListScreen from './screens/DocumentListScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
import DocumentScreen from './screens/DocumentScreen.js';
// import CustomerDebtScreen from './screens/CustomerScreen/CustomerDebtScreen.js';
// import CustomerOrderScreen from './screens/CustomerScreen/CustomerOrderScreen.js';
// import CustomerReturnScreen from './screens/CustomerScreen/CustomerReturnScreen.js';
// import CustomerProfileScreen from './screens/CustomerScreen/CustomerProfileScreen.js';
import ThemeScreen from './screens/ThemeScreen.js';
import CustomerScreens from './screens/CustomerScreens/';
// import CustomerScreens from './screens/CustomerScreens/';
// import { loadColors } from './store/redux/slices/themeSlice.js';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
// const BottomTab2 = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const ManageProductsDrawer = createDrawerNavigator();
const SettingsDrawer = createDrawerNavigator();
// const CustomerStack = createNativeStackNavigator();

// function ManageProductsNavigator() {
//   return (
//     <ManageProductsDrawer.Navigator>
//       <ManageProductsDrawer.Screen
//         name='ManageProductsScreen'
//         component={ManageProductsScreen}
//         options={{ drawerLabel: 'Workplace Home' }}
//       />
//       {/* Добавьте другие экраны для WorkplaceDrawer здесь */}
//     </ManageProductsDrawer.Navigator>
//   );
// }

function SettingsDrawerNavigator({ theme, stackNavigation }) {
  return (
    <SettingsDrawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.bar.color },
        headerTintColor: theme.bar.active,
      })}
    >
      <SettingsDrawer.Screen
        name='SettingsMain'
        title='aaa'
        component={SettingsScreen}
        options={{
          drawerLabel: 'Основные',
          // headerStyle: { backgroundColor: theme.bar.color },
          // headerShown: false
        }}
      />
      <SettingsDrawer.Screen
        name='ThemeScreen'
        component={ThemeScreen}
        options={{
          drawerLabel: 'Цветовая схема',
          // headerShown: false,
          // headerStyle: { backgroundColor: theme.bar.color },
        }}
      />
      {/* Добавьте другие экраны для SettingsDrawer здесь */}
    </SettingsDrawer.Navigator>
  );
}

// function MyDrawer() {
//   return (
//     <Drawer.Navigator initialRouteName='CustomerOrderScreen'>
//       <Drawer.Screen
//         name='CustomerOrderScreen'
//         component={CustomerOrderScreen}
//       />
//       <Drawer.Screen
//         name='ManageProductsScreen'
//         component={ManageProductsScreen}
//       />
//     </Drawer.Navigator>
//   );
// }

function MainScreens({ navigation }) {
  const theme = useSelector(getThemePalette);
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.bar.color },
        headerTintColor: theme.bar.active,
        tabBarStyle: { backgroundColor: theme.bar.color },
        tabBarActiveTintColor: theme.bar.active,
        tabBarInactiveTintColor: theme.bar.text,
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
        // component={SettingsDrawerNavigator}
        options={{
          title: 'Настройки',
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='settings-outline' color={color} size={size} />
          ),
          // headerRight: null,
          headerShown: false,
        }}
      >
        {(props) => (
          <SettingsDrawerNavigator
            {...props}
            stackNavigation={navigation}
            theme={theme}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

// function CustomerStackNavigationScreens({ navigator }) {
//   <CustomerStack.Navigator>
//     <CustomerStack.Screen
//       name='CustomerScreens'
//       component={CustomerScreens}
//       options={{ title: 'Customer Order' }}
//     />
//     <CustomerStack.Screen
//       name='CustomerDebtScreen'
//       component={CustomerDebtScreen}
//       options={{ title: 'Customer Debt' }}
//     />
//     <CustomerStack.Screen
//       name='ManageProductsScreen'
//       component={ManageProductsNavigator}
//       options={{ title: 'Customer Debt' }}
//     />
//   </CustomerStack.Navigator>;
// }

// function CustomerScreens({ navigation }) {
//   const theme = useSelector(getThemePalette);
//   return (
//     <BottomTab2.Navigator
//       screenOptions={{
//         headerShown: false, // Скрыть заголовок BottomTab.Navigator
//         tabBarStyle: { backgroundColor: theme.bar.color },
//         tabBarActiveTintColor: theme.bar.active,
//         tabBarInactiveTintColor: theme.bar.text,
//       }}
//     >
//       <BottomTab2.Screen
//         name='CustomerOrderScreen'
//         options={{
//           title: 'Заявка',
//           tabBarLabel: 'Заявка',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name='document-text-outline' color={color} size={size} />
//           ),
//           // headerBackTitle: '',
//         }}
//       >
//         {(props) => (
//           <CustomerOrderScreen {...props} stackNavigation={navigation} />
//         )}
//       </BottomTab2.Screen>
//       <BottomTab2.Screen
//         name='CustomerDebtScreen'
//         component={CustomerDebtScreen}
//         options={{
//           title: 'Сверка',
//           tabBarLabel: 'Сверка',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name='pulse-outline' color={color} size={size} />
//           ),
//         }}
//       />
//       <BottomTab2.Screen
//         name='CustomerReturnScreen'
//         component={CustomerReturnScreen}
//         options={{
//           title: 'Возврат',
//           tabBarLabel: 'Возврат',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name='return-up-back-outline' color={color} size={size} />
//           ),
//           headerRight: null,
//         }}
//       />
//       <BottomTab2.Screen
//         name='CustomerProfileScreen'
//         component={CustomerProfileScreen}
//         options={{
//           title: 'Профиль',
//           tabBarLabel: 'Профиль',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons
//               name='information-circle-outline'
//               color={color}
//               size={size}
//             />
//           ),
//         }}
//       />
//     </BottomTab2.Navigator>
//   );
// }

function AppContent() {
  const theme = useSelector(getThemePalette);
  return (
    <>
      <NavigationContainer
        onStateChange={(state) => {
          // const currentRoute = state.routes[state.index];
          // console.log('NavigationContainer.onStateChange', currentRoute.name);
        }}
      >
        <Stack.Navigator
          onStateChange={(state) => {
            const currentRoute = state.routes[state.index];
            console.log('Stack.Navigator.onStateChange', currentRoute.name);
          }}
          screenOptions={{
            // headerShown: false, // Скрыть заголовок BottomTab.Navigator
            tabBarStyle: { backgroundColor: theme.bar.color },
            tabBarActiveTintColor: theme.bar.active,
            tabBarInactiveTintColor: theme.bar.text,
            gestureEnabled: false, // Отключает жест свайпа для возврата
          }}
        >
          <Stack.Screen
            name='MainScreens'
            component={MainScreens} //маршруты дня (список клиентов)
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='CustomerScreens'
            component={CustomerScreens} //страница клиента
            options={{
              headerStyle: { backgroundColor: theme.bar.color },
              headerTintColor: theme.bar.active,
              // headerBackTitle: '',
              // headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name='ManageProductsScreen'
            component={ManageProductsScreen} //подбор товаров в заявку клиента
            // options={{
            //   presentation: 'fullScreenModal',
            // }}
          />
          <Stack.Screen
            name='DocumentScreen'
            component={DocumentScreen} //подбор товаров в заявку клиента
            // options={{
            //   presentation: 'fullScreenModal',
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={reduxPersistor}>
            <AppContent />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
