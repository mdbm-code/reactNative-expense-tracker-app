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
import { getSelector_customerRouteList } from '../../store/redux/selectors/routes';

const CustomerRoutesScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selector = getSelector_customerRouteList();
  const rows = useSelector(selector);
  const theme = useSelector(getTheme);

  console.log('rows', rows);
  if (typeof rows === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {rows}
      </FallbackText>
    );

  function pressOnItemHandler(payload) {
    console.log(payload);

  }




  const redRowStyle = {
    // cond: {
    //   key: 'code',
    //   inc: [selectedOrder?.code],
    //   iftrue: {
    //     borderLeftWidth: 1,
    //     padding: 5,
    //     backgroundColor: theme.style.drawer.header.bg,
    //     height: 50
    //   },
    //   iffalse: {
    //     borderLeftWidth: 1,
    //     padding: 5,
    //     backgroundColor: theme.style.customerList.bg2,
    //     height: 50
    //   },
    // },
  };

  const redRowStyleIcon = {
    // cond: {
    //   key: 'code',
    //   inc: [selectedOrder?.code],
    //   iftrue: {
    //     // borderLeftWidth: 1,
    //     padding: 5,
    //     backgroundColor: theme.style.drawer.header.bg,
    //   },
    //   iffalse: {
    //     // borderLeftWidth: 1,
    //     padding: 5,
    //     backgroundColor: theme.style.customerList.bg2,
    //   },
    // },
  };

  const columns = [
    // {
    //   id: 'status',
    //   as: 'icon',
    //   color: theme.style.text.main,
    //   title: '',
    //   flex: 1,
    //   titleStyle: { color: theme.style.text.main },
    //   viewStyle: redRowStyleIcon,
    // },
    // {
    //   id: 'code',
    //   hidden: true,
    // },
    {
      id: 'title',
      title: 'Маршрут',
      flex: 9,
      titleStyle: { textAlign: 'right', color: theme.style.text.main },
      viewStyle: { height: 50 },
    },

    // {
    //   id: 'sumContent',
    //   title: 'Суммы',
    //   flex: 4,
    //   as: 'component',
    //   titleStyle: { textAlign: 'right', color: theme.style.text.main },
    //   viewStyle: redRowStyle,
    // },

    {
      id: 'checked',
      title: 'Выбран',
      as: 'checkbox',
      tintColors: { true: theme.style.success.main, false: theme.style.bg },
      flex: 3,
      titleStyle: { textAlign: 'left', color: theme.style.text.main },
      viewStyle: { borderColor: theme.style.text.main },
    },
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
        rows={rows}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
      />
    </View>
  );
};

export default CustomerRoutesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 36,
    paddingHorizontal: 10
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
