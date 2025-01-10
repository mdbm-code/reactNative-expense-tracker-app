import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { ManageProductsHomeScreen } from './ManageProductsHomeScreen';
import ProductMenu from '../../components/ManageProductsScreen/ProductsMenu';
import ProductsMenuButton from '../../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
import { setUnselectMenu } from '../../store/redux/slices/selectedsSlice';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function GroupList({ navigation, theme }) {
  const dispatch = useDispatch();
  function onPressHandler(payload) {
    console.log(payload);
    navigation.closeDrawer();
    dispatch(setUnselectMenu());
  }

  return (
    <View style={[styles.drawerContent, { backgroundColor: 'white' }]}>
      <ProductsMenuButton
        title={'Популярные'}
        theme={theme}
        // selected={!selectedMenuLevel_1}
        // iconName={selectedMenuLevel_1 === code ? 'chevron-up-outline' : 'chevron-down-outline'}
        onPress={() => onPressHandler(null)}
      />
      <ProductMenu closeDrawer={() => navigation.closeDrawer()} />
    </View>
  );
}

export const ManageProductsDrawerScreen = ({ navigation }) => {
  const theme = useSelector(getThemePalette);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerTitleStyle: { fontSize: 20 },
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
      drawerContent={(props) => <GroupList {...props} theme={theme} />}
    >
      <Drawer.Screen name='Home'>
        {(props) => <ManageProductsHomeScreen {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 6,
  },
});
