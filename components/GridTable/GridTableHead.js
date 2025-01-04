import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableRowCell from '../ManageOrder/table/TableRowCell';
import { GlobalStyles } from '../../constans/styles';
import FallbackText from '../FallbackText';

const GridTableHead = ({ onPress, selected, style, columns }) => {

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

export default GridTableHead;

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: GlobalStyles.colors.primary100
	},
	text: {
		color: 'white',
	},
	selectedText: {
		color: 'black',
	},
	selected: {
		backgroundColor: GlobalStyles.colors.primary50,
	}
})