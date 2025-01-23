import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';

const Table = ({
  hideHeader,
  refreshing = false,
  onRefresh = () => {},
  columns,
  rows,
  selectedId,
  keyId = 'code',
  selectedRowFooter,
  onPress,
  onChangeText,
  onLongPress,
  theme,
  rowStyle,
  headerFooter,
}) => {
  const renderItem = ({ item, index }) => {
    const isEditing = selectedId === item[keyId];

    const cells = [];
    const rowValues = {};
    columns.forEach((column) => {
      let prefix = null;
      if (column?.prefix && typeof column?.prefix === 'object') {
        if (column.prefix?.cond && typeof column.prefix.cond === 'object') {
          const { key, ifnull, ifnot } = column.prefix.cond;
          if (!key) {
            prefix = null;
          } else {
            if (!item[key]) {
              prefix = ifnull;
            } else if (ifnot) {
              prefix = ifnot;
            }
          }
        }
      }
      // if (column.hidden) return;
      rowValues[column.id] = item[column.id];

      cells.push({
        ...column,
        prefix,
        title: item[column.id],
        returnParams: { item, column: column.id, rowIndex: index },
        // onPress: onPress,
        onChangeValue: onChangeText,
      });
    });

    return (
      <View style={styles.rowContainer}>
        <TableRow
          rowStyle={rowStyle}
          cells={cells}
          rowValues={rowValues}
          item={item}
          theme={theme}
          isEditing={isEditing}
          onEdit={onPress}
          onBlur={(newValue) => {
            onChangeText(item, newValue, 'TextInput');
          }}
          onLongPress={onLongPress}
        />
        {isEditing && !!selectedRowFooter && selectedRowFooter}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.rootContainer}
      keyboardVerticalOffset={90} // значение сдвига
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* {refreshing && <ActivityIndicator size='large' color={null} />} */}
      {!hideHeader && <TableHead columns={columns} />}
      {headerFooter}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={rows}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item) => item[keyId]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        //extraData={someValue} //Свойство extraData в компоненте FlatList в React Native используется для управления перерисовкой списка, когда данные, которые не являются частью массива data, изменяются. Это особенно полезно, когда вы хотите, чтобы FlatList реагировал на изменения в состоянии или других переменных, которые не являются частью самого списка.
      />
    </KeyboardAvoidingView>
  );
};

export default Table;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    paddingBottom: 20,
  },
});
