import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FallbackText from '../FallbackText'
import OrderTable from '../ManageOrder/OrderTable'
import Table from '../ManageOrder/table/Table'

const ProductsOutput = ({ products }) => {

	if (typeof products === 'string') {
		return <FallbackText>{products}</FallbackText>
	}

	function renderItem({ item }) {
		return <Text style={styles.text}>{item.name}</Text>
	}

	function onPressHandler(event) {
		console.log(event)
	}

	function onUpdateHandler(event) {
		console.log(event)
	}

	return (
		<View style={styles.container}>
			{/* <Text style={styles.text}>Component ProductsOutput</Text> */}
			<Table
				header={{
					name: 'Наименование товара',
					unit: 'ед.',
					price: 'Цена',
					qty: 'Кол',
				}}
				rows={products}
				keyName={'code'}
				onPress={onPressHandler}
				fallbackText={'fallbackText'}
				onUpdateValue={onUpdateHandler}
			/>
		</View>
	)
}

export default ProductsOutput

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	text: {
		color: 'white',
	}
})