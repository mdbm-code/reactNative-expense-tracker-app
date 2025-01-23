import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ProductsMenuItem from './ProductsMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups } from '../../../store/redux/selectors/groups';
import FallbackText from '../../FallbackText';
import { getThemePalette } from '../../../store/redux/selectors/theme';
import ProductsMenuButton from './ProductsMenuButton';
import {
  setSelectedProductMenu,
  setUnselectMenu,
} from '../../../store/redux/slices/selectedsSlice';

const ProductsMenu = ({ closeDrawer, navigation, selectedStyle }) => {
  const dispatch = useDispatch();
  const { selectedProductMenu } = useSelector((state) => state.selecteds);
  const groups = useSelector(selectGroups);
  const theme = useSelector(getThemePalette);

  // console.log('drawerNavigation', typeof drawerNavigation?.closeDrawer);

  function onPressHandler(payload) {
    dispatch(setUnselectMenu());
    dispatch(
      setSelectedProductMenu({
        title: payload?.name,
        level: payload?.level,
        code: payload?.code,
      })
    );

    if (typeof navigation?.closeDrawer === 'function') {
      navigation.closeDrawer();
    } else if (typeof closeDrawer === 'function') {
      closeDrawer();
    }
  }

  if (typeof groups === 'string') {
    return <FallbackText>{groups}</FallbackText>;
  }

  // console.log('selectedProductMenu', selectedProductMenu);

  return (
    <View style={[styles.container]}>
      <ProductsMenuButton
        selectedProductMenu={selectedProductMenu}
        selectedStyle={selectedStyle}
        title={'Популярные'}
        theme={theme}
        // selected={selectedProductMenu?.level === 0}
        onPress={() =>
          onPressHandler({
            name: 'Популярные',
            level: 0,
            code: '0',
          })
        }
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.code}
        renderItem={(itemData) => (
          <ProductsMenuItem
            selectedProductMenu={selectedProductMenu}
            selectedStyle={selectedStyle}
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
