import { FlatList, StyleSheet, Text, View } from 'react-native';
import TableHead from './TableHead';
import TableRow from './TableRow';
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
    // console.log(rowId);

    // setShowSliderId((prevActiveRow) =>
    //   prevActiveRow === rowId ? null : rowId
    // );
  };

  function updateValueHandler(payload) {
    // console.log('Table.updateValueHandler() : ', payload);
  }

  function hideSliderHandler() {
    // setShowSliderId(null);
  }

  function onPressHandler(columnName, code, value) {
    console.log('columnName', columnName);
    console.log('code', code);
    console.log('value', value);
    setActiveRowId(code);
  }

  function renderItem({ item }) {
    return (<TableRow
      rowData={{ ...item }}
      selected={activeRowId === item.code}
      onPress={onPressHandler}
    />
      // <OrderRow
      //   rowData={{ ...item }}
      //   onPress={onPress}
      //   onUpdate={updateValueHandler}
      //   onPressPrice={() => pressPriceHandler(item.id)}
      //   isShowSlider={showSliderId === item.id}
      //   hideSlider={hideSliderHandler}
      //   onPressRow={() => setActiveRowId(item.id)}
      //   isActiveRow={activeRowId === item.id}
      //   deactiveRow={() => setActiveRowId(null)}
      // />
    );
  }

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
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
    <View style={[styles.rootContainer]}>
      {/* <Text style={styles.infoText}>Component Table</Text> */}
      <TableHead {...header} />
      {content}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'white',
  },
  rootContainer: {
    flex: 1,
  },
});
