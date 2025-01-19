import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../Button';

const Pager = (props) => {
	const {
		minimumValue,
		maximumValue,
		step,
		value,
		containerStyle,
		onValueChange,
		buttonViewStyle,
		buttonViewStyleSelected,
		titleStyle,
		titleStyleSelected
	} = props;
	const arr = [];
	for (let i = minimumValue; i <= maximumValue; i += step) {
		arr.push(i);
	}

	const selectedButtonTitle = [styles.selectedButtonTitle, titleStyleSelected];


	return (
		<View style={[styles.container, containerStyle]} >
			{arr.map((item, index) => {
				return (
					<Button
						key={index}
						style={[buttonViewStyle, item === value && buttonViewStyleSelected]}
						titleStyle={[
							styles.buttonTitle,
							titleStyle,
							item === value && selectedButtonTitle,
						]}
						onPress={() => onValueChange(item)}
					>
						{item}
					</Button>
				);
			})}
		</View>

	)
}

export default Pager

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	buttonTitle: {
		padding: 8,
		borderWidth: 2,
		borderRadius: 8,
		// color: 'black'
	},
	selectedButtonTitle: {

		// borderColor: 'black',
	},
})