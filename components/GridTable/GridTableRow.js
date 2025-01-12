import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constans/styles';
import GridTableRowCell from './GridTableRowCell';

const GridTableRow = ({ selected, cells, footerContent, headerContent }) => {
  const titleStyle = [styles.text];
  if (selected) {
    titleStyle.push(styles.selectedText);
  }

  return (<View style={styles.rootContainer}>
    {headerContent && headerContent}
    <View style={[styles.rowContainer, selected && styles.selected]}>
      {cells.map((cell, index) => (
        <GridTableRowCell
          selected={selected}
          key={index}
          {...cell}
          titleStyle={[...titleStyle, cell?.titleStyle]}
        />
      ))}
    </View>
    {footerContent && footerContent}
  </View>
  );
};

export default GridTableRow;

const styles = StyleSheet.create({
  rootContainer: {

  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // borderBottomColor: GlobalStyles.colors.primary100,
  },
  // rowCell: {
  //   flex: 1,
  //   borderWidth: 0.2,
  //   // borderColor: GlobalStyles.colors.primary100,
  //   paddingHorizontal: 4,
  //   justifyContent: 'center',
  //   minHeight: 36,
  // },
  text: {
    // color: 'white',
  },
  selectedText: {
    // color: 'black',
    fontWeight: 'bold',
  },
  // name: {
  //   textAlign: 'left',
  // },
  // number: {
  //   textAlign: 'right',
  // },
  selected: {
    // backgroundColor: GlobalStyles.colors.primary50,

  },
});
