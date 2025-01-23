import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { setSelectedScreen } from '../store/redux/slices/selectedsSlice';
const Drawer = createDrawerNavigator();
// Функция для разбития длинных слов

const breakLongWord = (word) => {
  // const maxLength = 18; // Максимальная длина части слова
  // return word.match(new RegExp(`.{1,${maxLength}}`, 'g')).join('\n');
};

const ScreenWithDrawer = ({
  footerContent,
  headerContent,
  initialRouteName,
  drawerTitle,
  screens,
  theme,
  onChangeScreen,
  screenOptions,
  headerParts,
  customDrawerContent,
  children,
}) => {
  const [headerData, setHeaderData] = useState({
    left: '',
    center: '',
    right: '',
  });
  const [currentScreen, setCurrentScreen] = useState({
    name: '',
    title: '',
    backgroundColor: '',
  });

  const dispath = useDispatch();

  function changeScreenHandler(value) {
    dispath(
      setSelectedScreen({
        name: value?.name,
        title: value?.title,
        backgroundColor: value?.backgroundColor,
      })
    );
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

  const CustomHeaderIconButton = ({
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
        style={[styles[`${position}Icon`], style]}
        onPress={() => {
          if (openDrawer) {
            navigation.openDrawer();
          } else if (typeof onPress === 'function') {
            onPress();
          }
        }}
      >
        <Ionicons name={iconName} size={size || 24} color={color} />
      </TouchableOpacity>
    );
  };

  const CustomHeaderItem = ({ item, navigation }) => {
    if (item?.type === 'button') {
      return <CustomHeaderButton navigation={navigation} {...item} />;
    } else if (item?.type === 'icon') {
      return <CustomHeaderIconButton navigation={navigation} {...item} />;
    } else if (item?.type === 'title') {
      if (item?.subtitle) {
        return (
          <View style={{ flex: 1 }}>
            {/* Верхний текст, прижатый к низу */}
            {/* <View style={{ backgroundColor: 'red', }}> */}
            <Text
              style={[
                // styles.headerText,
                // styles.headerTitle,
                { color: item?.color, alignSelf: 'center', fontSize: 16 },
              ]}
            >
              {drawerTitle ? drawerTitle : currentScreen?.title}
            </Text>
            {/* </View> */}

            {/* Нижний текст, прижатый к верху */}
            {/* <View style={{ backgroundColor: 'green' }}> */}
            <Text
              style={[
                // styles.headerText,
                // styles.headerTitle,
                { color: item?.color, alignSelf: 'center' },
              ]}
            >
              {item?.subtitle}
            </Text>
            {/* </View> */}
          </View>
        );
      } else {
        return (
          <Text
            style={[
              styles.headerText,
              styles.headerTitle,
              { color: item?.color },
            ]}
          >
            {drawerTitle ? drawerTitle : currentScreen?.title}
          </Text>
        );
      }
    } else if (item?.type === 'text') {
      let title = headerData[position] || drawerTitle || currentScreen?.title;
      return (
        <Text
          style={[
            styles.headerText,
            styles.headerTitle,
            { color: item?.color },
          ]}
        // numberOfLines={1}
        // ellipsizeMode='clip'
        >
          {/* {breakLongWord(drawerTitle ? drawerTitle : currentScreen?.title)} */}
          {breakLongWord(title)}
        </Text>
      );
    }
  };

  const CustomHeader = ({ navigation, headerParts, headerStyle }) => {
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
        {headerContent ? (
          headerContent
        ) : (
          <>
            <View
              style={[
                styles.headerLeftItems,
                headerStyle?.left?.flex &&
                styles[`flex${headerStyle?.left?.flex}`],
              ]}
            >
              {leftItems.map((item, index) => (
                <CustomHeaderItem
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </View>
            <View
              style={[
                styles.headerCenterItems,
                headerStyle?.center?.flex &&
                styles[`flex${headerStyle?.center?.flex}`],
              ]}
            >
              {centerItems.map((item, index) => (
                <CustomHeaderItem
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </View>
            <View
              style={[
                styles.headerRightItems,
                headerStyle?.right?.flex &&
                styles[`flex${headerStyle?.right?.flex}`],
              ]}
            >
              {rightItems.map((item, index) => (
                <CustomHeaderItem
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </View>
          </>
        )}
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
      labelSelectedColor,
    } = props;

    let labelStyle = [styles.menuItemText];
    if (labelSelectedColor && index === state.index) {
      labelStyle.push({ color: labelSelectedColor });
    } else {
      labelStyle.push({
        color:
          theme.style.drawer.listItem[
          index === state.index ? 'titleActive' : 'title'
          ],
      });
    }
    // console.log('labelStyle', label, labelStyle);

    styles.menuItemText;
    return (
      <DrawerItem
        label={label}
        labelStyle={labelStyle}
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
                  labelSelectedColor={item?.drawer?.style?.labelSelectedColor}
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

  // console.log('initialRouteName', initialRouteName);

  return (
    <>
      <Drawer.Navigator
        initialRouteName={
          initialRouteName
            ? initialRouteName
            : currentScreen?.name
              ? currentScreen.name
              : null
        } // Устанавливаем начальный экран
        screenOptions={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              theme={theme}
              headerParts={headerParts}
              headerStyle={screenOptions?.headerStyle}
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
            const CustomDrawerContent = customDrawerContent;
            return (
              <CustomDrawerContent
                {...props}
                selectedStyle={screenOptions?.drawerStyle?.label?.selected}
                theme={theme}
                rows={screens}
                closeDrawer={props?.navigation?.closeDrawer}
              />
            );
          }

          // 2. Вариант: children были переданы так <ИмяКомпоненты />
          if (children) {
            return React.cloneElement(children, {
              ...props,
              closeDrawer: props?.navigation?.closeDrawer,
              selectedStyle: screenOptions?.drawerStyle?.label?.selected,
              theme,
              rows: screens,
            }); // Передаем props в дочерний элемент
          }

          //3. вариант если без children
          return (
            <DeafultDrawerContent
              selectedStyle={screenOptions?.drawerStyle?.label?.selected}
              {...props}
              theme={theme}
              rows={screens}
            />
          );
        }}
      >
        {Array.isArray(screens) &&
          screens.map((screen, index) => {
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
              ></Drawer.Screen>
            );
          })}
      </Drawer.Navigator>
      {footerContent && footerContent}
    </>
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
  headerTitle: {
    width: '100%', // Полная ширина контейнера
    // Переход на новую строку
    whiteSpace: 'pre-wrap', // не используется в React Native, оставлено для понимания
    overflow: 'hidden',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  headerLeftItems: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  headerCenterItems: {
    flex: 1.5,
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
  headerRightItems: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  rightButton: {
    borderTopLeftRadius: 16, // Закругленный верхний левый угол
    borderBottomLeftRadius: 16, // Закругленный нижний левый угол
  },
  leftButton: {
    borderTopRightRadius: 16, // Закругленный верхний левый угол
    borderBottomRightRadius: 16, // Закругленный нижний левый угол
  },
  rightIcon: {
    margin: 8,
  },
  leftIcon: {
    margin: 8,
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
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 7 },
  flex8: { flex: 8 },
  flex9: { flex: 9 },
  flex10: { flex: 10 },
  flex11: { flex: 11 },
  flex12: { flex: 12 },
});
