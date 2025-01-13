import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const HeaderWithIcons = ({ title, rows }) => {
	// const rows = [
	// 	{
	// 		name: 'options-outline',
	// 		color: theme.style.text.main,
	// 		size: 24,
	// 		onPress: function () { }
	// 	}
	// ]
	return (
		<View style={styles.headerOptions_RootContainer}>
			<Text>{title}</Text>
			<View style={styles.headerOptions_Container}>
				{rows.map((item, index) => (
					<TouchableOpacity key={index} onPress={item.onPress}>
						<Ionicons
							name={item.name}
							size={item.size}
							color={item.color}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

export default HeaderWithIcons

const styles = StyleSheet.create({
	headerOptions_RootContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerOptions_Container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
})