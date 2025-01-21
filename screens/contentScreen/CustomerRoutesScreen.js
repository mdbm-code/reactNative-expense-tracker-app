import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import Table from '../../components/GridTable/v2/Table';
import { getSelector_customerRouteList } from '../../store/redux/selectors/routes';
import {
  thunk_addCustomerToRoute,
  thunk_removeCustomerFromRoute,
} from '../../store/redux/slices/routesSlice';

const CustomerRoutesScreen = () => {
  const dispatch = useDispatch();
  const selector = getSelector_customerRouteList();
  const rows = useSelector(selector);
  const theme = useSelector(getTheme);

  if (typeof rows === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {rows}
      </FallbackText>
    );

  function pressOnItemHandler(payload) {
    // console.log(payload);
    const routeCode = payload?.item?.code;
    if (payload?.item?.checked === true) {
      const result = dispatch(thunk_removeCustomerFromRoute(routeCode));
      // console.log(result);
    } else if (payload?.item?.checked === false) {
      const result = dispatch(thunk_addCustomerToRoute(routeCode));
      // console.log(result);
    }
  }

  const columns = [
    {
      id: 'title',
      title: 'Маршрут',
      flex: 9,
      titleStyle: { textAlign: 'right', color: theme.style.text.main },
      viewStyle: { height: 50 },
    },

    {
      id: 'checked',
      title: 'Выбран',
      as: 'checkbox',
      tintColors: { true: theme.style.drawer.header.bg, false: theme.style.bg },
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
    paddingHorizontal: 10,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
