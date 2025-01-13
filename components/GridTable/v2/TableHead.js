import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TableCell from './TableCell';

const TableHead = ({ selected, columns, rowStyle }) => {
  if (selected) {
    containerStyle.push(styles.selected);
  }
  return (
    <View style={[styles.rowContainer, !!rowStyle && rowStyle]}>
      {columns
        .filter((col) => !col?.hidden)
        .map((column) => {
          //   const ComponentToRender = column?.headerContent;
          let content = <></>;
          if (column?.headerContent) {
            content = column?.headerContent;
          } else {
            content = (
              <TableCell
                key={column.id}
                selected={selected}
                titleStyle={
                  column?.headerTitleStyle
                    ? column.headerTitleStyle
                    : column?.titleStyle && column.titleStyle
                }
              >
                {column?.title}
              </TableCell>
            );
          }

          if (typeof column?.onPress === 'function') {
            return (
              <TouchableOpacity
                key={column.id}
                onPress={() => {
                  column?.onPress(column?.id);
                }}
                style={[
                  !!column?.flex && styles[`flex${column.flex}`],
                  column?.headerViewStyle
                    ? column.headerViewStyle
                    : column?.viewStyle && column.viewStyle,
                ]}
              >
                {content}
              </TouchableOpacity>
            );
          } else {
            return (
              <View
                key={column.id}
                style={[
                  !!column?.flex && styles[`flex${column.flex}`],
                  column?.headerViewStyle
                    ? column.headerViewStyle
                    : column?.viewStyle && column.viewStyle,
                ]}
              >
                {content}
              </View>
            );
          }
        })}
    </View>
  );
};

export default TableHead;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    minHeight: 36,
    maxHeight: 40,
  },
  text: {},
  selectedText: {},
  selected: {},
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
