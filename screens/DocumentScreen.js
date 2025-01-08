import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { getThemePalette } from '../store/redux/selectors/theme';
import { getPartString } from '../util/string';
import GridTable from '../components/GridTable';

const DocumentScreen = ({ route, navigation }) => {
  const theme = useSelector(getThemePalette);
  const {
    baseTotal,
    code,
    column,
    customerCode,
    customerName,
    date,
    id,
    minSum,
    percent,
    total,
    totalReturn,
    orderRows,
  } = route.params;

  //{"key": "DocumentScreen-CEJMAFrCYXYRKQgeJrgLa",
  // "name": "DocumentScreen",
  // "params": {"baseTotal": 1994.72, "code": "ТД004942-1736256222410", "column": "customerName", "customerCode": "ТД004942", "customerName": "Вкус Халяль",
  //            "date": "07.01.2025", "id": "-OG-vs4_0ULIj95qtYof", "minSum": 0, "orderRows": [[Object]], "percent": 40.9, "total": 2810.6, "totalReturn": 0},
  // "path": undefined}

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customerName,
      headerRight: null,
      headerStyle: {
        backgroundColor: theme.bar.color, // цвет фона
      },
      headerTintColor: theme.bar.active,
    });
  }, [navigation]);

  const H = ({ flex = null, children }) => {
    return (
      <Text style={[styles.text, styles.h, { color: theme.bg.text, flex }]}>
        {children}
      </Text>
    );
  };
  const P = ({ flex = null, children }) => {
    return (
      <Text style={[styles.text, styles.p, { color: theme.bg.text, flex }]}>
        {children}
      </Text>
    );
  };
  const HStack = ({ children }) => {
    return <View style={[styles.hstack]}>{children}</View>;
  };
  const VStack = ({ children }) => {
    return <View style={[styles.vstack]}>{children}</View>;
  };
  const Line = () => {
    return <View style={[styles.line, { borderBottomColor: theme.bg.text }]} />;
  };

  //console.log(orderRows);
  //[{
  // "base_price": 22, "customerCode": "ТД004713", "default_price": 29,
  // "name": "Йогурт ГЕК 0,1% клубника,персик, маракуйа пл-ст 0,100 кг.", "price": 29, "productCode": "ТД000151", "qty": "10"
  //}]

  const rows = orderRows.map((row) => {
    const sum = Number(row?.qty) * Number(row?.price);
    return {
      ...row,
      sum: Math.round(sum * 100) / 100,
    };
  });

  const columns = [
    {
      id: 'name',
      title: 'Товар',
      flex: 8,
      titleStyle: { textAlign: 'left', fontSize: 12 },
    },
    { id: 'price', title: 'Цена', flex: 3 },
    { id: 'qty', title: 'Колво', flex: 3 },
    { id: 'sum', title: 'Сумма', flex: 3 },
  ];

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.bg.color }]}>
      <P>
        Заявка № {getPartString(code, '-')} от {date}{' '}
      </P>
      <P>
        Покупатель: <H>{customerName}</H>
      </P>
      <Line />
      <GridTable columns={columns} rows={rows} />
    </View>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 12,
  },
  text: {
    fontSize: 12,
  },
  h: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  hstack: {
    flexDirection: 'row',
  },
  vstack: {
    flexDirection: 'column',
  },
  line: {
    height: 2,
    width: '100%',
    borderBottomWidth: 2,
  },
});
