import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { OrdersContext } from '../store/context/order-context';

const AllExpenses = () => {
  const ordersCtx = useContext(OrdersContext);

  return (
    <View style={styles.root}>
      <ExpensesOutput
        expensesPeriod='За весь период'
        orders={ordersCtx.data}
        fallbackText={'Вы не сделали ни одной заявки'}
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
