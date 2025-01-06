import React, { useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';

//store
import { setSelectedDocTab } from '../store/redux/slices/selectedsSlice';
import { getThemePalette } from '../store/redux/selectors/theme';

//components
import FallbackText from '../components/FallbackText';
import IconButton from '../components/ui/IconButton';
import CustomerOrderScreen from './CustomerScreen/CustomerOrderScreen';
import CustomerDebtScreen from './CustomerScreen/CustomerDebtScreen';
import CustomerProfileScreen from './CustomerScreen/CustomerProfileScreen';
import CustomerReturnScreen from './CustomerScreen/CustomerReturnScreen';

const routes = [
  { key: 'debt', title: 'Сверка' },
  { key: 'order', title: 'Заявка' },
  { key: 'spec', title: 'Спец' },
  { key: 'return', title: 'Возврат' },
  { key: 'params', title: 'params' },
];

const renderTabBar = (props, theme) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: theme.secondary.light, color: 'blue' }}
    labelStyle={{
      color: 'red',
      textAlign: 'top', // Горизонтальное центрирование текста
      fontSize: 12, // Убедитесь, что размер шрифта подходит
    }}
    tabStyle={{
      padding: 0,
      height: 30,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1, // Убедитесь, что вкладка занимает все доступное пространство
      fontSize: 12,
    }}
  />
);

const CustomerScreen = ({ route, navigation }) => {
  const layout = useWindowDimensions();

  const dispatch = useDispatch();
  const { selectedCustomer, selectedDocTab } = useSelector(
    (state) => state.selecteds
  );

  const [index, setIndex] = React.useState(1);
  const theme = useSelector(getThemePalette);

  const TaskRoute = () => <FallbackText>Спецзадачи, акции</FallbackText>;
  const OrderRoute = () => <CustomerOrderScreen />;
  const DebtRoute = () => <CustomerDebtScreen />;
  const ReturnRoute = () => <CustomerReturnScreen />;
  const ParamsRoute = () => <CustomerProfileScreen />;

  //useMemo`**: Этот хук используется для мемоизации значения,
  // чтобы избежать его пересоздания при каждой перерисовке компонента,
  // если зависимости не изменились. В данном случае, `renderScene`
  // будет создаваться только один раз, так как зависимости пусты (`[]`),
  // что означает, что он не будет пересоздаваться, если нет изменений в зависимостях.
  const renderScene = useMemo(
    () =>
      SceneMap({
        debt: DebtRoute,
        order: OrderRoute,
        spec: TaskRoute,
        return: ReturnRoute,
        params: ParamsRoute,
      }),
    []
  );

  useLayoutEffect(() => {
    // console.log('index', index);

    const currentRoute = routes[index].key;

    if (currentRoute === 'order' || currentRoute === 'return') {
      navigation.setOptions({
        title: selectedCustomer?.name,
        headerStyle: {
          backgroundColor: theme.primary.main, // цвет фона
        },
        headerTintColor: theme.primary.contrastText,
        headerRight: ({ tintColor }) => (
          <IconButton
            name='add-circle-outline'
            color={tintColor}
            size={24}
            onPress={() => navigation.navigate('ManageProductsScreen')}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: null,
        headerStyle: {
          backgroundColor: theme.primary.main, // цвет фона
        },
        headerTintColor: theme.primary.contrastText,
      });
    }
  }, [navigation, index]);

  return (
    <View
      style={[styles.rootContainer, { backgroundColor: theme.primary.dark }]}
    >
      <TabView
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => renderTabBar(props, theme)}
        onIndexChange={(index) => {
          setIndex(index);
          // Do something else
        }}
        initialLayout={{ width: layout.width }}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === 'home') {
            preventDefault();
            // Do something else
          }
        }}
        options={{
          debt: {
            label: ({ route, labelText, focused, color }) => (
              <Text style={{ color: theme.bg.active }}>
                {labelText ?? route.name}
              </Text>
            ),
          },
          order: {
            label: ({ route, labelText, focused, color }) => (
              <Text style={{ color: theme.bg.active }}>
                {labelText ?? route.name}
              </Text>
            ),
          },
          spec: {
            label: ({ route, labelText, focused, color }) => (
              <Text style={{ color: theme.bg.active }}>
                {labelText ?? route.name}
              </Text>
            ),
          },
          return: {
            label: ({ route, labelText, focused, color }) => (
              <Text style={{ color: theme.bg.active }}>
                {labelText ?? route.name}
              </Text>
            ),
          },
          params: {
            labelText: 'ss',

            icon: ({ route, focused, color, size }) => (
              <Ionicons
                name={'information-circle-outline'}
                size={size}
                color={color}
              />
            ),
            // badge: ({ route }) => (
            //   <View
            //     style={{
            //       backgroundColor: 'red',
            //       width: 20,
            //       height: 20,
            //       borderRadius: 10,
            //     }}
            //   />
            // ),
          },
        }}
      />
    </View>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

});
