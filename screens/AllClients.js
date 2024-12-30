import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
// import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
// import ClientsOutput from '../components/ExpensesOutput/ClientsOutput';
// import { OrdersContext } from '../store/context/order-context';
// import { ClientsContext } from '../store/context/client-context';
import ClientsOutput from '../components/Clients/ClientsOutput';
import { useSelector } from 'react-redux';
import { selectCustomers } from '../store/redux/selectors/customers';

const AllClients = () => {
  // const clientsCtx = useContext(ClientsContext);
  // console.log(clientsCtx);
  const { catalog } = useSelector((state) => state.customers);
  // console.log('Array.isArray(data)', Array.isArray(data));
  // console.log('Array.isArray(data.customers)', Array.isArray(catalog));

  return (
    <View style={styles.root}>
      <ClientsOutput
        expensesPeriod='За весь период'
        rows={catalog}
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
