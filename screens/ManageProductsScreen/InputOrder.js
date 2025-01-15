import { StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
import { findAndUpdateOrderRow } from '../../store/redux/slices/currentOrdersSlice';
import { setSelectedProduct } from '../../store/redux/slices/selectedsSlice';

const InputOrder = (props) => {
	const { selectedCustomer, selectedProduct } = useSelector((state) => state.selecteds);
	const theme = useSelector(getThemePalette);
	const [inputValue, setInputValue] = useState(props?.title || '');
	const [previousValue, setPreviousValue] = useState('');
	const dispatch = useDispatch();

	const { style } = props;

	function onBlurHandler() {
		// console.log('onBlurHandler', inputValue);

		const payload = {
			customerCode: selectedCustomer?.code,
			productCode: selectedProduct?.code,
			name: selectedProduct?.name,
			base_price: selectedProduct.base_price,
			price: selectedProduct.price,
			default_price: selectedProduct?.default_price,
			qty: inputValue,
		}
		dispatch(findAndUpdateOrderRow(payload));
		dispatch(setSelectedProduct(null));
	}

	function onFocusHandler() {
		// console.log('onFocusHandler');
		// setPreviousValue(inputValue); // Сохраняем предыдущее значение
		// setInputValue(''); // Очищаем поле
	}


	const onSubmitEditingHandler = () => {
		// console.log('onSubmitEditingHandler вызван');
	};

	// function onSubmitEditingHandler() {
	// 	console.log('onSubmitEditingHandler');


	// 	//сохраняем
	// 	payload = {
	// 		customerCode: selectedCustomer?.code,
	// 		productCode: selectedProduct?.code,
	// 		name: selectedProduct?.name,
	// 		base_price: selectedProduct.base_price,
	// 		price: selectedProduct.price,
	// 		default_price: selectedProduct?.default_price,
	// 		qty: inputValue,
	// 	}
	// 	dispatch(findAndUpdateOrderRow(payload));
	// 	dispatch(setSelectedProduct(null));
	// }


	// let conf = {};
	// if (typeof inputConfig === 'object') {
	// 	conf = inputConfig;
	// }

	return (
		<TextInput
			style={[styles.text, styles.numberText, style && style]}
			// {...conf}
			value={inputValue}
			onChangeText={(enteredText) => setInputValue(enteredText)}
			returnKeyType={'go'} //'done', 'go', 'next', 'search', 'send'
			keyboardType={'numeric'}
			onBlur={onBlurHandler}
			onFocus={onFocusHandler}
			onSubmitEditing={onSubmitEditingHandler}
		/>
	)
}

export default InputOrder

const styles = StyleSheet.create({
	numberText: {
		textAlign: 'right',
	},
	text: {
		fontWeight: 'bold',
		backgroundColor: 'red',
	},
})