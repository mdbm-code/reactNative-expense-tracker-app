import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { GlobalStyles } from '../../../constans/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedMenuLevel_1, setSelectedMenuLevel_2 } from '../../../store/redux/slices/selectedsSlice'
import ProductsMenuButton from './ProductsMenuButton'


const ProductsMenuItem = ({ name, code, rows, closeDrawer }) => {
	const dispatch = useDispatch();
	const { selectedMenuLevel_1, selectedMenuLevel_2 } = useSelector(state => state.selecteds);

	function onPressHandler1(level1code) {
		if (selectedMenuLevel_1 === level1code) {
			dispatch(setSelectedMenuLevel_1(null));
		} else {
			dispatch(setSelectedMenuLevel_1(level1code));
		}
		//всегда сбрасываем выбранный пункт второго уровня, если кликнули на первый уровень 
		dispatch(setSelectedMenuLevel_2(null));
	}

	function onPressHandler2(value) {
		dispatch(setSelectedMenuLevel_2(value));
		closeDrawer();
	}

	let subLevels = [];

	if (selectedMenuLevel_1 === code && Array.isArray(rows)) {
		//если у выбранной группы первого уровня есть дочерние элементы, то формируем из них массив subLevels для вывода
		const parent = rows.find(root => root.code === selectedMenuLevel_1);
		if (parent['children'] && Array.isArray(parent['children']) && parent['children'].length > 0) {
			subLevels = [...parent.children];
		}
	}

	let subLevelContent = null;
	if (Array.isArray(subLevels) && subLevels.length > 0) {
		subLevelContent = <View style={styles.sublevelContainer}>
			<FlatList
				data={subLevels}
				keyExtractor={(item) => item.code}
				renderItem={(itemData) => {
					return <ProductsMenuButton
						title={itemData.item.name}
						selected={selectedMenuLevel_2 === itemData.item.code}
						onPress={() => onPressHandler2(itemData.item.code)} />
				}}
			/>
		</View>
	}

	return (<>
		<ProductsMenuButton
			title={name}
			selected={selectedMenuLevel_1 === code}
			iconName={selectedMenuLevel_1 === code ? 'chevron-up-outline' : 'chevron-down-outline'}
			onPress={() => onPressHandler1(code)} />
		{subLevelContent}
	</>
	)
}

export default ProductsMenuItem

const styles = StyleSheet.create({
	sublevelContainer: {
		flex: 1,
		marginLeft: 12
	},

	container: {
		padding: 8,
		marginVertical: 4,
		backgroundColor: GlobalStyles.colors.primary500,
		flexDirection: 'column',
		// justifyContent: 'space-between',
		borderRadius: 6,

		// //for Androit
		// elevation: 3,

		// //for iOS
		// shadowColor: 'black',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.4,
		// shadowRadius: 4,
	},
	selected: {
		backgroundColor: GlobalStyles.colors.primary800
	},
	firstLineContainer: {
		// flex: 1, // Позволяет тексту занимать доступное пространство
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexShrink: 1,
	},
	icon: {
		flex: 1, // Позволяет тексту занимать доступное пространство
		// justifyContent: 'flex-start',
		color: 'white',
		margin: 0,
		padding: 0,
	},
	pressed: {
		opacity: 0.75,
	},
	textBase: {
		color: GlobalStyles.colors.primary50,
	},

});
