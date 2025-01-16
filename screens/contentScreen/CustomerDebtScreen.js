import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getTheme, getThemePalette } from '../../store/redux/selectors/theme';
import { selectDebitCredit } from '../../store/redux/selectors/debts';
import GridTable from '../../components/GridTable';
import FallbackText from '../../components/FallbackText';
import { getFormattedDate } from '../../util/date';
import Table from '../../components/GridTable/v2/Table';

const CustomerDebtScreen = () => {
  const navigation = useNavigation();
  const obj = useSelector(selectDebitCredit);
  const theme = useSelector(getTheme);
  if (typeof obj === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {obj}
      </FallbackText>
    );
  const rows = obj?.docs || [];

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Сверка',
  //     headerStyle: {
  //       backgroundColor: theme.style.bg,
  //     },
  //     headerTintColor: theme.bar.active,
  //   });
  // }, [navigation]);

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       // title: 'Подбор товаров',
  //       // headerStyle: {
  //       //   backgroundColor: theme.bar.color,
  //       // },
  //       // headerTintColor: theme.bar.active,
  //       headerRight: null,
  //     });
  //   }, [navigation]);

  const updatedRows = rows.map((row) => {
    return {
      code: row.id || row.code,
      title: `${row.title} ${getFormattedDate(row.date) || ''}`,
      sum: row.in !== 0 ? row.in : row.out,
    };
  });
  // rows: = [
  // 	{
  // 		code: 'SO-0-0-0-0-0-25882310854E',
  // 		date: '2024-12-18',
  // 		title: 'Расх.накл. № ДО-9631472 -',
  // 		in: -612.05,
  // 		out: 0,
  // 	},
  // ]
  function pressOnItemHandler(value) {
    console.log(value);
  }

  const columns = [
    {
      id: 'title',
      title: 'Документ',
      flex: 9,
      titleStyle: { textAlign: 'left', color: theme.style.customerList.title },
      viewStyle: {
        backgroundColor: theme.style.customerList.bg2,
      },
    },
    {
      id: 'sum',
      title: 'Сумма',
      flex: 3,
      titleStyle: { textAlign: 'right', color: theme.style.customerList.title },
      viewStyle: {
        borderLeftWidth: 1,
        paddingLeft: 6,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  ];

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      <Text
        style={[styles.text, { color: theme.style.customerList.title }]}
      >{`${getFormattedDate(obj?.startDate)} ${
        obj?.startDebit > 0
          ? `нам должны ${obj?.startDebit}`
          : `мы должны ${obj?.startCredit}`
      }`}</Text>
      <Table
        // headerFooter={!!showTableOptions && headerFooter}
        rowStyle={styles.rowStyle}
        columns={columns}
        rows={updatedRows}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
        // onChangeText={handleSubmitEditing}
        // selectedId={selectedProduct?.code}
        // selectedRowFooter={selectedRowFooter}
        // onLongPress={() => {
        //   // console.log('long press');
        // }}
        // headerViewStyle={{ backgroundColor: 'red' }}
        // headerTitleStyle={{ color: 'blue' }}
      />
      {/* <GridTable rows={updatedRows} columns={columns} rowId='code' /> */}
      <Text
        style={[styles.text, { color: theme.style.customerList.title }]}
      >{`${getFormattedDate(obj?.endDate)} ${
        obj?.endDebit > 0
          ? `нам должны ${obj?.endDebit}`
          : `мы должны ${obj?.endCredit}`
      }`}</Text>
    </View>
  );
};

export default CustomerDebtScreen;

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
