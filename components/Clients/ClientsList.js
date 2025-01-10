import { FlatList, StyleSheet, View } from 'react-native';
import ClientItem from './ClientItem';

function renderExpenseItem(itemData, theme) {
  return <ClientItem item={itemData.item} theme={theme} />;
}

const ClientsList = ({ rows, theme }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={(itemData) => renderExpenseItem(itemData, theme)}
      />
    </View>
  );
};

export default ClientsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
});
