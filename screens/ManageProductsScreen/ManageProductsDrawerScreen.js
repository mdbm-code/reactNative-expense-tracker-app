import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { ManageProductsHomeScreen } from './ManageProductsHomeScreen';
import ProductMenu from '../../components/ManageProductsScreen/ProductsMenu';
import ProductsMenuButton from '../../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
import { setUnselectMenu } from '../../store/redux/slices/selectedsSlice';
import IconButton from '../../components/ui/IconButton';

const Drawer = createDrawerNavigator();


const CustomHeader = ({ navigation, theme }) => {
  // const route = useRoute(); // Получаем текущий маршрут
  const title = 'Подбор';


  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.style.drawer.header.button.light.bg }]}>
      <TouchableOpacity
        style={[styles.taskButton, { backgroundColor: theme.style.drawer.header.button.dark.bg }]}
        onPress={() => navigation.openDrawer()} // Обработка нажатия кнопки
      >
        <Text style={[styles.headerButtonTitle, { color: theme.style.drawer.header.button.dark.text }]}>Фильтр</Text>
      </TouchableOpacity>
      <Text style={[styles.headerButtonTitle, { color: theme.style.text.main }]} >{title}</Text>
      {/* <TouchableOpacity
        style={[styles.manageButton, {
          backgroundColor: theme.style.drawer.header.button.light.bg,
        }]}
        onPress={() => navigation.navigate('ManageProductsScreen')} // Обработка нажатия кнопки
      >
        <Text style={[styles.headerButtonTitle, { color: theme.style.drawer.header.button.dark.text }]}>Поиск</Text>
      </TouchableOpacity> */}
      <IconButton
        name='search'
        color={'black'}
        // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
        size={24}
        onPress={() => {
          // setShowSearchPanel(!showSearchPanel);
          // closeDrawer();
        }}
      />
    </View>
  );
};

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
        backgroundColor: theme.style.bar,
      },
      headerTintColor: theme.style.nav.text,
    });
  }, [navigation]);

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <CustomHeader navigation={navigation} theme={theme} />,
        // drawerType: 'slide',
        // overlayColor: 'transparent', // Прозрачный оверлей для клика снаружи
        // drawerType: 'back', // overlay effect
        drawerType: 'front', // front overlay
        // drawerType: 'permanent', // всегда открытый
        overlayColor: 'rgba(0, 0, 0, 0.5)', // цвет затемнения
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#A3C4D7', // Цвет фона заголовка
    height: 60, // Высота заголовка
    // paddingHorizontal: 20,
  },
  taskButton: {
    backgroundColor: '#00509E', // Цвет фона для кнопки
    borderRadius: 15, // Закругленные углы
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 0,   // Закругленный угол слева
    borderStartEndRadius: 16,     // Закругленный угол справа
    borderEndStartRadius: 0,     // Закругленный угол справа
    paddingLeft: 10,
    minWidth: 100,
  },
  headerButtonTitle: {
    // color: '#FFFFFF', // Цвет текста на кнопке
    fontSize: 16,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageButton: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 16,   // Закругленный угол слева
    // borderStartEndRadius: 10,     // Закругленный угол справа
    borderEndStartRadius: 16,     // Закругленный угол справа
    paddingRight: 10,
  },
});
