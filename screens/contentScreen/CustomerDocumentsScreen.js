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
import Pager from '../../components/ui/Pager/Pager';

const CustomerDocumentsScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selector = getSelector_customerOrderList(page);
  const { rows, pages, perPage, pages2 } = useSelector(selector);
  const selectedOrder = useSelector(state => state.orders?.selectedOrder);

  console.log('pages', pages);
  console.log('perPage', perPage);
  // console.log('perPage', perPage);


  const theme = useSelector(getTheme);
  if (typeof rows === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {rows}
      </FallbackText>
    );

  function onPageChangeHandler(page) {
    setPage(page);
  }

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
      title: `№ ${row.code} от ${row?.formattedDate}`,
      // totalAmount: row.totalAmount,
      // totalReturn: row.totalReturn === 0 ? '' : row.totalReturn,
      status: getIcon(row.status),
      sumContent: <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', color: theme.style.text.main }}>{row.totalAmount}</Text>
        {row.totalReturn === 0
          ? null
          : <Text style={{ textAlign: 'right', color: theme.style.error.dark }}>-{row.totalReturn}</Text>}
      </View >
    };
  });

  // console.log('documents', documents);
  // console.log('selectedOrder', selectedOrder);

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
        padding: 5,
        backgroundColor: theme.style.drawer.header.bg,
        height: 50
      },
      iffalse: {
        borderLeftWidth: 1,
        padding: 5,
        backgroundColor: theme.style.customerList.bg2,
        height: 50
      },
    },
  };

  const redRowStyleIcon = {
    cond: {
      key: 'code',
      inc: [selectedOrder?.code],
      iftrue: {
        // borderLeftWidth: 1,
        padding: 5,
        backgroundColor: theme.style.drawer.header.bg,
      },
      iffalse: {
        // borderLeftWidth: 1,
        padding: 5,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  };

  const columns = [
    {
      id: 'status',
      as: 'icon',
      color: theme.style.text.main,
      title: '',
      flex: 1,
      titleStyle: { color: theme.style.text.main },
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
      titleStyle: { textAlign: 'left', color: theme.style.text.main },
      viewStyle: redRowStyle,
    },

    {
      id: 'sumContent',
      title: 'Суммы',
      flex: 4,
      as: 'component',
      titleStyle: { textAlign: 'right', color: theme.style.text.main },
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
      {Number(pages) > 1 &&
        <View style={[styles.paginationContainer, { backgroundColor: theme.style.bg }]}>
          <Text style={[styles.text, { color: theme.style.customerList.title }]}>Страница: </Text>
          <Pager
            minimumValue={1}
            maximumValue={Number(pages)}
            step={1}
            value={Number(page)}
            onValueChange={(value) => onPageChangeHandler(value)}
            buttonViewStyle={[styles.pagerButtonViewStyle, { borderColor: theme.style.text.main }]}
            titleStyle={[styles.pagerTitleStyle, , { color: theme.style.text.main }]}
            titleStyleSelected={[styles.pagerTitleStyleSelected, { borderColor: theme.style.success.main }]}
          />
        </View>
      }
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
    paddingHorizontal: 6
  },
  paginationContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pagerContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,

  },
  pagerButtonViewStyle: {
    width: 50,
    height: 50,
    padding: 5
  },
  pagerTitleStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
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
