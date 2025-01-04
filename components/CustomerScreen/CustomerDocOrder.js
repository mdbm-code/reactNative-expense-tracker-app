import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectOrder } from '../../store/redux/selectors/orders';
import { GlobalStyles } from '../../constans/styles';
import GridTable from '../GridTable';

const CustomerDocOrder = () => {
	const rows = useSelector(selectOrder);
	if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>
	//rows = [{"code": "ТД000109", "name": "Айран БУДЬ ЗДОРОВ 0,1% 0,5 л.", "price": 39.32, "qty": "2", "unit": "шт"}]

	const columns = [
		{ id: 'name', title: 'Наименование', flex: 8, titleStyle: { textAlign: 'left' } },
		{ id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' } },
		{ id: 'qty', title: 'Колво', flex: 2, as: 'input' }
	]

	function onPressHandler(value) {
		console.log(value);

	}
	function onChangeTextHandler(value) {
		console.log(value);
	}

	return (
		<View style={[styles.rootContainer]}>
			<GridTable rows={rows} columns={columns} rowId='code' onPress={onPressHandler} onChangeText={onChangeTextHandler} />
		</View>
	)
}

export default CustomerDocOrder

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
	headerContainer: {
		backgroundColor: GlobalStyles.colors.primary400,
	},
})