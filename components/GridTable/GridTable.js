import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
// import { GlobalStyles } from '../../constans/styles';
import FallbackText from '../FallbackText';
import GridTableRow from './GridTableRow';
import GridTableHead from './GridTableHead';

const GridTable = ({
  onRefresh = () => {},
  refreshing = false,
  rows,
  columns,
  onPress,
  onChangeText,
  onLongPress,
  rowId = 'id',
  rowFooter = null,
  rowHeader = null,
  selectedValue = null,
  seelectedKey = 'id',
  headerViewStyle,
  headerTitleStyle,
}) => {
  const [selectedRow, setSelectedRow] = useState('');
  // const flatListRef = useRef(null); // Реф для управления скроллом
  // const [lastEditedIndex, setLastEditedIndex] = useState(null); // Индекс последней измененной строки

  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;

  // console.log('GridTable');

  // console.log('rowId', rowId);
  // console.log('GridTable.rows', rows);

  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <FallbackText>
        Параметр colums должен быть массивом с описанием колонок
      </FallbackText>
    );
  }

  const onPressHandler = (value) => {
    setSelectedRow(value[rowId]);
    if (typeof onPress === 'function') {
      onPress(value);
    }
  };

  const onChangeValueHandler = (returnParams) => {
    // const { rowIndex } = returnParams; // Предполагается, что rowIndex передается в returnParams
    // setLastEditedIndex(rowIndex); // Сохраняем индекс измененной строки
    if (typeof onChangeText === 'function') {
      onChangeText(returnParams);
    }
  };
  const onLongPressHandler = (value) => {
    if (typeof onLongPress === 'function') {
      onLongPress(value);
    }
  };

  // React.useEffect(() => {
  //   if (lastEditedIndex !== null && flatListRef.current) {
  //     flatListRef.current.scrollToIndex({
  //       index: lastEditedIndex,
  //       animated: true,
  //     });
  //   }
  // }, [lastEditedIndex]);

  //rows = [{"code": "ТД000109", "name": "Айран БУДЬ ЗДОРОВ 0,1% 0,5 л.", "price": 39.32, "qty": "2", "unit": "шт"}]

  //columns = [
  // 	{ id: 'name', title: 'Наименование', flex: 8, titleStyle: { textAlign: 'left' }, rowId },
  // 	{ id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' }, rowId },
  // 	{ id: 'qty', title: 'Колво', flex: 2, rowId: 'code', as:'input },
  // ]

  const renderItem = ({ item, index }) => {
    let footerContent = <></>;
    if (
      rowFooter &&
      rowFooter['key'] &&
      rowFooter['condition'] &&
      rowFooter['content']
    ) {
      if (rowFooter.condition['eq']) {
        if (rowFooter.condition.eq === item[rowFooter.key]) {
          footerContent = rowFooter.content;
        }
      }
    }
    let headerContent = <></>;
    if (
      rowHeader &&
      rowHeader['key'] &&
      rowHeader['condition'] &&
      rowHeader['content']
    ) {
      if (rowHeader.condition['eq']) {
        if (rowHeader.condition.eq === item[rowHeader.key]) {
          headerContent = rowHeader.content;
        }
      }
    }

    const cells = [];
    columns.forEach((column) => {
      let prefix = null;
      if (column?.prefix && typeof column?.prefix === 'object') {
        if (column.prefix?.cond && typeof column.prefix.cond === 'object') {
          const { key, ifnull, ifnot } = column.prefix.cond;
          if (!key) {
            prefix = null;
          } else {
            if (
              ifnull &&
              (item[key] === undefined ||
                item[key] === null ||
                item[key] === '')
            ) {
              prefix = ifnull;
            } else if (ifnot) {
              prefix = ifnot;
            }
          }
        }
      }
      if (column.hidden) return;

      cells.push({
        ...column,
        prefix,
        title: item[column.id],
        flex: column?.flex,
        titleStyle: column?.titleStyle,
        returnParams: { ...item, column: column.id, rowIndex: index },
        as: column?.as,
        selectedContent: column?.selectedContent,
        onPress: onPressHandler,
        onChangeValue: onChangeValueHandler,
        onLongPress: onLongPressHandler,
        // prefix: column?.prefix,
        // postfix: column?.postfix
      });
    });
    return (
      <GridTableRow
        cells={cells}
        selected={
          selectedValue
            ? selectedValue === item[rowId]
            : selectedRow === item[rowId]
        }
        footerContent={footerContent}
        headerContent={headerContent}
      />
    );
  };

  return (
    <View style={[styles.rootContainer]}>
      <GridTableHead
        columns={columns}
        style={styles.headerContainer}
        headerViewStyle={headerViewStyle}
        headerTitleStyle={headerTitleStyle}
      />
      {refreshing && <ActivityIndicator size='large' color='#00ff00' />}
      <KeyboardAwareFlatList
        // ref={flatListRef} // Реф для управления скроллом
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={rows}
        renderItem={(itemData) => renderItem(itemData)}
        keyExtractor={(item) => item[rowId]}
        extraHeight={140} // Дополнительное пространство для клавиатуры
      />
    </View>
  );
};

export default GridTable;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: GlobalStyles.colors.primary400,
  },
});
