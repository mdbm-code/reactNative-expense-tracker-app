import { StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputCell = ({ defaultValue, keyName, code, selectedValue, style, returnKeyType = 'done', keyboardType = 'decimal-pad', onFocus, inputConfig, onUpdate }) => {
	const [inputValue, setInputValue] = useState(defaultValue);
	const [previousValue, setPreviousValue] = useState(defaultValue);

	function onBlurHandler() {
		if (inputValue === '') {
			if (selectedValue) {
				onUpdate({ cell: keyName, value: selectedValue, old: previousValue }); // Отправляем сообщение наверх только если введено новое значение
				setInputValue(selectedValue); // Возвращаем предыдущее значение
			} else {
				setInputValue(previousValue); // Возвращаем предыдущее значение
			}
		} else {
			onUpdate({ cell: keyName, value: inputValue, old: previousValue }); // Отправляем сообщение наверх только если введено новое значение
		}
	}

	function onFocusHandler() {
		setPreviousValue(inputValue); // Сохраняем предыдущее значение
		setInputValue(''); // Очищаем поле
		onFocus(keyName, code, defaultValue);
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
				onUpdate(inputValue, keyName); // Отправляем сообщение наверх при нажатии Enter
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