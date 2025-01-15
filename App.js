import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

//state
import { reduxPersistor, reduxStore } from './store/redux/store.js';
import { getThemePalette } from './store/redux/selectors/theme.js';

//screens
import CustomersListScreen from './screens/CustomersListScreen.js';
import SynchronizationScreen from './screens/SynchronizationScreen.js';
import ManageProductsScreen from './screens/ManageProductsScreen/';
import DocumentListScreen from './screens/DocumentListScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
import DocumentScreen from './screens/DocumentScreen.js';
import ThemeScreen from './screens/ThemeScreen.js';
import CustomerScreens from './screens/CustomerScreens/';
import SummaryScreen from './screens/SummaryScreen.js';
import DocumentsScreen from './screens/DocumentsScreen.js';
import CustomerPromoScreen from './screens/CustomerScreens/screens/CustomerPromoScreen.js';
import CustomerScreensDrawer from './screens/CustomerScreens/CustomerScreensDrawer.js';
import ManageReturnProductsDrawer from './screens/ManageProductsScreen/ManageReturnProductsDrawer.js';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const SettingsDrawer = createDrawerNavigator();

function SettingsDrawerNavigator({ theme, stackNavigation }) {
  return (
    <SettingsDrawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.style.nav.bg },
        headerTintColor: theme.style.nav.text,
      })}
    >
      <SettingsDrawer.Screen
        name='SettingsMain'
        title='aaa'
        component={SettingsScreen}
        options={{
          drawerLabel: 'Основные',
        }}
      />
      <SettingsDrawer.Screen
        name='ThemeScreen'
        component={ThemeScreen}
        options={{
          drawerLabel: 'Цветовая схема',
        }}
      />
    </SettingsDrawer.Navigator>
  );
}

function MainScreens({ navigation }) {
  const theme = useSelector(getThemePalette);
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.style.nav.bg },
        headerTintColor: theme.style.nav.text,
        // headerStyle: { backgroundColor: theme.bar.color },
        // headerTintColor: theme.bar.active,
        tabBarStyle: { backgroundColor: theme.style.nav.bg },
        tabBarActiveTintColor: theme.style.nav.activeIcon,
        tabBarInactiveTintColor: theme.style.nav.inactiveIcon,
      })}
    >
      <BottomTab.Screen
        name='CustomersListScreen'
        component={CustomersListScreen}
        options={{
          // title: 'Мои клиенты',
          tabBarLabel: 'Клиенты',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='people-outline' color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Summary'
        component={SummaryScreen}
        options={{
          title: 'Отчеты',
          tabBarLabel: 'Отчеты',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='flag-outline' color={color} size={size} />
          ),
          headerRight: null,
        }}
      />
      <BottomTab.Screen
        name='DocumentsScreen'
        component={DocumentsScreen}
        options={{
          title: 'Журнал заявок',
          tabBarLabel: 'Журнал',
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
      {/* {(props) => (
          <SettingsDrawerNavigator
            {...props}
            stackNavigation={navigation}
            theme={theme}
          />
        )}
      </BottomTab.Screen> */}
    </BottomTab.Navigator>
  );
}

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
            name='CustomerScreensDrawer'
            component={CustomerScreensDrawer} //страница клиента
          />
          <Stack.Screen
            name='CustomerPromoScreen'
            component={CustomerPromoScreen} //страница клиента
          />
          <Stack.Screen
            name='ManageProductsScreen'
            component={ManageProductsScreen} //подбор товаров в заявку клиента
          />
          <Stack.Screen
            name='ManageReturnProductsDrawer'
            component={ManageReturnProductsDrawer} //подбор товаров на возврат
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
