import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import ProductsMenuItem from './ProductsMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups_v2 } from '../../../store/redux/selectors/groups';
import FallbackText from '../../FallbackText';
import { getTheme } from '../../../store/redux/selectors/theme';
import {
  setSearchString,
  setSelectedProductMenu,
} from '../../../store/redux/slices/selectedsSlice';

const ProductsMenu = ({ closeDrawer, selectedStyle }) => {
  const dispatch = useDispatch();
  const { selectedProductMenu, searchString } = useSelector((state) => state.selecteds);
  const groups = useSelector(selectGroups_v2);
  const theme = useSelector(getTheme);
  const [selectedRoot, setSelectedRoot] = useState(null);

  if (typeof groups === 'string') {
    return <FallbackText>{groups}</FallbackText>;
  }

  function onPressHandler(value) {
    if (searchString) dispatch(setSearchString(''));

    if (value.level === 1 && !value.childfree) {
      //кликнули на пункт первого уровня, мы лишь раскрываем его
      //за исключением пункта "Популярные товары"
      setSelectedRoot(state => state === value.code ? null : value.code);
    } else {
      dispatch(
        setSelectedProductMenu({
          title: value?.name,
          level: value?.level,
          code: value?.code,
        })
      );
      closeDrawer();
    }
  }

  return (
    <View style={[styles.container]}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.code}
        renderItem={(itemData) => (
          <ProductsMenuItem
            searchString={searchString}
            selectedProductMenu={selectedProductMenu}
            selectedStyle={selectedStyle}
            item={itemData.item}
            rows={groups}
            closeDrawer={closeDrawer}
            theme={theme}
            onPress={onPressHandler}
            selectedRoot={selectedRoot}
          />
        )}
      />
    </View>
  );
};

export default ProductsMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
