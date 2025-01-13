import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TableCell from './TableCell';

const TableRow = ({
  cells,
  item,
  isEditing,
  onEdit,
  onValueChange,
  onBlur,
  theme,
}) => {
  const { name, price, qty } = item;

  return (
    <View style={styles.container}>
      {cells.map((cell, index) => {
        if (cell?.as === 'input' && isEditing) {
          //   console.log('cell', cell);
          return (
            <TableCell
              theme={theme}
              selected={isEditing}
              flex={cell?.flex}
              titleStyle={cell?.titleStyle}
              viewStyle={cell?.viewStyle}
              //   as='input'
              //   onSubmitEditing={onBlur}
              //   onBlur={onBlur}
              //   onValueChange={onValueChange}
            >
              {cell?.title}
            </TableCell>
          );
        } else {
          return (
            <TouchableOpacity key={index} onPress={onEdit}>
              <TableCell
                theme={theme}
                selected={isEditing}
                flex={cell?.flex}
                titleStyle={cell?.titleStyle}
                viewStyle={cell?.viewStyle}
              >
                {cell?.title}
              </TableCell>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  return (
    <TouchableOpacity onPress={onEdit}>
      <View style={styles.container}>
        <TableCell flex={8} titleStyle={styles.name}>
          {name}
        </TableCell>
        <TableCell flex={2}>{price}</TableCell>
        {isEditing ? (
          <TableCell
            flex={2}
            as='input'
            onSubmitEditing={onBlur}
            onBlur={onBlur}
            onValueChange={onValueChange}
          >
            {qty}
          </TableCell>
        ) : (
          <TableCell flex={2}>{qty}</TableCell>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TableRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    textAlign: 'left',
  },
});
