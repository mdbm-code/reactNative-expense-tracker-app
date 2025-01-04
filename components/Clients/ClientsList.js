import { FlatList, StyleSheet, View } from 'react-native';
import ClientItem from './ClientItem';

function renderExpenseItem(itemData, palette) {
  return <ClientItem item={itemData.item} palette={palette} />;
}

const ClientsList = ({ rows, palette }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={(itemData) => renderExpenseItem(itemData, palette)}
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
