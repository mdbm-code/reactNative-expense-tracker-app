import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableRowCell from './TableRowCell';
import { GlobalStyles } from '../../../constans/styles';

const TableRow = ({ rowData, style, onPress, selected }) => {

	const titleStyle = [styles.text];
	if (selected) {
		titleStyle.push(styles.selectedText);
	}
	return (<>
		<View style={[styles.rowContainer, selected && styles.selected]}>
			<TableRowCell title={rowData.name} flex={8} titleStyle={[...titleStyle, styles.name]} onPress={() => onPress('name', rowData.code)} />
			{/* <View style={[...rowCell, styles.nameContainer]}>
				<Pressable
					android_ripple={true}
					onPress={() => pressCellHandler('name')}
					style={({ pressed }) => pressed && styles.pressed}
				>
					<Text style={[...textCell, ...nameText]}>{rowData.name}</Text>
				</Pressable>
			</View> */}

			{/* <TableRowCell title={rowData.unit} flex={2} titleStyle={[...titleStyle]} /> */}

			{/* <View style={[...rowCell, styles.unitContainer]}>
				<Text style={[...textCell]}>{rowData.unit}</Text>
			</View> */}
			<TableRowCell title={rowData?.prices?.price} flex={3} titleStyle={[...titleStyle, styles.number]} onPress={() => onPress('price', rowData.code, rowData['price'])} />
			{/* <View style={[...rowCell, styles.priceContainer]}>
				<Pressable onPress={() => pressCellHandler('price')}>
					<Text style={[...textCell, styles.numberText, ...priceText]}>
						{rowData['price']}
					</Text>
				</Pressable>
			</View> */}
			<TableRowCell title={rowData?.qty} flex={2} titleStyle={[...titleStyle]} />
			{/* <View style={[...rowCell, styles.qtyContainer]}>
				<TextInput
					style={[inputStyles, ...textCell, styles.numberText]}
					{...inputConfig}
					value={inputs.qty}
					// onChangeText={(enteredText) => updateValueHandler(enteredText, 'qty')}
					onChangeText={(enteredText) =>
						setInputs((prevState) => ({ ...prevState, qty: enteredText }))
					}
					// onFocus={() => setIsActive(true)} // Устанавливаем isActive в true при получении фокуса
					returnKeyType='done' //'done', 'go', 'next', 'search', 'send'
					// onBlur={() => updateValueHandler(inputs.qty, 'qty')} // Отправляем сообщение наверх при потере фокуса
					onSubmitEditing={() => {
						updateValueHandler(inputs.qty, 'qty'); // Отправляем сообщение наверх при нажатии Enter
						Keyboard.dismiss(); // Скрываем клавиатуру
					}}
					keyboardType='decimal-pad'
					onBlur={onBlurQtyInputHandler}
					onFocus={onFocusQtyInputHandler}
				/>
			</View> */}
		</View>
	</>)
}

export default TableRow

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: GlobalStyles.colors.primary100
	},
	rowCell: {
		flex: 1,
		borderWidth: 0.2,
		borderColor: GlobalStyles.colors.primary100,
		paddingHorizontal: 4,
		justifyContent: 'center',
		minHeight: 36,
	},
	text: {
		color: 'white',
	},
	selectedText: {
		color: 'black',
	},
	name: {
		textAlign: 'left',
	},
	number: {
		textAlign: 'right',
	},
	selected: {
		backgroundColor: GlobalStyles.colors.primary50,
	}
})