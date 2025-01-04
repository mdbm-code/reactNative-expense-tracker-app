import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableRowCell from './TableRowCell';
import { GlobalStyles } from '../../../constans/styles';

const TableHead = ({ onPress, selected, style, columns }) => {

	const titleStyle = [styles.text];
	if (selected) {
		titleStyle.push(styles.selectedText);
	}
	const containerStyle = [styles.rowContainer];
	if (style) {
		containerStyle.push(style);
	}
	if (selected) {
		containerStyle.push(styles.selected);
	}

	if (Array.isArray(columns) && columns.length > 0) {
		return (
			<View style={[...containerStyle]}>
				{columns.map((column, index) => (
					<TableRowCell
						key={index}
						title={column?.title}
						flex={column?.flex}
						titleStyle={[...titleStyle, column?.titleStyle]}
						onPress={column?.onPress}
					/>
				))}
			</View>
		)
	}

	return (<>
		<View style={[...containerStyle, selected && styles.selected]}>
			<TableRowCell
				title={'Наименование'}
				flex={8}
				titleStyle={[...titleStyle, styles.name]}
			/>
			{/* <TableRowCell title={'Ед.'} flex={2} titleStyle={[...titleStyle]} /> */}
			<TableRowCell
				title={'Цена'}
				flex={3}
				titleStyle={[...titleStyle, styles.number]}
			/>
			<TableRowCell
				title={'Колво'}
				flex={2}
				titleStyle={[...titleStyle]}
			/>

		</View>
	</>)
}

export default TableHead

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