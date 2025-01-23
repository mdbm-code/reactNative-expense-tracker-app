import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Pager from './Pager';

const Paginator = ({ theme, pages, page, onPress, style }) => {
  return (
    <View
      style={[
        styles.paginationContainer,
        { backgroundColor: theme.style.bg },
        style,
      ]}
    >
      {/* <Text style={[styles.text, { color: theme.style.customerList.title }]}>
        Страница:
      </Text> */}
      <Pager
        minimumValue={1}
        maximumValue={Number(pages)}
        step={1}
        value={Number(page)}
        onValueChange={(value) => onPress(value)}
        buttonViewStyle={[
          styles.pagerButtonViewStyle,
          { borderColor: theme.style.text.main },
        ]}
        titleStyle={[
          styles.pagerTitleStyle,
          ,
          { color: theme.style.text.main },
        ]}
        titleStyleSelected={[
          styles.pagerTitleStyleSelected,
          { borderColor: theme.style.success.main },
        ]}
      />
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  text: {
    // color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  paginationContainer: {
    // marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pagerContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  pagerButtonViewStyle: {
    width: 50,
    height: 50,
    padding: 5,
  },
  pagerTitleStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
