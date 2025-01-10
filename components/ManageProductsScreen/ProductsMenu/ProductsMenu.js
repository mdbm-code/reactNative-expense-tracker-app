import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ProductsMenuItem from './ProductsMenuItem';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../../store/redux/selectors/groups';
import FallbackText from '../../FallbackText';
import { getThemePalette } from '../../../store/redux/selectors/theme';

const ProductsMenu = ({ closeDrawer }) => {
  const groups = useSelector(selectGroups);
  const theme = useSelector(getThemePalette);

  if (typeof groups === 'string') {
    return <FallbackText>{groups}</FallbackText>;
  }
  return (
    <View style={[styles.container]}>
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
