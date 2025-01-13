import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
// import { ManageProductsHomeScreen } from './ManageProductsHomeScreen';
import ProductMenu from '../../components/ManageProductsScreen/ProductsMenu';
// import ProductsMenuButton from '../../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
import { setSearchString } from '../../store/redux/slices/selectedsSlice';
import IconButton from '../../components/ui/IconButton';
import SearchPanel from '../../components/SearchPanel';
import ManageProductsTableScreen from './ManageProductsTableScreen';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation, theme }) => {
  const { selectedMenuLevel_2 } = useSelector((state) => state.selecteds);
  const dispatch = useDispatch();
  const [showSearchPanel, setShowSearchPanel] = React.useState(false);

  const title = selectedMenuLevel_2?.name || 'Популярные';

  function handleSearch(searchString) {
    dispatch(setSearchString(searchString)); // Сохраняем поисковую строку в состоянии
    Keyboard.dismiss(); // Закрываем клавиатуру
  }
  function handleCancelSearch() {
    dispatch(setSearchString('')); // Сохраняем поисковую строку в состоянии
    setShowSearchPanel(false);
  }

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.style.drawer.header.button.light.bg },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.leftButton,
            { backgroundColor: theme.style.drawer.header.button.dark.bg },
          ]}
          onPress={() => navigation.openDrawer()} // Обработка нажатия кнопки
        >
          <Text
            style={[
              styles.headerButtonTitle,
              { color: theme.style.drawer.header.button.dark.text },
            ]}
          >
            Фильтр
          </Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text
            style={[
              styles.headerButtonTitle,
              styles.headerTitle,
              { color: theme.style.text.main },
            ]}
          >
            {title}
          </Text>
        </View>
        {/* <TouchableOpacity
        style={[styles.manageButton, {
          backgroundColor: theme.style.drawer.header.button.light.bg,
        }]}
        onPress={() => navigation.navigate('ManageProductsScreen')} // Обработка нажатия кнопки
      >
        <Text style={[styles.headerButtonTitle, { color: theme.style.drawer.header.button.dark.text }]}>Поиск</Text>
      </TouchableOpacity> */}
        <View style={styles.rightButton}>
          <IconButton
            name='search'
            color={'black'}
            // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
            size={24}
            onPress={() => {
              setShowSearchPanel(!showSearchPanel);
              // closeDrawer();
            }}
          />
        </View>
        {showSearchPanel && (
          <SearchPanel
            onCancel={handleCancelSearch}
            onSearch={handleSearch}
            theme={theme}
          />
        )}
      </View>
    </>
  );
};

function CustomDrawerContent(props) {
  const { navigation, state, theme } = props;
  const handleDrawerClose = () => {
    navigation.closeDrawer(); // Закрываем Drawer
  };

  return (
    <View style={[styles.drawerContent, { backgroundColor: theme.style.bg }]}>
      <ProductMenu closeDrawer={handleDrawerClose} />
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
      screenOptions={({ navigation }) => ({
        header: () => <CustomHeader navigation={navigation} theme={theme} />,
        // drawerType: 'slide',
        // drawerType: 'back', // overlay effect
        drawerType: 'front', // front overlay
        // drawerType: 'permanent', // всегда открытый
        overlayColor: 'rgba(0, 0, 0, 0.5)', // цвет затемнения
        // overlayColor: 'transparent', // Прозрачный оверлей для клика снаружи
        drawerStyle: {
          // backgroundColor: 'transparent', // Цвет фона для выезжающей панели
          // backgroundColor: theme.style.drawer.bg, // Цвет фона для выезжающей панели
          width: '70%', // Пример ширины
        },
      })}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} theme={theme} />
      )}
    >
      <Drawer.Screen name='ManageProductsHomeScreen'>
        {(props) => <ManageProductsTableScreen {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#A3C4D7', // Цвет фона заголовка
    height: 60, // Высота заголовка
    // paddingHorizontal: 20,
  },
  leftButton: {
    backgroundColor: '#00509E', // Цвет фона для кнопки
    borderRadius: 15, // Закругленные углы
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 0, // Закругленный угол слева
    borderStartEndRadius: 16, // Закругленный угол справа
    borderEndStartRadius: 0, // Закругленный угол справа
    paddingLeft: 10,
    minWidth: 100,
    maxWidth: '30%',
  },
  rightButton: {
    maxWidth: '15%',
  },
  headerTitleContainer: {
    maxWidth: '55%',
  },
  headerButtonTitle: {
    // color: '#FFFFFF', // Цвет текста на кнопке
    fontSize: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
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
    borderStartStartRadius: 16, // Закругленный угол слева
    // borderStartEndRadius: 10,     // Закругленный угол справа
    borderEndStartRadius: 16, // Закругленный угол справа
    paddingRight: 10,
  },
});
