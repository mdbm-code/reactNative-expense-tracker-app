import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'

// import { groups } from '../../data/groups';
import ProductsMenuItem from './ProductsMenuItem';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../store/redux/selectors/groups';
import FallbackText from '../FallbackText';

const ProductsMenu = ({ closeDrawer }) => {
	const groups = useSelector(selectGroups);

	if (typeof groups === 'string') {
		return <FallbackText>{groups}</FallbackText>
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={groups}
				keyExtractor={(item) => item.code}
				renderItem={(itemData) => <ProductsMenuItem {...itemData.item} rows={groups} closeDrawer={closeDrawer} />}
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