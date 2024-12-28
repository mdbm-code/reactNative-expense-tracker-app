import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FallbackText from '../FallbackText';
import { getFormattedDate, getFormattedDate2 } from '../../util/date';
import DebtRow from './table/DebtRow';
import { GlobalStyles } from '../../constans/styles';

const DebtTable = ({ data }) => {
  if (!(typeof data === 'object' && Object.keys(data).length > 0)) {
    return <FallbackText title='Нет данных' />;
  }

  console.log('DebtTable', data);

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.text, styles.headerText]}>
        Взаиморасчеты с клиентом:
      </Text> */}
      <DebtRow
        rowData={{
          date: data?.pastDate,
          title: 'Начальное сальдо:',
          sum: data?.pastValue,
          type: 'out',
        }}
        isHeader={true}
      />
      <ScrollView>
        {data?.docs?.map((row) => {
          return <DebtRow key={row.id} rowData={row} />;
        })}
      </ScrollView>
      <DebtRow
        rowData={{
          date: data?.lastDate,
          title: 'Конечное сальдо:',
          sum: data?.lastValue,
          type: 'out',
        }}
        isHeader={true}
      />
    </View>
  );
};

export default DebtTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  headerText: {
    marginVertical: 14,
    textAlign: 'center',
  },
});
