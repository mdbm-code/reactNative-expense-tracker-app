import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductsMenuButton from './ProductsMenuButton';

const ProductsMenuItem = ({
  item,
  theme,
  selectedStyle,
  onPress,
  selectedRoot
}) => {

  let subLevels = [];
  if (selectedRoot === item.code && Array.isArray(item?.children)) {
    subLevels = [...item.children];
  }

  let subLevelContent = null;
  if (Array.isArray(subLevels) && subLevels.length > 0) {
    subLevelContent = (
      <View style={styles.sublevelContainer}>
        <FlatList
          data={subLevels}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => {
            return (
              <ProductsMenuButton
                selectedStyle={selectedStyle}
                style={styles.menuItem}
                theme={theme}
                title={item?.name}
                selected={item?.selected}
                level={item?.level}
                onPress={() => onPress(item)}
                sibling={true}
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
        selectedStyle={selectedStyle}
        style={styles.menuItem}
        title={item?.name}
        selected={item?.selected}
        iconName={!item?.childfree ?
          selectedRoot === item?.code
            ? 'chevron-up-outline'
            : 'chevron-down-outline' : null
        }
        onPress={() => onPress(item)}
        theme={theme}
        level={item?.level}
        selectedRoot={selectedRoot === item?.code}
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
