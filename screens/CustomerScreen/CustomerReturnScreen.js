import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReturnRow, findAndUpdateReturnRow } from '../../store/redux/slices/currentOrdersSlice';
import { selectReturns } from '../../store/redux/selectors/orders';
import ProductsOutput from '../../components/ManageProductsScreen/ProductsOutput';

const CustomerReturnScreen = () => {
	const dispatch = useDispatch();
	const rows = useSelector(selectReturns);
	const { code: customerCode } = useSelector(
		(state) => state.selecteds?.selectedCustomer
	);

	if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
	if (!typeof customerCode === 'string')
		return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

	function onChangeTextHandler(value) {
		const payload = {
			customerCode: customerCode,
			minSum: minSum,
			productCode: value.code,
			base_price: value.base_price,
			price: value.price,
			qty: value.newValue,
		};
		// console.log('onChangeTextHandler.payload:', payload);
		dispatch(findAndUpdateReturnRow(payload));

		//"base_price": 54.6, "code": "ТД000110", "description": "5-10", "id": "ТД000110", "multiple": 9, "name": "Айран БУДЬ ЗДОРОВ 0,1% 1 л.",
		// "newValue": "5", "oldValue": "", "parentCode": "29", "prices": { "price": "" }, "qty": "", "shortName": "Айран БУДЬ ЗДОРОВ 0, 1 % 1 л.",
		// "specs": [{"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1366E", "value": 53.39}, {"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1128389E", "value": 57}], "unit": "шт"}
	}

	function onLongPressHandler(event) {
		if (deletable) {
			Alert.alert('Удалить?', `Вы хотите удалить элемент: ${event.name}?`, [
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{
					text: 'Удалить',
					onPress: () => {
						dispatch(
							deleteReturnRow({ customerCode, productCode: event?.code })
						);
					},
				},
			]);
		}
	}


	return (
		<View style={[styles.rootContainer]}>
			<ProductsOutput rows={rows} onChangeText={onChangeTextHandler} onLongPress={onLongPressHandler} deletable />
		</View>
	)
}

export default CustomerReturnScreen

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
});
