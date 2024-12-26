import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constans/styles';

function ExpensesOutput({ orders, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (orders.length > 0) {
    content = <ExpensesList orders={orders} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} orders={orders} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

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
