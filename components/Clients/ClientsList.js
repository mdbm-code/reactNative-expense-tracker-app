import { FlatList, StyleSheet, View } from 'react-native';
import ClientItem from './ClientItem';
import ClientItemManage from './ClientItemManage';
import { useSelector } from 'react-redux';

const ClientsList = ({ rows, theme, editedId }) => {
  const { selectedRoute, selectedManager, searchString } = useSelector(state => state.selecteds);

  function renderItem({ item, index }) {
    if (editedId === item?.code && !searchString && selectedRoute && selectedManager) {
      return <ClientItemManage
        theme={theme}
        itemId={item?.code}
        selectedRoute={selectedRoute}
        selectedManager={selectedManager}>
        <ClientItem item={item} theme={theme} editedId={editedId} />
      </ClientItemManage>
    } else {
      return <ClientItem item={item} theme={theme} />
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ClientsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  itemContainer: {
  },
});
