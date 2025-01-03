import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

const TextInput = ({ value, keyName, selectedValue, returnKeyType = 'done', keyboardType = 'decimal-pad', onFocus, inputConfig, onUpdate }) => {
	const [inputValue, setInputValue] = useState(value);
	const [previousValue, setPreviousValue] = useState(value);

	function onBlurHandler() {
		if (inputValue === '') {
			if (selectedValue) {
				onUpdate(selectedValue, keyName); // Отправляем сообщение наверх только если введено новое значение
				setInputValue(selectedValue); // Возвращаем предыдущее значение
			} else {
				setInputValue(previousValue); // Возвращаем предыдущее значение
			}
		} else {
			onUpdate(inputValue, keyName); // Отправляем сообщение наверх только если введено новое значение
		}
	}

	function onFocusHandler() {
		setPreviousValue(inputValue); // Сохраняем предыдущее значение
		setInputValue(''); // Очищаем поле
		onFocus();
	}

	return (
		<TextInput
			style={[inputStyles, styles.text, styles.numberText]}
			{...inputConfig}
			value={title}
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

export default TextInput

const styles = StyleSheet.create({})