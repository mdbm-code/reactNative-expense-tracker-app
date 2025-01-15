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
  customDrawerContent,
  children,
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

  const CustomHeaderButton = ({
    title,
    color,
    onPress,
    position,
    navigation,
    openDrawer,
    iconName,
    size,
    style,
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
          <Ionicons name={iconName} size={size || 24} color={color} />
        ) : (
          <Text style={[styles.headerText, { color: color }]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const CustomHeaderItem = ({ item, navigation }) => {
    if (item?.type === 'button') {
      return <CustomHeaderButton navigation={navigation} {...item} />;
    } else if (item?.type === 'title') {
      return (
        <Text
          style={[styles.headerText, { color: item?.color }]}
          numberOfLines={1}
          ellipsizeMode='clip'
        >
          {currentScreen?.title}
        </Text>
      );
    } else if (item?.type === 'text') {
      return (
        <Text
          style={[styles.headerText, { color: item?.color }]}
          numberOfLines={1}
          ellipsizeMode='clip'
        >
          {item?.title}
        </Text>
      );
    }
  };

  const CustomHeader = ({ navigation, headerParts }) => {
    let items = [];
    if (Array.isArray(currentScreen?.items) && currentScreen.items.length > 0) {
      items = currentScreen?.items;
    }
    if (
      items.length === 0 &&
      Array.isArray(headerParts) &&
      headerParts.length > 0
    ) {
      items = headerParts;
    }
    let leftItems = items.filter((item) => item.position === 'left');
    let centerItems = items.filter((item) => item.position === 'center');
    let rightItems = items.filter((item) => item.position === 'right');

    return (
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: currentScreen?.backgroundColor },
        ]}
      >
        <View style={styles.headerLeftItems}>
          {leftItems.map((item, index) => (
            <CustomHeaderItem key={index} item={item} navigation={navigation} />
          ))}
        </View>
        <View style={styles.headerCenterItems}>
          {centerItems.map((item, index) => (
            <CustomHeaderItem key={index} item={item} navigation={navigation} />
          ))}
        </View>
        <View style={styles.headerRightItems}>
          {rightItems.map((item, index) => (
            <CustomHeaderItem key={index} item={item} navigation={navigation} />
          ))}
        </View>
      </View>
    );
  };

  const CustomDrawerItem = (props) => {
    const {
      state,
      index,
      navigation,
      theme,
      name,
      label,
      onSelect,
      labelBackground,
    } = props;
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
            backgroundColor: labelBackground
              ? labelBackground
              : theme.style.drawer.listItem[
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

    // console.log('CustomDrawerContent rows', rows);

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
                  label={item?.drawer?.label || `Option-${index + 1}`}
                  labelBackground={item?.drawer?.style?.backgroundColor}
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
        // 1. Вариант: customDrawerContent был передан так {ИмяКомпоненты}
        if (customDrawerContent) {
          const CustomDrawer = customDrawerContent;
          return <CustomDrawer {...props} theme={theme} rows={screens} />;
        }

        // 2. Вариант: children были переданы так <ИмяКомпоненты />
        if (children) {
          return React.cloneElement(children, {
            ...props,
            theme,
            rows: screens,
          }); // Передаем props в дочерний элемент
        }

        //3. вариант если без children
        return <DeafultDrawerContent {...props} theme={theme} rows={screens} />;
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
                    backgroundColor: screen?.header?.style?.backgroundColor,
                    items: screen?.header?.items,
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60, // Высота заголовка
  },
  headerText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  headerLeftItems: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenterItems: {
    flex: 1.5,
    alignItems: 'center',
  },
  headerRightItems: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightButton: {
    borderTopLeftRadius: 16, // Закругленный верхний левый угол
    borderBottomLeftRadius: 16, // Закругленный нижний левый угол
  },
  leftButton: {
    borderTopRightRadius: 16, // Закругленный верхний левый угол
    borderBottomRightRadius: 16, // Закругленный нижний левый угол
  },
  contentContainerStyle: {
    flexGrow: 1, // Это помогает контейнеру занимать всю доступную ширину
    paddingHorizontal: 0, // Убираем отступы по горизонтали
    paddingLeft: 0, // Убираем отступ слева
    paddingTop: 0, // Убираем отступ сверху
    paddingStart: 0, // Убираем стартовый отступ (слева)
  },
  drawerContent: {
    flex: 1,
    padding: 0, // Убедитесь, что здесь нет padding
    margin: 0, // Убедитесь, что здесь нет margin
    paddingHorizontal: 0, // Убираем отступы
    padding: 0, // Убираем все отступы
    marginHorizontal: 0,
  },
  drawerContentContainer: {
    paddingVertical: 0, // Убираем вертикальные отступы
    margin: 0, // Убедитесь, что здесь нет ненужных отступов
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
