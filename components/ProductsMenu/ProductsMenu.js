import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'

import { groups } from '../../data/groups';
import ProductsMenuItem from './ProductsMenuItem';

const ProductsMenu = ({ closeDrawer }) => {
	const treeSortedArray = groups
		.filter((item) => !item.parent)
		.sort((a, b) => a.sort - b.sort)
		.map((item) => ({ ...item, children: groups.filter((child) => child.parent === item.id).sort((a, b) => a.sort - b.sort) }));

	return (
		<View style={styles.container}>
			<FlatList
				data={treeSortedArray}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => <ProductsMenuItem {...itemData.item} rows={treeSortedArray} closeDrawer={closeDrawer} />}
			/>
		</View>
	)
}

export default ProductsMenu

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})