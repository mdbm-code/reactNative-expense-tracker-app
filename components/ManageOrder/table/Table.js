import { StyleSheet, Text, View } from 'react-native';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
// import OrderRow from './OrderRow';
import { useDispatch, useSelector } from 'react-redux';
import { findAndUpdateOrderRow } from '../../../store/redux/slices/currentOrdersSlice';
import { GlobalStyles } from '../../../constans/styles';

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
  const customerCode = useSelector(state => state.selecteds?.selectedCustomer?.code);
  const dispatch = useDispatch();

  const pressPriceHandler = (rowId) => {
    const dispatch = useDispatch();
    // console.log(rowId);

    // setShowSliderId((prevActiveRow) =>
    //   prevActiveRow === rowId ? null : rowId
    // );
  };

  function changeValueHandler(returnParams) {
    console.log(returnParams);

    // console.log('Table.changeValueHandler() : ', returnParams);
    //cell: keyName, value: selectedValue, old: previousValue
    if (returnParams.field === 'qty') {
      const payload = {
        customerCode: customerCode,
        productCode: returnParams.productCode,
        price: returnParams.price,
        qty: returnParams.newValue
      }
      dispatch(findAndUpdateOrderRow(payload));
    }

  }

  function hideSliderHandler() {
    // setShowSliderId(null);
  }

  function onPressHandler({ productCode }) {
    setActiveRowId(productCode);
  }

  function renderItem({ item }) {
    return (<TableRow
      rowData={{ ...item }}
      selected={activeRowId === item.code}
      onPress={onPressHandler}
      onChangeValue={changeValueHandler}
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

  const columns = [
    { title: 'Наименование', flex: 8, },
    { title: 'Цена', flex: 3, },
    { title: 'Колво', flex: 2, },
  ]

  return (
    <View style={[styles.rootContainer]}>
      <TableHead сolumns={columns} />
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
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
