import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

const ScreenWithDrawer = ({
  screens,
  theme,
  onChangeScreen,
  screenOptions,
  headerParts,
  customDrawerContent
}) => {
  const [currentScreen, setCurrentScreen] = useState({
    name: '',
    title: '',
    backgroundColor: '',
  });

  function changeScreenHandler(value) {
    setCurrentScreen((prevState) => ({ ...prevState, ...value }));
    if (typeof onChangeScreen === 'function') {
      onChangeScreen(value);
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
    style
  }) => {
    return (
      <TouchableOpacity
        style={[styles[`${position}Button`], style]}
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
          headerParts.map((part, index) => {
            if (part?.type === 'button') {
              return (
                <HeaderPart
                  key={index}
                  navigation={navigation}
                  {...part}
                />
              );
            } else if (part?.type === 'title') {
              return (
                <View key={index} style={styles.headerTitleContainer}>
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

    console.log('CustomDrawerItem label', typeof label, label);

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

  const DeafultDrawerContent = (props) => {
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
            label={'-'}
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
                  label={item?.drawer?.title || 'title'}
                  onSelect={item?.onSelect}
                />
              );
            })}
          <DrawerItem
            label={'-'}
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
            headerParts={headerParts}
          />
        ),
        drawerType: screenOptions?.drawerType || 'front', //'back','permanent' // front overlay
        overlayColor: screenOptions?.overlayColor || 'rgba(0, 0, 0, 0.5)', // цвет затемнения
        drawerStyle: screenOptions?.drawerStyle || {
          backgroundColor: 'transparent', // Цвет фона для выезжающей панели
          width: '70%', // Пример ширины
        },
      })}
      drawerContent={(props) => {
        console.log(typeof customDrawerContent);

        if (typeof customDrawerContent === 'function') {
          const CustomDrawerContent = customDrawerContent;
          return <CustomDrawerContent {...props} theme={theme} rows={screens} />
        } else {
          return <DeafultDrawerContent {...props} theme={theme} rows={screens} />
        }
      }}
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
                drawerLabel: screen?.drawer?.label,
                title: screen?.header?.title,
                headerRight: screen?.headerRight,
              }}
              listeners={({ navigation }) => ({
                focus: () =>
                  changeScreenHandler({
                    name: screen?.name,
                    title: screen?.header?.title,
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
  rightButton2: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 16, // Закругленный угол слева
    borderEndStartRadius: 16, // Закругленный угол справа
    paddingRight: 10,
    maxWidth: '30%',
    minWidth: 100,
  },
  rightButton: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16, // Закругленный верхний левый угол
    borderBottomLeftRadius: 16, // Закругленный нижний левый угол
    paddingRight: 10,
    maxWidth: '30%',
    minWidth: 100,
  },
  leftButton: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 16, // Закругленный верхний левый угол
    borderBottomRightRadius: 16, // Закругленный нижний левый угол
    paddingRight: 10,
    maxWidth: '30%',
    minWidth: 100,
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
