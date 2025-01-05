import { StyleSheet, View } from 'react-native'
import React from 'react'
import FallbackText from '../../FallbackText'
// import OrderTable from '../../ManageOrder/OrderTable'
// import Table from '../../ManageOrder/table/Table'
// import { selectProducts } from '../../../store/redux/selectors/products'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStyles } from '../../../constans/styles'
import GridTable from '../../GridTable'
import { findAndUpdateOrderRow } from '../../../store/redux/slices/currentOrdersSlice'

const ProductsOutput = ({ rows }) => {

	const dispatch = useDispatch();

	// const rows = useSelector(selectProducts);
	const { code: customerCode, minSum } = useSelector(state => state.selecteds?.selectedCustomer);
	if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>
	if (!typeof customerCode === 'string') return <FallbackText>{'Покупатель не выбран'}</FallbackText>

	const columns = [
		{ id: 'name', title: 'Наименование', flex: 8, titleStyle: { textAlign: 'left' } },
		{ id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' } },
		{ id: 'qty', title: 'Колво', flex: 2, as: 'input' }
	]

	function onPressHandler(event) {
		console.log(event)
	}

	function onUpdateHandler(event) {
		console.log(event)
	}

	function onChangeTextHandler(value) {

		const payload = {
			customerCode: customerCode,
			minSum: minSum,
			productCode: value.code,
			base_price: value.base_price,
			price: value.price,
			qty: value.newValue
		}
		console.log('onChangeTextHandler.payload:', payload);
		dispatch(findAndUpdateOrderRow(payload));

		//"base_price": 54.6, "code": "ТД000110", "description": "5-10", "id": "ТД000110", "multiple": 9, "name": "Айран БУДЬ ЗДОРОВ 0,1% 1 л.", 
		// "newValue": "5", "oldValue": "", "parentCode": "29", "prices": { "price": "" }, "qty": "", "shortName": "Айран БУДЬ ЗДОРОВ 0, 1 % 1 л.", 
		// "specs": [{"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1366E", "value": 53.39}, {"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1128389E", "value": 57}], "unit": "шт"}
	}

	// console.log('rows:', rows);


	return (
		<View style={styles.rootContainer}>
			{/* <Text style={styles.text}>Component ProductsOutput</Text> */}
			<GridTable rows={rows} columns={columns} rowId='code' onPress={onPressHandler} onChangeText={onChangeTextHandler} />
			{/* <Table
				header={{
					name: 'Наименование товара',
					unit: 'ед.',
					price: 'Цена',
					qty: 'Кол',
				}}
				rows={rows}
				keyName={'code'}
				onPress={onPressHandler}
				fallbackText={'fallbackText'}
				onUpdateValue={onUpdateHandler}
			/> */}
		</View>
	)
}

export default ProductsOutput

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1
	},
	headerContainer: {
		backgroundColor: GlobalStyles.colors.primary400,
	},
	text: {
		color: 'white',
	}
})