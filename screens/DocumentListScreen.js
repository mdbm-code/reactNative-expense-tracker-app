import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchOrders } from '../util/http';
import GridTable from '../components/GridTable';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../store/redux/selectors/theme';
import { selectDocuments } from '../store/redux/selectors/orders';
import {
  bulkInsertUpdateDocuments,
  insertUpdateDocument,
} from '../store/redux/slices/documentsSlice';

const DocumentListScreen = () => {
  const { orderList, setOrderList } = useState([]);
  const dispatch = useDispatch();
  const theme = useSelector(getThemePalette);
  const documents = useSelector(selectDocuments);
  const [refreshing, setRefreshing] = useState(false);

  async function getOrders() {
    const data = await fetchOrders();
    console.log('data from server', data);
    dispatch(bulkInsertUpdateDocuments(data));
    // setOrderList(data);
  }

  useEffect(() => {
    if (refreshing) {
      getOrders();
    }
  }, [refreshing]);

  // useEffect(() => {
  //   getOrders();
  // }, []);

  const columns = [
    {
      id: 'customerName',
      title: 'Покупатель',
      flex: 8,
      titleStyle: { textAlign: 'left', fontSize: 12 },
    },
    {
      id: 'date',
      title: 'Дата',
      flex: 3,
      titleStyle: { textAlign: 'right', fontSize: 12 },
    },
    {
      id: 'total',
      title: 'Заявка',
      flex: 4,
      titleStyle: { textAlign: 'right', fontSize: 12 },
    },
    {
      id: 'totalReturn',
      title: 'Возврат',
      flex: 4,
      titleStyle: { textAlign: 'right', fontSize: 12 },
    },
  ];

  function onPressHandler(data) {
    console.log(data);

    // if (data?.from === 'head') {
    //   navigation.navigate('ManageProductsScreen');
    // }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Имитация обновления данных
    setTimeout(() => {
      // setData(['New Item 1', 'New Item 2', 'New Item 3']);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.bg.color }]}>
      <GridTable
        rows={documents}
        columns={columns}
        rowId='code'
        onPress={onPressHandler}
        onRefresh={onRefresh}
        refreshing={refreshing}
        // onChangeText={onChangeText}
        // onLongPress={onLongPress}
      />
    </View>
  );
};

export default DocumentListScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
