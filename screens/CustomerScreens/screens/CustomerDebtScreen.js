import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
// import { selectOrder } from '../../store/redux/selectors/orders';
// import { GlobalStyles } from '../../constans/styles';
// import GridTable from '../../components/GridTable';
// import { selectDebitCredit } from '../../store/redux/selectors/debts';
// import FallbackText from '../../components/FallbackText';
// import { getFormattedDate } from '../../util/date';
import { getThemePalette } from '../../../store/redux/selectors/theme';
import { useNavigation } from '@react-navigation/native';
import GridTable from '../../../components/GridTable';
import { selectDebitCredit } from '../../../store/redux/selectors/debts';
import { getFormattedDate } from '../../../util/date';
import FallbackText from '../../../components/FallbackText';

const CustomerDebtScreen = () => {
  const navigation = useNavigation();
  const obj = useSelector(selectDebitCredit);
  const theme = useSelector(getThemePalette);
  if (typeof obj === 'string') return <FallbackText>{obj}</FallbackText>;
  const rows = obj?.docs || [];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Сверка',
      headerStyle: {
        backgroundColor: theme.bar.color,
      },
      headerTintColor: theme.bar.active,
    });
  }, [navigation]);

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

  const columns = [
    {
      id: 'title',
      title: 'Документ',
      flex: 9,
      titleStyle: { textAlign: 'left' },
    },
    { id: 'sum', title: 'Сумма', flex: 3, titleStyle: { textAlign: 'right' } },
  ];

  return (
    <View style={[styles.rootContainer]}>
      <Text style={styles.text}>{`${getFormattedDate(obj?.startDate)} ${
        obj?.startDebit > 0
          ? `нам должны ${obj?.startDebit}`
          : `мы должны ${obj?.startCredit}`
      }`}</Text>
      <GridTable rows={updatedRows} columns={columns} rowId='code' />
      <Text style={styles.text}>{`${getFormattedDate(obj?.endDate)} ${
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
  },
  headerContainer: {
    // backgroundColor: GlobalStyles.colors.primary400,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
});
