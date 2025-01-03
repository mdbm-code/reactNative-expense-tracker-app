import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableRowCell from './TableRowCell';
import { GlobalStyles } from '../../../constans/styles';

const TableRow = ({ rowData, style, onPress, as, onUpdateValue, selected }) => {

	const titleStyle = [styles.text];
	if (selected) {
		titleStyle.push(styles.selectedText);
	}
	return (<>
		<View style={[styles.rowContainer, selected && styles.selected]}>
			<TableRowCell
				title={rowData.name}
				flex={8}
				titleStyle={[...titleStyle, styles.name]}
				onPress={() => onPress('name', rowData.code)} />
			{/* <TableRowCell title={rowData.unit} flex={2} titleStyle={[...titleStyle]} /> */}
			<TableRowCell
				title={rowData?.prices?.price}
				flex={3}
				titleStyle={[...titleStyle, styles.number]}
				onPress={() => onPress('price', rowData.code, rowData['price'])} />
			<TableRowCell
				title={rowData?.qty}
				flex={2}
				titleStyle={[...titleStyle]}
				as={'input'}
				keyName={'qty'}
				code={rowData.code}
				onPress={onPress}
				onUpdateValue={onUpdateValue}
			/>

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