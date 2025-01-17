import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

const CustomTextInput = ({
  autoFocus,
  inputStyle,
  initialValue,
  onBlur = () => {},
  onSubmitEditing = () => {},
  onValueChange = () => {},
}) => {
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    onBlur(value); // Отправляем значение наверх
  };

  const handleSubmitEditing = () => {
    onSubmitEditing(value); // Отправляем значение при нажатии "Done"
  };

  const handleChangeText = (text) => {
    setValue(text);
    // if (!ignoreInput) {
    //   setValue(text); // Обновляем внутреннее состояние только если не игнорируем
    // }
    onValueChange(text);
  };

  // console.log('autofocus', autofocus, 'value', value);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Для iOS используем padding, для Android height
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Увеличьте значение по необходимости для iOS
    >
      <TextInput
        autoFocus={autoFocus}
        style={inputStyle}
        value={value}
        onChangeText={handleChangeText} // Обновляем внутреннее состояние
        onBlur={handleBlur} // Сохраняем значение при потере фокуса
        onSubmitEditing={handleSubmitEditing} // Сохраняем значение при нажатии "Done"
        returnKeyType='done' // Устанавливаем тип клавиши "Done"
        // keyboardType='decimal-pad' // Устанавливаем тип клавиатуры numeric
        keyboardType='numeric' // Устанавливаем тип клавиатуры numeric
        // autoFocus // Автоматически устанавливаем фокус
      />
    </KeyboardAvoidingView>
  );
};

const TableCell = ({
  autoFocus,
  as,
  onSubmitEditing,
  onBlur,
  onValueChange,
  titleStyle,
  selected,
  inputStyle,
  children,
  prefix,
  postfix,
}) => {
  const _titleStyle = [styles.text];
  if (titleStyle) {
    _titleStyle.push(titleStyle);
  }
  if (selected) {
    _titleStyle.push(styles.selectedText);
  }

  if (as === 'input') {
    return (
      <CustomTextInput
        autoFocus={autoFocus}
        inputStyle={inputStyle}
        initialValue={children}
        onValueChange={onValueChange}
        onBlur={onBlur} // Передаем функцию для сохранения значения
        onSubmitEditing={onSubmitEditing} // Передаем функцию для сохранения значения при нажатии "Done"
      />
    );
  } else {
    return (
      <View style={styles.titleContainer}>
        {!!prefix && prefix}
        <Text style={_titleStyle}>{children}</Text>
        {!!postfix && postfix}
      </View>
    );
  }
};

export default TableCell;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    // textAlign: 'center',
  },
  selectedText: {
    // fontWeight: 'bold',
  },
});
