import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';

const Button = ({ children, onPress, mode, style, titleStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.button, mode === 'flat' && styles.flat, style]}>
        <Text style={[styles.buttonText, titleStyle, mode === 'flat' && styles.flatText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    // backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    // backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
