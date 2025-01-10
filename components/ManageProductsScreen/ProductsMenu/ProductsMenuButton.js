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
}) => {
  const backgroundColor = {
    1: theme.bg.light,
    2: 'white',
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View
        style={[
          styles.container,
          selected && styles.selected,
          { backgroundColor: backgroundColor[level] },
        ]}
      >
        <View style={styles.firstLineContainer}>
          <Text style={[styles.title, { color: 'black' }]}>{title}</Text>
          {iconName && <Ionicons name={iconName} size={24} color={'black'} />}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductsMenuButton;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 8,
    marginVertical: 4,
    // backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    borderRadius: 6,

    // //for Androit
    // elevation: 3,

    // //for iOS
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
  },
  selected: {
    // backgroundColor: GlobalStyles.colors.primary800,
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
  title: {
    // color: GlobalStyles.colors.primary50,
  },
});
