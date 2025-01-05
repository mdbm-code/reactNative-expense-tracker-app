import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectOrder } from '../../store/redux/selectors/orders';
import ProductsOutput from '../ManageProductsScreen/ProductsOutput';

const CustomerDocOrder = () => {
	const rows = useSelector(selectOrder);
	if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>
	return (
		<View style={[styles.rootContainer]}>
			<ProductsOutput rows={rows} />
		</View>
	)
}

export default CustomerDocOrder

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
})