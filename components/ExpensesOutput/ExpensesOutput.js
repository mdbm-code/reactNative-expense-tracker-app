import { StyleSheet, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Ботинки мембранные трекинговые 43',
    amount: 5900.41,
    date: new Date('2024-12-25'),
  },
  {
    id: 'e2',
    description: 'Штаны походные',
    amount: 6870.99,
    date: new Date('2024-12-20'),
  },
  {
    id: 'e3',
    description: 'Рюкзак 70 л. AirMount',
    amount: 15879,
    date: new Date('2024-12-18'),
  },
  {
    id: 'e4',
    description: 'Футболка туристическая',
    amount: 590.99,
    date: new Date('2024-12-21'),
  },
  {
    id: 'e5',
    description: 'Палки походные',
    amount: 1999.01,
    date: new Date('2024-12-01'),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({});
