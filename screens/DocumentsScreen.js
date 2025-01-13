import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { getTheme } from '../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
import ScreenWithDropdown from './ScreenWithDropdown';

const DocumentsScreen = () => {
  const theme = useSelector(getTheme);
  const selecteds = useSelector((state) => state.selecteds);
  const [selectedPeriod, setSelectedPeriod] = useState('_1');

  function selectHandler(value) {
    setSelectedPeriod(value);
    // dispatch(setSelectedCustomerListItem(''));
    // dispatch(setSelectedRoute(value));
  }

  const rows = [
    { label: 'Сегодня', value: '_1' },
    { label: 'Вчера', value: '_2' },
    { label: 'За 7 дней', value: '_3' },
    { label: 'Текущий месяц', value: '_4' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithDropdown
        rows={rows}
        value={selectedPeriod}
        onSelect={selectHandler}
        title={'Таблица с заявками'}
      ></ScreenWithDropdown>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
