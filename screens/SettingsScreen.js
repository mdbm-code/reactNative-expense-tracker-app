import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../store/redux/selectors/theme';
import ScreenWithDropdown from './ScreenWithDropdown';

const SettingsScreen = ({ navigation }) => {
  const theme = useSelector(getTheme);
  const selecteds = useSelector((state) => state.selecteds);
  const [selected, setSelected] = useState('_1');

  function selectHandler(value) {
    setSelected(value);
    // dispatch(setSelectedCustomerListItem(''));
    // dispatch(setSelectedRoute(value));
  }

  const options = [
    { label: 'Мой профиль', value: '_1' },
    { label: 'Стили', value: '_2' },
    { label: 'Параметры обмена', value: '_3' },
    { label: 'Прочие', value: '_4' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithDropdown
        rows={options || []}
        value={selected}
        onSelect={selectHandler}
        title={'Параметры и настройки'}
      ></ScreenWithDropdown>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
