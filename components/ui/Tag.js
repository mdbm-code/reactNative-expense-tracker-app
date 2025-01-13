import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


import Tag from './Tag'; // Путь к вашему компоненту Tag

// Пример использования:
// const App = () => {
// 	const palette = {
// 		p: { color: 'red', backgroundColor: 'green' },
// 		h1: { color: 'black', backgroundColor: 'white' },
// 		h2: { color: 'blue', backgroundColor: 'yellow' },
// 		h3: { color: 'purple', backgroundColor: 'orange' },
// 		h4: { color: 'brown', backgroundColor: 'pink' },
// 		h5: { color: 'gray', backgroundColor: 'lightblue' },
// 	};

// 	return (
// 		<SafeAreaView>
// 			<Tag palette={palette}>
// 				<Tag.H1>Заголовок</Tag.H1>
// 				<Tag.P>Это параграф текста.</Tag.P>
// 				<Tag.Hr />
// 				<Tag.Center>Центрированный текст</Tag.Center>
// 				<Tag.HStack>
// 					<Tag.H2>Горизонтальный стек 1</Tag.H2>
// 					<Tag.H2>Горизонтальный стек 2</Tag.H2>
// 				</Tag.HStack>
// 				<Tag.VStack>
// 					<Tag.H3>Вертикальный стек 1</Tag.H3>
// 					<Tag.H3>Вертикальный стек 2</Tag.H3>
// 				</Tag.VStack>
// 			</Tag>
// 		</SafeAreaView>
// 	);
// };




const Tag = ({ palette, children }) => {
	return <View>{children}</View>;
};


// Что такое createStyledComponent ?
// Это функция, которая принимает два аргумента:
// tag - тег компонента(в данном случае, это не используется, но его можно использовать для создания различных компонентов).
// style - стили, которые будут применены к компоненту.
// Функция возвращает новый компонент, который принимает children(дочерние элементы) и отображает их внутри компонента Text с применением стилей.
// Как это работает ?
// Создание компонента: Вызывая createStyledComponent, вы создаете новый компонент, который можно использовать в вашем приложении.
// Применение стилей: Новый компонент будет применять как стандартные стили(styles.defaultText), так и переданные стили(style).
const createStyledComponent = (tag, style) => {
	return ({ children }) => {
		return (
			<Text style={[styles.defaultText, style]}>
				{children}
			</Text>
		);
	};
};

Tag.P = createStyledComponent('p', (palette) => ({
	color: palette.p.color,
	backgroundColor: palette.p.backgroundColor,
}));

Tag.H1 = createStyledComponent('h1', (palette) => ({
	fontSize: 32,
	fontWeight: 'bold',
	color: palette.h1.color,
	backgroundColor: palette.h1.backgroundColor,
}));

Tag.H2 = createStyledComponent('h2', (palette) => ({
	fontSize: 28,
	fontWeight: 'bold',
	color: palette.h2.color,
	backgroundColor: palette.h2.backgroundColor,
}));

Tag.H3 = createStyledComponent('h3', (palette) => ({
	fontSize: 24,
	fontWeight: 'bold',
	color: palette.h3.color,
	backgroundColor: palette.h3.backgroundColor,
}));

Tag.H4 = createStyledComponent('h4', (palette) => ({
	fontSize: 20,
	fontWeight: 'bold',
	color: palette.h4.color,
	backgroundColor: palette.h4.backgroundColor,
}));

Tag.H5 = createStyledComponent('h5', (palette) => ({
	fontSize: 16,
	fontWeight: 'bold',
	color: palette.h5.color,
	backgroundColor: palette.h5.backgroundColor,
}));

Tag.Strong = createStyledComponent('strong', {
	fontWeight: 'bold',
});

Tag.B = createStyledComponent('b', {
	fontWeight: 'bold',
});

Tag.Center = ({ children }) => {
	return (
		<View style={styles.center}>
			<Text>{children}</Text>
		</View>
	);
};

Tag.HStack = ({ children }) => {
	return <View style={styles.hStack}>{children}</View>;
};

Tag.VStack = ({ children }) => {
	return <View style={styles.vStack}>{children}</View>;
};

Tag.Hr = () => {
	return <View style={styles.hr} />;
};

const styles = StyleSheet.create({
	defaultText: {
		margin: 5,
	},
	center: {
		alignItems: 'center',
	},
	hStack: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	vStack: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	hr: {
		height: 1,
		backgroundColor: 'black',
		marginVertical: 10,
	},
});

export default Tag;