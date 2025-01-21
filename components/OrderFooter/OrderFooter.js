import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { selecteOrderData } from '../../store/redux/selectors/orders';
import { useSelector } from 'react-redux';

const OrderFooter = ({ theme }) => {
  const { totalAmount, minSum } = useSelector(selecteOrderData);

  let proc = '';
  if (totalAmount > 0) {
    proc = Math.round((minSum / totalAmount) * 100) / 100;
  }

  let content = (
    <Text style={{ color: theme?.style?.nav?.text }}>
      Сумма: {totalAmount.toLocaleString('ru-RU')}
    </Text>
  );
  if (minSum) {
    content = (
      <>
        <Text style={{ color: theme?.style?.nav?.text }}>
          {minSum.toLocaleString('ru-RU')}
        </Text>
        <Text style={{ color: theme?.style?.nav?.text }}>{'/'}</Text>
        <Text style={{ color: theme?.style?.nav?.text }}>
          {totalAmount.toLocaleString('ru-RU')}
        </Text>
        {proc && <Text style={{ color: theme?.style?.nav?.text }}>{':'}</Text>}
        {proc && <Text style={{ color: theme?.style?.nav?.text }}>{proc}</Text>}
      </>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.style?.nav?.bg }]}
    >
      {content}
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
