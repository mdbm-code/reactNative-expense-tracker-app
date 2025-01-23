import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchString,
  setSelectedMenuLevel_1,
  setSelectedMenuLevel_2,
  setSelectedProductMenu,
} from '../../../store/redux/slices/selectedsSlice';
import ProductsMenuButton from './ProductsMenuButton';

const ProductsMenuItem = ({
  item,
  rows,
  closeDrawer,
  theme,
  selectedStyle,
  selectedProductMenu,
}) => {
  const { name, code } = item;
  const dispatch = useDispatch();
  const { searchString } = useSelector((state) => state.selecteds);

  function onPressHandler(value) {
    dispatch(
      setSelectedProductMenu({
        title: value?.name,
        level: value?.level,
        code: value?.code,
      })
    );
    // {"children": [{"code": "285", "name": "колбаса", "parent": "00001", "sort": 1}, {"code": "38", "name": "Консервы", "parent": "00001", "sort": 2}],
    // "code": "00001", "name": "Мясоконсервная продукция", "parent": "", "sort": 4}

    // if (selectedMenuLevel_1?.code === value?.code) {
    //   dispatch(setSelectedMenuLevel_1(null));
    // } else {
    //   delete value.children;
    //   dispatch(setSelectedMenuLevel_1(value));
    // }
    // //всегда сбрасываем выбранный пункт второго уровня, если кликнули на первый уровень
    // dispatch(setSelectedMenuLevel_2(null));
  }

  function onPressSublevelHandler(value) {
    if (searchString) {
      dispatch(setSearchString(''));
    }

    dispatch(
      setSelectedProductMenu({
        title: value?.name,
        level: value?.level,
        code: value?.code,
      })
    );
    // {"code": "48", "name": "ЧакЧак", "parent": "конди", "sort": 2}
    // dispatch(setSelectedMenuLevel_2(value));
    closeDrawer();
  }

  let subLevels = [];

  if (selectedProductMenu?.code === code && Array.isArray(rows)) {
    //если у выбранной группы первого уровня есть дочерние элементы, то формируем из них массив subLevels для вывода
    const parent = rows.find((root) => root.code === selectedProductMenu?.code);
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
                selectedStyle={selectedStyle}
                style={styles.menuItem}
                theme={theme}
                title={itemData.item.name}
                selected={
                  selectedProductMenu.level === 0 ||
                  (selectedProductMenu?.code === itemData.item.code &&
                    selectedProductMenu.level === 1)
                }
                level={2}
                onPress={() =>
                  onPressSublevelHandler({
                    name: itemData.item?.name,
                    level: 2,
                    code: itemData.item?.code,
                  })
                }
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
        selected={
          selectedProductMenu.level === 0 ||
          (selectedProductMenu?.code === code &&
            selectedProductMenu.level === 1)
        }
        iconName={
          selectedProductMenu?.code === code
            ? 'chevron-up-outline'
            : 'chevron-down-outline'
        }
        onPress={() =>
          onPressHandler({
            name: item?.name,
            level: 1,
            code: item?.code,
          })
        }
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
