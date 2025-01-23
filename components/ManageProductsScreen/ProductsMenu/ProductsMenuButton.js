import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ProductsMenuButton = ({
  theme,
  title,
  iconName,
  onPress,
  selected,
  titleStyle,
  level = 1,
  selectedStyle,
  sibling,
  selectedRoot
}) => {
  const containerStyles = [styles.container];

  if (selected) {
    containerStyles.push(styles.selected);
    if (selectedStyle?.backgroundColor) {
      containerStyles.push({ backgroundColor: selectedStyle?.backgroundColor });
    }
  }

  if (sibling) {
    containerStyles.push({ borderLeftWidth: 10, borderLeftColor: selectedStyle?.backgroundColor });
  }

  const _titleStyles = [
    styles[`title${level}`],
    { color: theme.style.customerList.title },
  ];
  let iconColor = theme.style.customerList.title;

  if (selected) {
    if (selectedStyle?.color) {
      iconColor = theme.style.customerList.title;
      _titleStyles.push({ color: selectedStyle?.color });
    }
    if (selectedStyle?.fontWeight) {
      _titleStyles.push({ fontWeight: selectedStyle?.fontWeight });
    }
  }

  if (selectedRoot) {
    _titleStyles.push({ fontWeight: 'bold' });
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={containerStyles}>
        <View style={styles.firstLineContainer}>
          <Text style={_titleStyles}>{title}</Text>
          {iconName && <Ionicons name={iconName} size={24} color={iconColor} />}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductsMenuButton;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
    // paddingVertical: 4,
    flexDirection: 'column',
  },
  selected: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 8,
  },
  firstLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  icon: {
    flex: 1, // Позволяет тексту занимать доступное пространство
    margin: 0,
    padding: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  title1: {
    paddingLeft: 10,
  },
  title2: {
    paddingLeft: 30,
  },
});
