import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import CustomerOrderScreen from './screens/CustomerOrderScreen';
import CustomerDebtScreen from './screens/CustomerDebtScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import CustomerReturnScreen from './screens/CustomerReturnScreen';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';
import {
  setSelectedCustomerScreen,
  setSelectedDocTab,
} from '../../store/redux/slices/selectedsSlice';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const titles = {
  CustomerOrderScreen: { label: 'Заявка' },
  CustomerDebtScreen: { label: 'Акт-сверки' },
  CustomerReturnScreen: { label: 'Возврат' },
  CustomerProfileScreen: { label: 'Сведения' },
};

const CustomHeader = ({ navigation, theme }) => {
  const route = useRoute(); // Получаем текущий маршрут
  const title = titles[route.name]?.label;

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: titles[route.name]?.backgroundColor },
      ]}
    >
      <TouchableOpacity
        style={[styles.leftButton]}
        onPress={() => navigation.openDrawer()} // Обработка нажатия кнопки
      >
        <Text
          style={[
            styles.headerButtonTitle,
            { color: theme.style.drawer.header.button.dark.text },
          ]}
        >
          Цель
        </Text>
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text
          style={[
            styles.headerButtonTitle,
            { color: theme.style.drawer.header.title },
          ]}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.rightButton,
          {
            backgroundColor: theme.style.drawer.header.button.main.bg,
          },
        ]}
        onPress={() => navigation.navigate('ManageProductsScreen')} // Обработка нажатия кнопки
      >
        <Text
          style={[
            styles.headerButtonTitle,
            { color: theme.style.drawer.header.button.main.text },
          ]}
        >
          Подбор
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerItem = (props) => {
  const { state, index, navigation, theme, name, label, onSelect } = props;

  const titleStyle = {};

  return (
    <DrawerItem
      label={label}
      labelStyle={[
        styles.menuItemText,
        {
          color:
            theme.style.drawer.listItem[
            index === state.index ? 'titleActive' : 'title'
            ],
        },
      ]}
      onPress={() => {
        if (typeof onSelect === 'function') {
          onSelect(name);
        }
        navigation.navigate(name);
      }}
      style={[
        styles.menuItem,
        {
          backgroundColor:
            theme.style.drawer.listItem[
            index === state.index ? 'bgActive' : 'bg'
            ],
        },
      ]}
    />
  );
};

const CustomDrawerContent = (props) => {
  const { rows, navigation, state, theme } = props;

  const handleDrawerClose = () => {
    navigation.closeDrawer(); // Закрываем Drawer
  };
  return (
    <DrawerContentScrollView
      {...props}
      style={[
        styles.drawerContent,
        // { backgroundColor: props.theme.style.drawer.bg }
      ]}
      contentContainerStyle={styles.contentContainerStyle} // Устанавливаем стили контента
    >
      <View style={styles.drawerContentContainer}>
        <DrawerItem
          label={''}
          labelStyle={[styles.menuItemText, { color: theme.style.drawer.bg }]}
          onPress={handleDrawerClose}
          style={[
            styles.menuItem,
            {
              backgroundColor: 'transparent',
              height: '40',
              marginBottom: 0,
            },
          ]}
        />
        {rows &&
          rows.map((item, index) => {
            return (
              <CustomDrawerItem
                key={index}
                index={index}
                state={state}
                navigation={navigation}
                theme={theme}
                name={item.name}
                label={item.label}
                onSelect={item?.onSelect}
              />
            );
          })}
        <DrawerItem
          label={''}
          labelStyle={[styles.menuItemText, { color: theme.style.drawer.bg }]}
          onPress={handleDrawerClose}
          style={[
            styles.menuItem,
            {
              backgroundColor: 'transparent',
              height: '100%',
            },
          ]}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export const CustomerDrawerScreens = ({ navigation }) => {
  const theme = useSelector(getThemePalette);
  const currentScreen = useSelector(
    (state) => state.selecteds.selectedCustomerScreen
  );
  const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state) => state.selecteds.selectedCustomer
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCustomer?.name,
      headerStyle: { backgroundColor: theme.style.bar },
      headerTintColor: theme.style.nav.text,
      headerBackTitle: '',
      headerBackVisible: true, // Показать кнопку "Назад"
      headerBackTitle: '', // Установка текста кнопки "Назад" на пустое значение
      headerBackImage: () => (
        <Ionicons
          name={'chevron-back-outline'}
          size={24}
          color={theme.style.text.main}
        />
      ), // ваш компонент иконки
    });
  }, [navigation, selectedCustomer]);

  function changeScreenHandler(screenName) {
    dispatch(setSelectedDocTab(screenName));
  }

  function onSelectScreenHandler(name) {
    //console.log(name);

    dispatch(setSelectedCustomerScreen(name));
  }

  const rows = Object.keys(titles).map((key) => ({
    name: key,
    label: titles[key].label,
    onSelect: (name) => onSelectScreenHandler(name),
  }));

  return (
    <Drawer.Navigator
      initialRouteName={currentScreen ? currentScreen : 'CustomerOrderScreen'} // Устанавливаем начальный экран
      screenOptions={({ navigation }) => ({
        header: () => <CustomHeader navigation={navigation} theme={theme} />, // Кастомный заголовок
        headerStyle: { backgroundColor: theme.style.drawer.header.bg },
        headerTintColor: theme.style.drawer.header.title,
        // drawerType: 'back', // overlay effect
        drawerType: 'front', // front overlay
        // drawerType: 'permanent', // всегда открытый
        overlayColor: 'rgba(0, 0, 0, 0.5)', // цвет затемнения
        drawerStyle: {
          backgroundColor: 'transparent', // Цвет фона для выезжающей панели
          // backgroundColor: theme.style.drawer.bg, // Цвет фона для выезжающей панели
          width: '70%', // Пример ширины
        },
      })}
      // Отслеживание изменения состояния навигации
      // screenListeners={{
      //   state: (e) => {
      //     // Do something with the state
      //     const currentRoute = e.data.state.routes[e.data.state.index];
      //     console.log('Drawer.Navigator state changed', currentRoute);
      //   },
      // }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} theme={theme} rows={rows} />
      )}
    >
      <Drawer.Screen
        name='CustomerOrderScreen'
        component={CustomerOrderScreen}
        options={{
          drawerLabel: 'Заявка',
          title: 'Заявка',
          // headerRight: () => (
          //   <Button
          //     style={[
          //       styles.manageButton,
          //       {
          //         backgroundColor: theme.style.drawer.header.button.dark.bg,
          //       },
          //     ]}
          //     titleStyle={{
          //       color: theme.style.drawer.header.button.dark.text,
          //     }}
          //     onPress={() => {
          //       navigation.navigate('ManageProductsScreen');
          //     }}
          //   >
          //     Подбор
          //   </Button>
          // ),
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerOrderScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerDebtScreen'
        component={CustomerDebtScreen}
        options={{
          drawerLabel: 'Акт-сверки',
          title: 'Акт-сверки',
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerDebtScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerReturnScreen'
        component={CustomerReturnScreen}
        options={{
          drawerLabel: 'Возврат',
          title: 'Возврат',
          // headerRight: () => (
          //   <Button
          //     style={[
          //       styles.manageButton,
          //       { backgroundColor: theme.success.light },
          //     ]}
          //     color={theme.success.light}
          //     onPress={() => {
          //       navigation.navigate('ManageProductsScreen');
          //     }}
          //   >
          //     Подбор
          //   </Button>
          // ),
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerReturnScreen'),
        })}
      />
      <Drawer.Screen
        name='CustomerProfileScreen'
        component={CustomerProfileScreen}
        options={{
          drawerLabel: 'Сведения',
          title: 'Сведения',
        }}
        listeners={({ navigation }) => ({
          focus: () => changeScreenHandler('CustomerProfileScreen'),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
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
  headerTitleContainer: {
    maxWidth: '55%',
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
  rightButton: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 16, // Закругленный угол слева
    // borderStartEndRadius: 10,     // Закругленный угол справа
    borderEndStartRadius: 16, // Закругленный угол справа
    paddingRight: 10,
    maxWidth: '30%',
  },
  contentContainerStyle: {
    flexGrow: 1, // Это помогает контейнеру занимать всю доступную ширину
    paddingHorizontal: 0, // Убираем отступы по горизонтали
    paddingLeft: 0, // Убираем отступ слева
    // backgroundColor: 'red', // Здесь можете оставить только для проверки
    paddingTop: 0, // Убираем отступ сверху
    // paddingBottom: 0, // Убираем отступ снизу
    paddingStart: 0, // Убираем стартовый отступ (слева)
    // paddingEnd: 0, // Убираем концевой отступ (справа)
    // backgroundColor: 'transparent'
  },
  drawerContent: {
    flex: 1,
    padding: 0, // Убедитесь, что здесь нет padding
    margin: 0, // Убедитесь, что здесь нет margin
    paddingHorizontal: 0, // Убираем отступы
    // backgroundColor: '#A3C4D7', // Цвет фона для выезжающей панели
    padding: 0, // Убираем все отступы
    marginHorizontal: 0,
    // backgroundColor: 'transparent'
  },
  drawerContentContainer: {
    paddingVertical: 0, // Убираем вертикальные отступы
    margin: 0, // Убедитесь, что здесь нет ненужных отступов
    // marginTop: 10
  },
  menuItem: {
    paddingHorizontal: 0, // Убираем горизонтальные отступы
    marginVertical: 8,
    paddingVertical: 6, // Задайте нужный вертикальный padding
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  menuItemText: {
    fontSize: 16,
  },
});
