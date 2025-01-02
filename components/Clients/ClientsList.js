import { FlatList, StyleSheet, View } from 'react-native';
import ClientItem from './ClientItem';

function renderExpenseItem({ item }) {
  return <ClientItem {...item} />;
}

const ClientsList = ({ rows }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={renderExpenseItem}
      />
    </View>
  );
};

export default ClientsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 36,
  },
});
