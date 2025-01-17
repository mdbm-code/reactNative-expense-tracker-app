import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getTheme, getThemePalette } from '../../store/redux/selectors/theme';
import { selectDebitCredit } from '../../store/redux/selectors/debts';
import GridTable from '../../components/GridTable';
import FallbackText from '../../components/FallbackText';
import { getFormattedDate } from '../../util/date';
import Table from '../../components/GridTable/v2/Table';
import { getCurrentCustomerDoc } from '../../store/redux/selectors/orders';
import { getCustomerDocumentsSelector } from '../../store/redux/selectors/documents';

const CustomerDocumentsScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const selector = getCustomerDocumentsSelector(page);
  const documents = useSelector(selector);

  const theme = useSelector(getTheme);
  if (typeof documents === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {documents}
      </FallbackText>
    );

  console.log(documents);

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

  // const updatedRows = rows.map((row) => {
  //   return {
  //     code: row.id || row.code,
  //     title: `${row.title} ${getFormattedDate(row.date) || ''}`,
  //     sum: row.in !== 0 ? row.in : row.out,
  //   };
  // });
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
      <Table
        // headerFooter={!!showTableOptions && headerFooter}
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
