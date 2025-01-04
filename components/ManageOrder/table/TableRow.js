import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableRowCell from './TableRowCell';
import { GlobalStyles } from '../../../constans/styles';

const TableRow = ({ rowData, onPress, onChangeValue, selected, cells }) => {

	const titleStyle = [styles.text];
	if (selected) {
		titleStyle.push(styles.selectedText);
	}

	if (Array.isArray(cells) && cells.length > 0) {
		return (
			<View style={[styles.rowContainer, selected && styles.selected]}>
				{cells.map((cell, index) => (
					<TableRowCell
						key={index}
						title={cell?.title}
						flex={cell?.flex}
						titleStyle={[...titleStyle, cell?.titleStyle]}
						selected={cell?.selected}
						as={cell?.as}
						returnParams={cell?.returnParams}
						onPress={cell?.onPress}
						onChangeValue={cell?.onChangeValue}
					/>
				))}
			</View>
		)
	}

	return (<>
		<View style={[styles.rowContainer, selected && styles.selected]}>
			<TableRowCell
				title={rowData.name}
				flex={8}
				titleStyle={[...titleStyle, styles.name]}
				returnParams={{ field: 'name', productCode: rowData.code }}
				onPress={onPress} />
			{/* <TableRowCell title={rowData.unit} flex={2} titleStyle={[...titleStyle]} /> */}
			<TableRowCell
				title={rowData?.prices?.price}
				flex={3}
				titleStyle={[...titleStyle, styles.number]}
				returnParams={{ field: 'price', productCode: rowData.code, price: rowData?.prices?.price }}
				onPress={onPress} />
			<TableRowCell
				title={rowData?.qty}
				flex={2}
				titleStyle={[...titleStyle]}
				as={'input'}
				returnParams={{ field: 'qty', productCode: rowData.code, price: rowData?.prices?.price }}
				onPress={onPress}
				onChangeValue={onChangeValue}
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