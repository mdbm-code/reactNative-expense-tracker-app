import { FlatList, StyleSheet, Text, View } from 'react-native';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

const Table = ({
  rows,
  keyName,
  style,
  header,
  fallbackText,
  onPress,
  onUpdateValue,
}) => {
  const [showedSliderId, setShowSliderId] = useState(null);
  const handleRowPress = (rowId) => {
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
      <TableRow
        rowData={{ ...item }}
        onPress={onPress}
        onUpdate={updateValueHandler}
        onActive={() => handleRowPress(item.id)}
        isActiveSlider={showedSliderId === item.id}
        hideSlider={hideSliderHandler}
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
