const s1 = 'react-native-picker-select';
//************************************************* */
// npm install react - native - picker - select
//
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

// const Select_react_native_picker_select = () => {
// 	const [selectedValue, setSelectedValue] = useState(null);

// 	return (
// 		<View style={styles1.container}>
// 			<RNPickerSelect
// 				onValueChange={(value) => setSelectedValue(value)}
// 				items={[
// 					{ label: 'Option 1', value: 'option1' },
// 					{ label: 'Option 2', value: 'option2' },
// 					{ label: 'Option 3', value: 'option3' },
// 				]}
// 				placeholder={{ label: 'Select an option...', value: null }}
// 				style={pickerSelectStyles}
// 			/>
// 		</View>
// 	);
// };

// Популярные опции:

// items: Список элементов для выбора.
// onValueChange: Функция, вызываемая при изменении значения.
// placeholder: Текст - заполнитель для пустого значения.
// style: Стилизация компонента.
// value: Текущее выбранное значение.
// useNativeAndroidPickerStyle: Использовать ли нативный стиль на Android.
// doneText: Текст кнопки "Готово" на iOS.
// disabled: Отключение компонента.
// Icon: Кастомная иконка для раскрытия списка.
// onOpen: Функция, вызываемая при открытии списка.

// const styles1 = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		padding: 20,
// 	},
// });

// const pickerSelectStyles = StyleSheet.create({
// 	inputIOS: {
// 		fontSize: 16,
// 		paddingVertical: 12,
// 		paddingHorizontal: 10,
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 4,
// 		color: 'black',
// 		paddingRight: 30,
// 	},
// 	inputAndroid: {
// 		fontSize: 16,
// 		paddingHorizontal: 10,
// 		paddingVertical: 8,
// 		borderWidth: 0.5,
// 		borderColor: 'gray',
// 		borderRadius: 8,
// 		color: 'black',
// 		paddingRight: 30,
// 	},
// });


const s2 = 'react-native-dropdown-picker';

// import DropDownPicker from 'react-native-dropdown-picker';

// const Select_react_native_dropdown_picker = () => {
// 	const [open, setOpen] = useState(false);
// 	const [value, setValue] = useState(null);
// 	const [items, setItems] = useState([
// 		{ label: 'Option 1', value: 'option1' },
// 		{ label: 'Option 2', value: 'option2' },
// 		{ label: 'Option 3', value: 'option3' },
// 	]);

// 	return (
// 		<View style={styles.container}>
// 			<DropDownPicker
// 				open={open}
// 				value={value}
// 				items={items}
// 				setOpen={setOpen}
// 				setValue={setValue}
// 				setItems={setItems}
// 				placeholder="Select an option"
// 				style={styles.dropdown}
// 			/>
// 		</View>
// 	);
// };

//Популярные опции:
// open: Состояние открытия / закрытия списка.
// value: Текущее выбранное значение.
// items: Список элементов для выбора.
// setOpen: Функция для управления состоянием открытия.
// setValue: Функция для управления выбранным значением.
// setItems: Функция для управления списком элементов.
// placeholder: Текст - заполнитель.
// style: Стилизация компонента.
// disabled: Отключение компонента.
// zIndex: Уровень наложения для управления перекрытием.

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		padding: 20,
// 	},
// 	dropdown: {
// 		borderColor: 'gray',
// 		borderWidth: 1,
// 		borderRadius: 4,
// 	},
// });

const s3 = '@react-native-picker/picker';
// //Это официальный пакет для реализации нативного компонента выбора.
// //npm install @react-native-picker/picker
// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const App = () => {
// 	const [selectedValue, setSelectedValue] = useState('option1');

// 	return (
// 		<View style={styles.container}>
// 			<Picker
// 				selectedValue={selectedValue}
// 				onValueChange={(itemValue) => setSelectedValue(itemValue)}
// 				style={styles.picker}
// 			>
// 				<Picker.Item label="Option 1" value="option1" />
// 				<Picker.Item label="Option 2" value="option2" />
// 				<Picker.Item label="Option 3" value="option3" />
// 			</Picker>
// 		</View>
// 	);
// };

// // Популярные опции:

// // selectedValue: Текущее выбранное значение.
// // onValueChange: Функция, вызываемая при изменении значения.
// // style: Стилизация компонента.
// // enabled: Включение / отключение компонента.
// // mode: Режим отображения(dropdown / dialog).
// // prompt: Текст заголовка для диалогового режима(только Android).
// // dropdownIconColor: Цвет иконки раскрытия списка.
// // testID: Идентификатор для тестирования.
// // itemStyle: Стилизация элементов списка.
// // numberOfLines: Количество строк для отображения текста элемента.

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		padding: 20,
// 	},
// 	picker: {
// 		height: 50,
// 		width: '100%',
// 	},
// });


const _3 = 'eact-native-modal-dropdown';
// // Этот пакет предоставляет модальное окно для выбора значений.
// // npm install react - native - modal - dropdown


// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import ModalDropdown from 'react-native-modal-dropdown';

// const App = () => {
// 	const [selectedValue, setSelectedValue] = useState(null);

// 	return (
// 		<View style={styles.container}>
// 			<ModalDropdown
// 				options={['Option 1', 'Option 2', 'Option 3']}
// 				onSelect={(index, value) => setSelectedValue(value)}
// 				defaultValue="Select an option"
// 				style={styles.dropdown}
// 				textStyle={styles.text}
// 			/>
// 		</View>
// 	);
// };


// // Популярные опции:

// // options: Список элементов для выбора.
// // onSelect: Функция, вызываемая при выборе элемента.
// // defaultValue: Значение по умолчанию.
// // style: Стилизация компонента.
// // textStyle: Стилизация текста.
// // dropdownStyle: Стилизация выпадающего списка.
// // disabled: Отключение компонента.
// // animated: Включение анимации.
// // showsVerticalScrollIndicator: Отображение вертикального скролла.
// // renderRow: Кастомизация элементов списка.

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		padding: 20,
// 	},
// 	dropdown: {
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 4,
// 		padding: 10,
// 	},
// 	text: {
// 		fontSize: 16,
// 	},
// });