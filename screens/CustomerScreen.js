import React, { useMemo, useLayoutEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FallbackText from '../components/FallbackText';
import { Ionicons } from '@expo/vector-icons';
// import Debt from '../components/ManageOrder/Debt';
import { useDispatch, useSelector } from 'react-redux';
import CustomerDocOrder from '../components/CustomerScreen/CustomerDocOrder';
import { setSelectedDocTab } from '../store/redux/slices/selectedsSlice';
// import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/ui/IconButton';
import CustomerDocDebt from '../components/CustomerScreen/CustomerDocDebt';
import { GlobalStyles } from '../constans/styles';
import { getThemePalette } from '../store/redux/selectors/theme';

const routes = [
  { key: 'debt', title: 'Сверка' },
  { key: 'order', title: 'Заявка' },
  { key: 'spec', title: 'Спец' },
  { key: 'return', title: 'Возврат' },
  { key: 'params', title: 'params' },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: 'blue' }}
    labelStyle={{
      color: 'white',
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
  // const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  const theme = useSelector(getThemePalette);

  const onIndexChangeHandler = (ind) => {
    dispatch(setSelectedDocTab(ind));
  };

  const TaskRoute = () => (
    <FallbackText>Спецзадачи, акции</FallbackText>
  );

  const OrderRoute = () => <CustomerDocOrder />;
  const DebtRoute = () => <CustomerDocDebt />;

  const ReturnRoute = () => (
    <FallbackText>Возврат товара</FallbackText>
  );
  const ParamsRoute = () => (
    <FallbackText>Профиль</FallbackText>
  );

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
    <View style={styles.rootContainer}>
      <TabView
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={(index) => {
          setIndex(index);
          // setTabIndex(routes[index]);
          onIndexChangeHandler(index);
        }}
        initialLayout={{ width: layout.width }}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === 'home') {
            preventDefault();

            // Do something else
          }
        }}
        options={{
          params: {
            labelText: '',
            icon: ({ route, focused, color, size }) => (
              <Ionicons name={'apps-outline'} size={size} color={color} />
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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
