import { Keyboard, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputCell = ({ returnParams = {}, defaultValue, selectedValue, style, returnKeyType = 'done', keyboardType = 'decimal-pad', onFocus, inputConfig, onChangeValue }) => {
	const [inputValue, setInputValue] = useState(defaultValue);
	const [previousValue, setPreviousValue] = useState(defaultValue);

	function onBlurHandler() {
		if (inputValue === '') {
			if (selectedValue) {
				onChangeValue({ ...returnParams, newValue: selectedValue, oldValue: previousValue }); // Отправляем сообщение наверх только если введено новое значение
				setInputValue(selectedValue); // Возвращаем предыдущее значение
			} else {
				setInputValue(previousValue); // Возвращаем предыдущее значение
			}
		} else {
			onChangeValue({ ...returnParams, newValue: inputValue, oldValue: previousValue }); // Отправляем сообщение наверх только если введено новое значение
		}
	}

	function onFocusHandler() {
		setPreviousValue(inputValue); // Сохраняем предыдущее значение
		setInputValue(''); // Очищаем поле
		onFocus(returnParams);
	}

	return (
		<TextInput
			style={[styles.text, styles.numberText, style && style]}
			{...inputConfig}
			value={inputValue}
			// onChangeText={(enteredText) => updateValueHandler(enteredText, 'qty')}
			onChangeText={(enteredText) =>
				setInputValue(enteredText)
			}
			// onFocus={() => setIsActive(true)} // Устанавливаем isActive в true при получении фокуса
			returnKeyType={returnKeyType} //'done', 'go', 'next', 'search', 'send'
			// onBlur={() => updateValueHandler(inputs.qty, 'qty')} // Отправляем сообщение наверх при потере фокуса
			onSubmitEditing={() => {
				onChangeValue({ ...returnParams, newValue: inputValue, oldValue: previousValue }); // Отправляем сообщение наверх при нажатии Enter
				Keyboard.dismiss(); // Скрываем клавиатуру
			}}
			keyboardType={keyboardType}
			onBlur={onBlurHandler}
			onFocus={onFocusHandler}
		/>
	)
}

export default InputCell

const styles = StyleSheet.create({
	numberText: {
		textAlign: 'right',
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
})