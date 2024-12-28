import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FallbackText from '../FallbackText';
import { getFormattedDate, getFormattedDate2 } from '../../util/date';
import DebtRow from './table/DebtRow';

const DebtTable = ({ data }) => {
  if (!(typeof data === 'object' && Object.keys(data).length > 0)) {
    return <FallbackText title='Нет данных' />;
  }

  console.log('DebtTable', data);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Сальдо на {getFormattedDate(data?.pastDate)} = {data?.pastValue}
      </Text>
      <ScrollView>
        {data?.docs?.map((row) => {
          return (
            <DebtRow
              key={row.id}
              rowData={{ date: '', doc: row.title, sum: row.sum }}
            />
          );
        })}
      </ScrollView>
      <Text style={styles.text}>
        Сальдо на {getFormattedDate(data?.lastDate)} = {data?.lastValue}
      </Text>
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
});
