import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constans/styles';
import GridTableRowCell from './GridTableRowCell';

const GridTableRow = ({ selected, cells }) => {
  const titleStyle = [styles.text];
  if (selected) {
    titleStyle.push(styles.selectedText);
  }

  return (
    <View style={[styles.rowContainer, selected && styles.selected]}>
      {cells.map((cell, index) => (
        <GridTableRowCell
          key={index}
          {...cell}
          // title={cell?.title}
          // flex={cell?.flex}
          titleStyle={[...titleStyle, cell?.titleStyle]}
        // as={cell?.as}
        // returnParams={cell?.returnParams}
        // onPress={cell?.onPress}
        // onChangeValue={cell?.onChangeValue}
        // onLongPress={cell?.onLongPress}
        // prefix={cell?.prefix}
        // postfix={cell?.postfix}
        />
      ))}
    </View>
  );
};

export default GridTableRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary100,
  },
  rowCell: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 4,
    justifyContent: 'center',
    minHeight: 36,
  },
  text: {
    color: 'white',
  },
  selectedText: {
    color: 'black',
  },
  name: {
    textAlign: 'left',
  },
  number: {
    textAlign: 'right',
  },
  selected: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
