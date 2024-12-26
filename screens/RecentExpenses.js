import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { OrdersContext } from '../store/context/order-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const ordersCtx = useContext(OrdersContext);

  const recentData = ordersCtx.data.filter((item) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return item.date > date7daysAgo && item.date <= today;
  });

  return (
    <View style={styles.root}>
      <ExpensesOutput
        expensesPeriod={'Сегодня'}
        orders={recentData}
        fallbackText={'Журнал заявок пуст'}
      />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
