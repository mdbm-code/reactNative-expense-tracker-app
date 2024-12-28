import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
// import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
// import ClientsOutput from '../components/ExpensesOutput/ClientsOutput';
// import { OrdersContext } from '../store/context/order-context';
import { ClientsContext } from '../store/context/client-context';
import ClientsOutput from '../components/Clients/ClientsOutput';

const AllClients = () => {
  const clientsCtx = useContext(ClientsContext);
  // console.log(clientsCtx);

  return (
    <View style={styles.root}>
      <ClientsOutput
        expensesPeriod='За весь период'
        rows={clientsCtx.data}
        fallbackText={'Вы не сделали ни одной заявки'}
      />
    </View>
  );
};

export default AllClients;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
