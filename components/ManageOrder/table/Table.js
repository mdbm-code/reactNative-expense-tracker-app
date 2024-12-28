import { FlatList, StyleSheet, Text, View } from 'react-native';
import TableHead from './TableHead';
import TableRow from './OrderRow';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import OrderRow from './OrderRow';

const Table = ({
  rows,
  keyName,
  style,
  header,
  fallbackText,
  onPress,
  onUpdateValue,
}) => {
  const [activeRowId, setActiveRowId] = useState(false);
  const [showSliderId, setShowSliderId] = useState(null);

  const pressPriceHandler = (rowId) => {
    console.log(rowId);

    setShowSliderId((prevActiveRow) =>
      prevActiveRow === rowId ? null : rowId
    );
  };

  function updateValueHandler(payload) {
    console.log('Table.updateValueHandler() : ', payload);
  }

  function hideSliderHandler() {
    setShowSliderId(null);
  }

  function renderItem({ item }) {
    return (
      <OrderRow
        rowData={{ ...item }}
        onPress={onPress}
        onUpdate={updateValueHandler}
        onPressPrice={() => pressPriceHandler(item.id)}
        isShowSlider={showSliderId === item.id}
        hideSlider={hideSliderHandler}
        onPressRow={() => setActiveRowId(item.id)}
        isActiveRow={activeRowId === item.id}
        deactiveRow={() => setActiveRowId(null)}
      />
    );
  }

  let content = <View>{fallbackText}</View>;
  if (Array.isArray(rows) && rows.length > 0) {
    content = (
      <KeyboardAwareFlatList
        data={rows}
        keyExtractor={(item) => item[keyName]}
        renderItem={renderItem}
        extraHeight={100} // Дополнительное пространство для клавиатуры
      />
    );
  }

  return (
    <View style={[styles.rootContainer, style]}>
      <TableHead {...header} />
      {content}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
