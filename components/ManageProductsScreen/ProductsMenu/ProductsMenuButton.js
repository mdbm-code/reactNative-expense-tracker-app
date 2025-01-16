import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IconButton from '../../ui/IconButton';
import { GlobalStyles } from '../../../constans/styles';
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
}) => {
  const containerStyles = [styles.container];
  if (selected && level === 2) {
    containerStyles.push(styles.selected);
    if (selectedStyle?.backgroundColor) {
      containerStyles.push({ backgroundColor: selectedStyle?.backgroundColor });
    }
  }

  const _titleStyles = [
    styles[`title${level}`],
    { color: theme.style.customerList.title },
  ];
  let iconColor = theme.style.customerList.title;
  if (selected && level === 2) {
    if (selectedStyle?.color) {
      iconColor = theme.style.customerList.title;
      _titleStyles.push({ color: selectedStyle?.color });
    }
    if (selectedStyle?.fontWeight) {
      _titleStyles.push({ fontWeight: selectedStyle?.fontWeight });
    }
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
          {iconName && <Ionicons name={iconName} size={18} color={iconColor} />}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductsMenuButton;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
    marginVertical: 4,
    // backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // borderRadius: 6,

    // //for Androit
    // elevation: 3,

    // //for iOS
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
  },
  selected: {
    // paddingHorizontal: 0, // Убираем горизонтальные отступы
    // marginVertical: 8,
    // paddingVertical: 6, // Задайте нужный вертикальный padding
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 8,
    // backgroundColor: 'blue'
  },
  firstLineContainer: {
    // flex: 1, // Позволяет тексту занимать доступное пространство
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  icon: {
    flex: 1, // Позволяет тексту занимать доступное пространство
    // justifyContent: 'flex-start',
    // color: 'white',
    margin: 0,
    padding: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  title1: {
    // color: GlobalStyles.colors.primary50,
    paddingLeft: 10,
  },
  title2: {
    // color: GlobalStyles.colors.primary50,
    paddingLeft: 30,
  },
});
