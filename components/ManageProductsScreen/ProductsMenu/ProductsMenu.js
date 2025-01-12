import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ProductsMenuItem from './ProductsMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../../store/redux/selectors/groups';
import FallbackText from '../../FallbackText';
import { getThemePalette } from '../../../store/redux/selectors/theme';
import ProductsMenuButton from './ProductsMenuButton';
import { setUnselectMenu } from '../../../store/redux/slices/selectedsSlice';

const ProductsMenu = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const { selectedMenuLevel_1, selectedMenuLevel_2 } = useSelector(state => state.selecteds)
  const groups = useSelector(selectGroups);
  const theme = useSelector(getThemePalette);


  function onPressHandler(payload) {
    dispatch(setUnselectMenu());
    closeDrawer();
  }

  if (typeof groups === 'string') {
    return <FallbackText>{groups}</FallbackText>;
  }
  return (
    <View style={[styles.container]}>
      <ProductsMenuButton
        title={'Популярные'}
        theme={theme}
        selected={!selectedMenuLevel_1 && !selectedMenuLevel_2}
        level={!selectedMenuLevel_1 && !selectedMenuLevel_2 ? 2 : 1}
        // iconName={selectedMenuLevel_1 === code ? 'chevron-up-outline' : 'chevron-down-outline'}
        onPress={onPressHandler}
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.code}
        renderItem={(itemData) => (
          <ProductsMenuItem
            item={itemData.item}
            rows={groups}
            closeDrawer={closeDrawer}
            theme={theme}
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
  },
});
