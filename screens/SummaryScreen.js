import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getTheme } from '../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
import ScreenWithDropdown from './ScreenWithDropdown';

const SummaryScreen = () => {
  const theme = useSelector(getTheme);
  const selecteds = useSelector((state) => state.selecteds);
  const [selectedSummary, setSelectedSummary] = useState('_1');

  function selectSummaryHandler(value) {
    setSelectedSummary(value);
    // dispatch(setSelectedCustomerListItem(''));
    // dispatch(setSelectedRoute(value));
  }

  const rows = [
    { label: 'Итоги дня', value: '_1' },
    { label: 'План продаж', value: '_2' },
    { label: 'Итоги месяца', value: '_3' },
    { label: 'АБСД товары', value: '_4' },
    { label: 'АБСД клиенты', value: '_5' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithDropdown
        rows={rows || []}
        value={selectedSummary}
        onSelect={selectSummaryHandler}
        title={'Отчет'}
      ></ScreenWithDropdown>
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
