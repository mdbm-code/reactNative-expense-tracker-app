import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ orders }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 36,
  },
});
