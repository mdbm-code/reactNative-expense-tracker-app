import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderForm from './OrderForm';
import Table from './table/Table';
import OrderTable from './OrderTable';
import DebtTable from './DebtTable';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../ui/IconButton';
import { ClientsContext } from '../../store/context/client-context';

const routes = [
  { key: 'debt', title: 'Сверка' },
  { key: 'order', title: 'Заявка' },
  { key: 'spec', title: 'Спец' },
  { key: 'promo', title: 'Возврат' },
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

const Order = ({
  onUpdateValue,
  onPress,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
  rows,
  client,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const { setTabIndex } = useContext(ClientsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name='add-circle-outline'
          color={tintColor}
          size={24}
          onPress={() =>
            navigation.navigate('ManageOrder', { clientId: client?.id })
          }
        />
      ),
    });
  }, []);

  const FirstRoute = () => (
    <OrderForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitButtonLabel={submitButtonLabel}
      defaultValues={defaultValues}
    />
  );

  const OrderRoute = () => (
    <OrderTable
      header={{
        name: 'Наименование товара',
        unit: 'ед.',
        price: 'Цена',
        qty: 'Кол',
      }}
      rows={rows}
      keyName='id'
      onPress={onPress}
      onUpdateValue={onUpdateValue}
    />
  );

  const DebtRoute = () => (
    <DebtTable
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitButtonLabel={submitButtonLabel}
      data={client['balance']}
    />
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
        spec: FirstRoute,
        promo: FirstRoute,
      }),
    []
  );

  return (
    <View style={styles.rootContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={(index) => {
          setIndex(index);
          setTabIndex(routes[index]);
        }}
        initialLayout={{ width: layout.width }}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === 'home') {
            preventDefault();

            // Do something else
          }
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
