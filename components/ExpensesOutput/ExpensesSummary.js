import { StyleSheet, Text, View } from 'react-native';

const ExpensesSummary = ({ periodName, expenses }) => {
  const expensesSum = expenses.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>{expensesSum.toFixed(2)} руб</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
