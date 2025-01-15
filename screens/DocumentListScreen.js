import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchOrders } from '../util/http';
import GridTable from '../components/GridTable';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../store/redux/selectors/theme';
import { selectDocuments } from '../store/redux/selectors/orders';
import {
  bulkInsertUpdateDocuments,
  // insertUpdateDocument,
} from '../store/redux/slices/documentsSlice';
import { Ionicons } from '@expo/vector-icons';

const DocumentListScreen = ({ navigation }) => {
  const { orderList, setOrderList } = useState([]);
  const dispatch = useDispatch();
  const theme = useSelector(getThemePalette);
  const documents = useSelector(selectDocuments);
  const [refreshing, setRefreshing] = useState(false);

  async function getOrders() {
    const data = await fetchOrders();
    // console.log('data from server', data);
    dispatch(bulkInsertUpdateDocuments(data));
    // setOrderList(data);
  }

  useEffect(() => {
    if (refreshing) {
      // console.log('refreshing');
      getOrders();
    }
  }, [refreshing]);

  // useEffect(() => {
  //   getOrders();
  // }, []);

  const columns = [
    {
      id: 'id',
      hidden: true,
    },
    {
      id: 'customerName',
      title: 'Покупатель',
      flex: 8,
      titleStyle: { textAlign: 'left', fontSize: 12 },
      prefix: {
        cond: {
          key: 'id',
          ifnull: (
            <Ionicons name={'bookmark'} size={25} color={theme.warning.light} />
          ),
          ifnot: (
            <Ionicons name={'bookmark'} size={25} color={theme.success.light} />
          ),
        },
      },
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
    // console.log(data);
    navigation.navigate('DocumentScreen', { ...data });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Имитация обновления данных
    setTimeout(() => {
      // setData(['New Item 1', 'New Item 2', 'New Item 3']);
      setRefreshing(false);
    }, 2000);
  }, []);

  // console.log('documents', documents);

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
