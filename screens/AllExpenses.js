import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ClientsContext } from '../store/context/client-context';

const AllExpenses = () => {
  const { orders } = useContext(ClientsContext);

  return (
    <View style={styles.root}>
      <ExpensesOutput
        expensesPeriod='За весь период'
        orders={orders}
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
