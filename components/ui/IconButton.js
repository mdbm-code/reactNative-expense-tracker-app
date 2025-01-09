import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({
  name,
  size,
  color,
  onPress,
  style,
  viewStyle,
  title,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? [styles.pressed, style] : style)}
    >
      <View style={[styles.buttonContainer, viewStyle]}>
        <Ionicons name={name} size={size} color={color} />
        {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
});
