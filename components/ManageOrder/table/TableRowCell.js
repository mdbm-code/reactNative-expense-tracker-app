import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constans/styles'
import InputCell from '../../ui/InputCell'

const TableRowCell = ({ onPress, title, code, style, titleStyle, inputConfig, onUpdateValue, as, keyName, flex = 1 }) => {

	let content = <Text style={[styles.text, titleStyle && titleStyle]}>{title}</Text>

	if (as === 'input') {
		content = <InputCell
			style={[styles.text, styles.numberText, titleStyle && titleStyle]}
			{...inputConfig}
			defaultValue={title}
			onUpdate={onUpdateValue}
			onFocus={onPress}
			keyName={keyName}
			code={code}
		/>

	} else if (typeof onPress === 'function') {
		content = <Pressable
			// android_ripple={true}
			onPress={onPress}
		// style={({ pressed }) => pressed && styles.pressed}
		>
			<Text style={[styles.text, titleStyle && titleStyle]}>{title}</Text>
		</Pressable>
	}

	const rowCell = [styles.rowCell];
	if (flex) {
		rowCell.push(styles[`flex${flex}`]);
	}

	return (
		<View style={[...rowCell, style && style]}>
			{content}
		</View>
	)
}

export default TableRowCell

const styles = StyleSheet.create({
	rowCell: {
		flex: 1,
		borderWidth: 0.2,
		borderColor: GlobalStyles.colors.primary100,
		paddingHorizontal: 4,
		justifyContent: 'center',
		minHeight: 36,
	},
	pressed: {
		opacity: 0.75,
	},
	text: {
		color: 'white',
		textAlign: 'center',
	},
	numberText: {
		textAlign: 'right',
	},
	flex1: { flex: 1 },
	flex2: { flex: 2 },
	flex3: { flex: 3 },
	flex4: { flex: 4 },
	flex5: { flex: 5 },
	flex6: { flex: 6 },
	flex7: { flex: 7 },
	flex8: { flex: 8 },
	flex9: { flex: 9 },
	flex10: { flex: 10 },
	flex11: { flex: 11 },
	flex12: { flex: 12 },
})