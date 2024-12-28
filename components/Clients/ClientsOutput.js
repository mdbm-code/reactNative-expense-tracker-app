import { Pressable, StyleSheet, Text, View } from 'react-native';
// import ExpensesSummary from './ExpensesSummary';
// import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constans/styles';
// import ClientsList from '../ExpensesOutput/ClientsList';
import ClientsSummary from './ClientsSummary';
import ClientsList from './ClientsList';
import ClientsRouter from './ClientsRouter';
import { useState } from 'react';

function ClientsOutput({ rows, expensesPeriod, fallbackText }) {
  const [selectedRoute, setSelectedRoute] = useState('M2');

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (rows.length > 0) {
    let clients = [];
    if (selectedRoute) {
      clients = rows.filter((item) => item.routes.includes(selectedRoute));
    } else {
      clients = rows;
    }
    content = <ClientsList rows={clients} />;
  }

  function selectRouteHandler(value) {
    setSelectedRoute(value);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowAllRoutes(!showAllRoutes)}>
        {/* <ClientsSummary periodName={expensesPeriod} rows={rows} /> */}
        <ClientsRouter
          value={selectedRoute}
          onSelect={selectRouteHandler}
          isMultiple={false}
        />
      </Pressable>
      {content}
    </View>
  );
}

export default ClientsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 32,
  },
});
