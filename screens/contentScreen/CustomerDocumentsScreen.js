import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import { getFormattedDate } from '../../util/date';
import Table from '../../components/GridTable/v2/Table';
import { getSelector_customerOrderList } from '../../store/redux/selectors/orders';
import { setSelectedOrderByCode } from '../../store/redux/slices/ordersSlice';

const CustomerDocumentsScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selector = getSelector_customerOrderList(page);
  const rows = useSelector(selector);
  const selectedOrder = useSelector(state => state.orders?.selectedOrder);

  const theme = useSelector(getTheme);
  if (typeof rows === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {rows}
      </FallbackText>
    );

  // console.log(rows);
  function getIcon(status) {
    switch (status) {
      case 'draft':
        return 'scan-outline';
      case 'failed':
        return 'cloud-offline-outline';
      case 'accepted':
        return 'cloud-done-outline';
      case 'delivered':
        return 'star-outline';
      case 'canceled':
        return 'trash-outline';
      default:
        return 'square-outline';
    }
  }

  const documents = rows.map((row) => {
    return {
      code: row.code,
      title: `Заявка № ${row.code} от ${row?.formattedDate}`,
      // totalAmount: row.totalAmount,
      // totalReturn: row.totalReturn === 0 ? '' : row.totalReturn,
      status: getIcon(row.status),
      sumContent: <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right' }}>{row.totalAmount}</Text>
        {row.totalReturn === 0 ? null : <Text style={{ textAlign: 'right', color: theme.style.error.dark }}>-{row.totalReturn}</Text>}
      </View >
    };
  });

  console.log('documents', documents);
  console.log('selectedOrder', selectedOrder);

  function pressOnItemHandler(returnParams) {
    //{ "column": "title", 
    // "item": 
    // { 
    // "code": 4, "status": "scan-outline", 
    // "sumContent": <View style={[Object]}><Text … /><Text … /></View>, 
    // "title": "Заявка № 4 от 19.01.2025" 
    // }, 
    // "rowIndex": 1 }
    if (returnParams?.item?.code) {
      dispatch(setSelectedOrderByCode(returnParams?.item?.code))
    }
  }


  const redRowStyle = {
    cond: {
      key: 'code',
      inc: [selectedOrder?.code],
      iftrue: {
        borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.drawer.header.bg,
      },
      iffalse: {
        borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  };

  const redRowStyleIcon = {
    cond: {
      key: 'code',
      inc: [selectedOrder?.code],
      iftrue: {
        // borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.drawer.header.bg,
      },
      iffalse: {
        // borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  };

  const columns = [
    {
      id: 'status',
      as: 'icon',
      title: '',
      flex: 1,
      // titleStyle: { textAlign: 'left', color: theme.style.customerList.title },
      viewStyle: redRowStyleIcon,
    },
    {
      id: 'code',
      hidden: true,
    },
    {
      id: 'title',
      title: 'Документ',
      flex: 9,
      titleStyle: { textAlign: 'left', color: theme.style.customerList.title },
      viewStyle: redRowStyle,
    },

    {
      id: 'sumContent',
      title: 'Суммы',
      flex: 4,
      as: 'component',
      titleStyle: { textAlign: 'right', color: theme.style.customerList.title },
      viewStyle: redRowStyle,
    },

    // {
    //   id: 'totalAmount',
    //   title: 'Сумма',
    //   flex: 3,
    //   titleStyle: { textAlign: 'right', color: theme.style.customerList.title },
    //   viewStyle: redRowStyle,
    // },
    // {
    //   id: 'totalReturn',
    //   title: 'Возврат',
    //   flex: 3,
    //   titleStyle: { textAlign: 'right', color: theme.style.customerList.title },
    //   viewStyle: redRowStyle,
    // },
  ];

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      <Table
        rowStyle={styles.rowStyle}
        columns={columns}
        rows={documents}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
      />
    </View>
  );
};

export default CustomerDocumentsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 36,
  },
  headerContainer: {
    // backgroundColor: GlobalStyles.colors.primary400,
  },
  text: {
    // color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
