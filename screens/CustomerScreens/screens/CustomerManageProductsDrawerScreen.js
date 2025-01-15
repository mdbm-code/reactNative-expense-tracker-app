import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function GroupList({ rootNavigation }) {
  const groups = ['Group 1', 'Group 2', 'Group 3'];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {groups.map((group, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            // Закрыть Drawer при выборе группы
            rootNavigation.closeDrawer();
            // Дополнительная логика при выборе группы
            // console.log(`Selected ${group}`);
          }}
        >
          <Text style={{ marginVertical: 10 }}>{group}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function HomeScreen({ rootNavigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title='Open Drawer' onPress={() => rootNavigation.openDrawer()} />
    </View>
  );
}

const CustomerManageProductsDrawerScreen = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        overlayColor: 'transparent', // Прозрачный оверлей для клика снаружи
      }}
      drawerContent={(props) => (
        <GroupList {...props} rootNavigation={navigation} />
      )}
    >
      <Drawer.Screen name='Home' component={HomeScreen}>
        {(props) => <HomeScreen {...props} rootNavigation={navigation} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default CustomerManageProductsDrawerScreen;

const styles = StyleSheet.create({});
