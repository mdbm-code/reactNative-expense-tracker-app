import { View, Text, TextInput, StyleSheet } from 'react-native';

// import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  labelStyle,
  inputStyle,
  invalidLabelStyle,
  invalidInputStyle
}) {

  const _labelStyle = [styles.label, !!labelStyle && labelStyle];
  if (isInvalid && invalidLabelStyle) {
    labelStyle.push(invalidLabelStyle);
  }

  const _inputStyle = [styles.input, !!inputStyle && inputStyle];
  if (isInvalid && invalidInputStyle) {
    inputStyle.push(invalidInputStyle);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={_labelStyle}>
        {label}
      </Text>
      <TextInput
        style={_inputStyle}
        // autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    // color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    // backgroundColor: Colors.primary100,
    borderRadius: 8,
    fontSize: 16,
  },
  inputInvalid: {
    // backgroundColor: Colors.error100,
  },
});
