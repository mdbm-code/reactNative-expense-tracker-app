import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TableCell from './TableCell';

const TableRow = ({
  cells,
  isEditing,
  onEdit,
  onValueChange,
  onBlur,
  onLongPress,
  rowStyle,
}) => {
  return (
    <View style={[styles.container, !!rowStyle && rowStyle]}>
      {cells.map((cell, index) => {
        if (cell?.as === 'input' && isEditing) {
          return (
            <View
              key={index}
              style={[
                cell?.flex && styles[`flex${cell?.flex}`],
                cell?.viewStyle && cell?.viewStyle,
              ]}
            >
              <TableCell
                autoFocus={cell?.autoFocus}
                selected={isEditing}
                flex={cell?.flex}
                titleStyle={cell?.titleStyle}
                inputStyle={cell?.inputStyle}
                as='input'
                onSubmitEditing={onBlur}
                onBlur={onBlur}
                onValueChange={onValueChange}
              >
                {cell?.title}
              </TableCell>
            </View>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onEdit(cell?.returnParams)}
              style={[
                cell?.flex && styles[`flex${cell?.flex}`],
                cell?.viewStyle && cell?.viewStyle,
              ]}
            >
              <TableCell selected={isEditing} titleStyle={cell?.titleStyle}>
                {cell?.title}
              </TableCell>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default TableRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 7 },
  flex8: { flex: 8 },
  flex9: { flex: 9 },
  flex10: { flex: 10 },
  flex11: { flex: 11 },
  flex12: { flex: 12 },
});
