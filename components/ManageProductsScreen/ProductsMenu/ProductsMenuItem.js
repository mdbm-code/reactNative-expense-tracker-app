import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedMenuLevel_1,
  setSelectedMenuLevel_2,
} from '../../../store/redux/slices/selectedsSlice';
import ProductsMenuButton from './ProductsMenuButton';

const ProductsMenuItem = ({ item, rows, closeDrawer, theme }) => {
  const { name, code } = item;
  const dispatch = useDispatch();
  const { selectedMenuLevel_1, selectedMenuLevel_2 } = useSelector(
    (state) => state.selecteds
  );

  function onPressHandler(value) {
    // {"children": [{"code": "285", "name": "колбаса", "parent": "00001", "sort": 1}, {"code": "38", "name": "Консервы", "parent": "00001", "sort": 2}],
    // "code": "00001", "name": "Мясоконсервная продукция", "parent": "", "sort": 4}

    if (selectedMenuLevel_1?.code === value?.code) {
      dispatch(setSelectedMenuLevel_1(null));
    } else {
      delete value.children;
      dispatch(setSelectedMenuLevel_1(value));
    }
    //всегда сбрасываем выбранный пункт второго уровня, если кликнули на первый уровень
    dispatch(setSelectedMenuLevel_2(null));
  }

  function onPressSublevelHandler(value) {
    // {"code": "48", "name": "ЧакЧак", "parent": "конди", "sort": 2}
    dispatch(setSelectedMenuLevel_2(value));
    closeDrawer();
  }

  let subLevels = [];

  if (selectedMenuLevel_1?.code === code && Array.isArray(rows)) {
    //если у выбранной группы первого уровня есть дочерние элементы, то формируем из них массив subLevels для вывода
    const parent = rows.find((root) => root.code === selectedMenuLevel_1?.code);
    if (
      parent['children'] &&
      Array.isArray(parent['children']) &&
      parent['children'].length > 0
    ) {
      subLevels = [...parent.children];
    }
  }

  let subLevelContent = null;
  if (Array.isArray(subLevels) && subLevels.length > 0) {
    subLevelContent = (
      <View style={styles.sublevelContainer}>
        <FlatList
          data={subLevels}
          keyExtractor={(item) => item.code}
          renderItem={(itemData) => {
            return (
              <ProductsMenuButton
                style={styles.menuItem}
                theme={theme}
                title={itemData.item.name}
                selected={selectedMenuLevel_2?.code === itemData.item.code}
                level={2}
                onPress={() => onPressSublevelHandler(itemData.item)}
              />
            );
          }}
        />
      </View>
    );
  }

  return (
    <>
      <ProductsMenuButton
        style={styles.menuItem}
        title={name}
        selected={selectedMenuLevel_1?.code === code}
        iconName={
          selectedMenuLevel_1?.code === code
            ? 'chevron-up-outline'
            : 'chevron-down-outline'
        }
        onPress={() => onPressHandler(item)}
        theme={theme}
        level={1}
      />
      {subLevelContent}
    </>
  );
};

export default ProductsMenuItem;

const styles = StyleSheet.create({
  sublevelContainer: {
    flex: 1,
    // marginLeft: 12,
  },
});
