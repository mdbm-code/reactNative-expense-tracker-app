import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductsMenuItem from './ProductsMenuItem';


const ProductsMenuList = ({ rows }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={rows}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => <ProductsMenuItem {...itemData.item} rows={rows} />}
			/>
		</View>
	)
}

export default ProductsMenuList

const styles = StyleSheet.create({
	container: {
		paddingBottom: 36,
	},
	title: {
		color: 'white'
	}
});