import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderForm from './OrderForm';
import Table from './table/Table';
import OrderTable from './OrderTable';

const routes = [
  { key: 'first', title: 'Свойства' },
  { key: 'second', title: 'Товары' },
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
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const FirstRoute = () => (
    <OrderForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitButtonLabel={submitButtonLabel}
      defaultValues={defaultValues}
    />
  );

  const SecondRoute = () => (
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

  //useMemo`**: Этот хук используется для мемоизации значения,
  // чтобы избежать его пересоздания при каждой перерисовке компонента,
  // если зависимости не изменились. В данном случае, `renderScene`
  // будет создаваться только один раз, так как зависимости пусты (`[]`),
  // что означает, что он не будет пересоздаваться, если нет изменений в зависимостях.
  const renderScene = useMemo(
    () =>
      SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      }),
    []
  );

  return (
    <View style={styles.rootContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
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
