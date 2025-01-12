import { Keyboard, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const InputCellSimple = ({
	onChangeText,
	value,
	style
	// returnParams = {},
	// defaultValue,
	// selectedValue,
	// style,
	// returnKeyType = 'done',
	// keyboardType = 'decimal-pad',
	// onFocus, inputConfig,
	// onChangeValue
}) => {
	// const [inputValue, setInputValue] = useState(defaultValue);
	// const [previousValue, setPreviousValue] = useState(defaultValue);


	// useEffect(() => {
	// 	if (inputValue !== defaultValue) {
	// 		setInputValue(defaultValue);
	// 	}
	// }, [defaultValue]);

	// function onBlurHandler() {
	// 	if (typeof onChangeText === 'function') {
	// 		if (inputValue === '') {
	// 			setInputValue(previousValue); // Возвращаем предыдущее значение
	// 		} else {
	// 			onChangeText(inputValue);
	// 		}
	// 	}

	// 	if (typeof onChangeValue === 'function') {
	// 		if (inputValue === '') {
	// 			if (selectedValue) {
	// 				onChangeValue({ ...returnParams, newValue: selectedValue, oldValue: previousValue }); // Отправляем сообщение наверх только если введено новое значение
	// 				setInputValue(selectedValue); // Возвращаем предыдущее значение
	// 			} else {
	// 				setInputValue(previousValue); // Возвращаем предыдущее значение
	// 			}
	// 		} else {
	// 			onChangeValue({ ...returnParams, newValue: inputValue, oldValue: previousValue }); // Отправляем сообщение наверх только если введено новое значение
	// 		}
	// 	}
	// }

	// function onFocusHandler() {
	// 	setPreviousValue(inputValue); // Сохраняем предыдущее значение
	// 	setInputValue(''); // Очищаем поле
	// 	onFocus(returnParams);
	// }

	// function onSubmitEditingHandler() {
	// 	if (typeof onChangeText === 'function') {
	// 		onChangeText(inputValue);
	// 	}
	// 	if (typeof onChangeValue === 'function') {
	// 		onChangeValue({ ...returnParams, newValue: inputValue, oldValue: previousValue });
	// 	}
	// 	Keyboard.dismiss();
	// }

	return (
		<TextInput
			style={[styles.text, styles.numberText, style && style]}
			// {...inputConfig}
			value={value}
			onChangeText={(enteredText) => onChangeText(enteredText)}
		// returnKeyType={returnKeyType} //'done', 'go', 'next', 'search', 'send'
		// keyboardType={keyboardType}
		// onBlur={onBlurHandler}
		// onFocus={onFocusHandler}
		// onSubmitEditing={onSubmitEditingHandler}
		/>
	)
}

export default InputCellSimple

const styles = StyleSheet.create({
	numberText: {
		textAlign: 'right',
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
})