import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getTheme } from '../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
import Tally from '../components/Tally';
import Selector from '../components/Selector';

const ScreenWithDropdown = ({
  onSwipe,
  component,
  rows,
  value,
  onSelect,
  children,
  title,
  footerContent,
}) => {
  const theme = useSelector(getTheme);
  const modalOptionsContainerStyle = {
    padding: 20,
    backgroundColor: theme.style.bars[2].bg,
    marginBottom: 20,
  };

  const renderFooter = () => {
    return (
      <View style={[styles.footer, { modalOptionsContainerStyle }]}>
        {footerContent}
      </View>
    );
  };

  //   const rows = [
  //     { label: 'Итоги дня', value: '_1' },
  //     { label: 'План продаж', value: '_2' },
  //     { label: 'Итоги месяца', value: '_3' },
  //     { label: 'АБСД товары', value: '_4' },
  //     { label: 'АБСД клиенты', value: '_5' },
  //   ];

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <Tally color={theme.style.nav.bg} bg={theme.style.bg}>
        {component ? (
          component
        ) : (
          <Selector
            // isSearchable={false}
            // onSwipe={onSwipe}
            value={value}
            onSelect={onSelect}
            isMultiple={false}
            rows={rows}
            dropdownContainerStyle={styles.dropdownContainerStyle}
            dropdownStyle={{
              backgroundColor: theme.style.bars[2].bg,
              borderRadius: 15,
            }}
            selectedItemStyle={[
              styles.selectedItemStyle,
              { color: theme.style.customerRouter.text },
            ]}
            modalControls={{
              modalOptionsContainerStyle,
            }}
            listComponentStyles={{ marginBottom: 20, marginTop: 20 }}
            renderFooter={renderFooter}
          />
        )}
      </Tally>
      {title && <Text style={styles.infoText}>{title}</Text>}
      {children}
    </View>
  );
};

export default ScreenWithDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  modalOptionsContainerStyle: {
    marginBottom: 0,
    marginTop: 0,
  },
  modalContainerStyle: {
    padding: 20,
  },
  dropdownStyle: {
    borderRadius: 15,
  },
  selectedItemStyle: {
    fontSize: 18,
  },
  dropdownContainerStyle: {
    marginBottom: 0,
    marginTop: 0,
  },
  footer: {
    minHeight: 30,
  },
});
