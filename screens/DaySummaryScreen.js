import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getThemePalette } from '../store/redux/selectors/theme';
import { useSelector } from 'react-redux';

const DaySummaryScreen = () => {
  const theme = useSelector(getThemePalette);
  return (
    <View style={[styles.container, { backgroundColor: theme.bg.color }]}>
      <Text style={[styles.infoText, { color: theme.bg.text }]}>
        Минимальная / Текущая сумма заявок
      </Text>
      <Text style={[styles.infoText, { color: theme.bg.text }]}>
        Помещаемость (%)
      </Text>
      <Text style={[styles.infoText, { color: theme.bg.text }]}>
        Кнопка Поделиться (для отправки в Ватсап группу)
      </Text>
    </View>
  );
};

export default DaySummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
