//npm install @reduxjs/toolkit react-redux
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const createDynamicSlice = (name, initialState, customReducers = {}) => {
	return createSlice({
		name,
		initialState,
		reducers: {
			// Стандартные редьюсеры
			addItem: (state, action) => {
				state.items.push(action.payload);
			},
			removeItem: (state, action) => {
				state.items = state.items.filter(item => item.id !== action.payload.id);
			},
			...customReducers, // Кастомные редьюсеры
		},
	});
};

//export default createDynamicSlice;




const rootReducer = combineReducers({});

const store = configureStore({
	reducer: rootReducer,
});


const slicesConfig = [
	{
		name: 'directory1',
		initialState: { items: [] },
		customReducers: {
			updateItem: (state, action) => {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			},
		},
	},
	{
		name: 'directory2',
		initialState: { items: [] },
		customReducers: {},
	},
	// Добавьте другие слайсы по мере необходимости
];


const root = {};

slicesConfig.forEach(config => {
	const slice = createDynamicSlice(config.name, config.initialState, config.customReducers);
	root[config.name] = slice.reducer;
	store.reducerManager.add(config.name, slice.reducer); // Добавьте редьюсер в store
});



const MyComponent = () => {
	const dispatch = useDispatch();
	const items = useSelector(state => state.directory1.items);

	const addItem = (item) => {
		dispatch(directory1Slice.actions.addItem(item));
	};

	return (
		<div>
			{/* Ваш UI */}
		</div>
	);
};



const App = () => {
	return (
		<Provider store={store}>
			<MyComponent />
		</Provider>
	);
};

export default App;