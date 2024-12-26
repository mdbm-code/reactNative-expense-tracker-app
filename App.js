import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

//constants
import { GlobalStyles } from './constans/styles';

//screens
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses.js';

//components
import IconButton from './components/ui/IconButton.js';

//state
import OrderContextProvider from './store/context/order-context.js';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            name='add'
            color={tintColor}
            size={24}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Текущие заявки',
          tabBarLabel: 'Недавние',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='hourglass' color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'Все заявки',
          tabBarLabel: 'Все',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar' color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <OrderContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </OrderContextProvider>
    </>
  );
}
