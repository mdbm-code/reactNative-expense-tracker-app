import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function GroupList({ navigation }) {
  const groups = ['Group 1', 'Group 2', 'Group 3'];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {groups.map((group, index) => (
        <TouchableOpacity
          key={index}
          onPr
          ess={() => {
            // Закрыть Drawer при выборе группы
            navigation.closeDrawer();
            // Дополнительная логика при выборе группы
            console.log(`Selected ${group}`);
          }}
        >
          <Text style={{ marginVertical: 10 }}>{group}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title='Open Drawer' onPress={() => navigation.openDrawer()} />
    </View>
  );
}

export const ManageProductsDrawerScreen = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerStyle: {
        backgroundColor: theme.bar.color,
      },
      headerTintColor: theme.bar.active,
    });
  }, [navigation]);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        overlayColor: 'transparent', // Прозрачный оверлей для клика снаружи
      }}
      drawerContent={(props) => <GroupList {...props} />}
    >
      <Drawer.Screen name='Home' component={HomeScreen} />
      {/* <Drawer.Screen
        name='Home'
        //   component={HomeScreen}
      >
        {(props) => <HomeScreen onPress={openDrawerHandle} {...props} />}
      </Drawer.Screen> */}
    </Drawer.Navigator>
  );
};

// export default ManageProductsDrawerScreen;

const styles = StyleSheet.create({});
