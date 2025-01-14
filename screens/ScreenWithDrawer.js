import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
// import CustomerOrderScreen from './screens/CustomerOrderScreen';
// import CustomerDebtScreen from './screens/CustomerDebtScreen';
// import CustomerProfileScreen from './screens/CustomerProfileScreen';
// import CustomerReturnScreen from './screens/CustomerReturnScreen';
// import { getThemePalette } from '../../store/redux/selectors/theme';
// import { useDispatch, useSelector } from 'react-redux';
// // import IconButton from '../../../components/ui/IconButton';
// import Button from '../../components/ui/Button';
// import {
//   setSelectedCustomerScreen,
//   setSelectedDocTab,
// } from '../../store/redux/slices/selectedsSlice';
// import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import IconButton from '../components/ui/IconButton';
const Drawer = createDrawerNavigator();

const ScreenWithDrawer = ({
  screens,
  theme,
  onChangeScreen,
  screenOptions,
  headerParts,
}) => {
  const [currentScreen, setCurrentScreen] = useState({
    name: '',
    title: '',
    backgroundColor: '',
  });

  function changeScreenHandler(value) {
    setCurrentScreen((prevState) => ({ ...prevState, ...value }));
    if (typeof onChangeScreen === 'function') {
      onChangeScreen(screenName);
    }
  }

  const HeaderPart = ({
    title,
    color,
    onPress,
    position,
    navigation,
    openDrawer,
    iconName,
    size,
  }) => {
    return (
      <TouchableOpacity
        style={[styles[`${position}Button`]]}
        onPress={() => {
          if (openDrawer) {
            navigation.openDrawer();
          } else if (typeof onPress === 'function') {
            onPress();
          }
        }}
      >
        {iconName ? (
          <Ionicons
            name={iconName}
            size={size || 24}
            color={color || 'black'}
          />
        ) : (
          <Text
            style={[
              styles.headerButtonTitle,
              {
                color: color
                  ? color
                  : theme.style.drawer.header.button.dark.text,
              },
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const CustomHeader = ({ navigation, headerParts }) => {
    return (
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: currentScreen?.backgroundColor },
        ]}
      >
        {Array.isArray(headerParts) &&
          headerParts.map((part) => {
            if (part?.type === 'button') {
              return (
                <HeaderPart
                  title={part?.title}
                  color={part?.color}
                  onPress={part?.onPress}
                  position={part?.position}
                  navigation={navigation}
                  openDrawer={part?.openDrawer}
                  iconName={part?.iconName}
                  size={part?.size || 24}
                />
              );
            } else if (part?.type === 'title') {
              return (
                <View style={styles.headerTitleContainer}>
                  <Text
                    style={[styles.headerButtonTitle, { color: part?.color }]}
                  >
                    {part?.title}
                  </Text>
                </View>
              );
            }
          })}
      </View>
    );
  };

  const CustomDrawerItem = (props) => {
    const { state, index, navigation, theme, name, label, onSelect } = props;

    return (
      <DrawerItem
        label={label || 'ыыы'}
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

    console.log('CustomDrawerContent rows', rows);

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
                  name={item?.name}
                  label={item?.title}
                  onSelect={item?.onSelect}
                />
              );
            })}
          <DrawerItem
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

  return (
    <Drawer.Navigator
      initialRouteName={currentScreen?.name ? currentScreen.name : null} // Устанавливаем начальный экран
      screenOptions={({ navigation }) => ({
        header: () => (
          <CustomHeader
            navigation={navigation}
            theme={theme}
            headerPart={headerParts}
          />
        ),
        drawerType: screenOptions?.drawerType || 'front', //'back','permanent' // front overlay
        overlayColor: screenOptions?.overlayColor || 'rgba(0, 0, 0, 0.5)', // цвет затемнения
        drawerStyle: screenOptions?.drawerStyle || {
          backgroundColor: 'transparent', // Цвет фона для выезжающей панели
          width: '70%', // Пример ширины
        },
      })}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} theme={theme} rows={screens} />
      )}
    >
      {Array.isArray(screens) &&
        screens.map((screen, index) => {
          //   const Component = screen.component;
          return (
            <Drawer.Screen
              key={index}
              name={screen?.name}
              component={screen.component}
              options={{
                drawerLabel: screen?.drawerLabel,
                title: screen?.title,
                headerRight: screen?.headerRight,
              }}
              listeners={({ navigation }) => ({
                focus: () =>
                  changeScreenHandler({
                    name: screen?.name,
                    title: screen?.title,
                    backgroundColor: screen?.header?.backgroundColor,
                  }),
              })}
            >
              {/* <Component /> */}
            </Drawer.Screen>
          );
        })}
    </Drawer.Navigator>
  );
};

export default ScreenWithDrawer;

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
