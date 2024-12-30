import {
  FlatList,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
} from 'react-native';
import ClientItem from './ClientItem';
// import ExpenseItem from './ExpenseItem';
// import ClientItem from './ClientItem';
// import DraggableFlatList, {
//   ScaleDecorator,
// } from 'react-native-draggable-flatlist';
// import { useState } from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

function renderExpenseItem({ item, drag, isActive }) {
  return (
    // <ScaleDecorator>
    // <TouchableOpacity
    //   onLongPress={drag}
    //   disabled={isActive}
    //   style={[
    //     styles.rowItem,
    //     { backgroundColor: isActive ? 'red' : item.backgroundColor },
    //   ]}
    // >
    <ClientItem {...item} />
    // </TouchableOpacity>
    // </ScaleDecorator>
  );
}

const ClientsList = ({ rows }) => {
  // const [data, setData] = useState(rows);
  return (
    <View style={styles.container}>
      {/* <GestureHandlerRootView> */}
      <FlatList
        // onDragEnd={({ data }) => setData(data)}
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={renderExpenseItem}
      />
      {/* </GestureHandlerRootView> */}
    </View>
  );
};

export default ClientsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 36,
  },
});
