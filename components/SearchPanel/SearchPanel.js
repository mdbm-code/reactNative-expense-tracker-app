import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import IconButton from '../ui/IconButton';

const SearchPanel = ({ onCancel, onSearch, theme, value, onChangeText }) => {
  // const [searchString, setSearchString] = useState(initialValue);
  // const [slideAnim] = useState(new Animated.Value(-100)); // Начальная позиция панели

  // Анимация появления панели
  // React.useEffect(() => {
  //   Animated.timing(slideAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // }, [slideAnim]);

  return (
    // <Animated.View
    //   style={[styles.searchPanel, { transform: [{ translateY: slideAnim }] }]}
    // >
    <View style={[styles.searchPanel]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Поиск...'
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          viewStyle={{ margin: 0 }}
          name={'search-outline'}
          color={'black'}
          size={24}
          onPress={onSearch}
        />
        <IconButton
          name={'close-outline'}
          color={'black'}
          size={24}
          onPress={onCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchPanel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1, // Занимает оставшееся пространство
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden', // Чтобы округление работало на границах
    backgroundColor: '#fff', // Можно изменять по необходимости
    borderColor: '#ccc', // Цвет рамки
    borderWidth: 1, // Ширина рамки
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff', // Можно изменять по необходимости
    borderColor: '#ccc', // Цвет рамки
    borderWidth: 1, // Ширина рамки
    marginLeft: -1, // Чтобы соединить с полем ввода
  },
  // searchPanel: {
  //   // flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   // height: 60,
  // },
  // animatedSearchPanel: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#fff',
  //   padding: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   zIndex: 1,
  // },
  // inputContainer: {
  //   flex: 3,
  //   // width: '100%',
  // },
  // buttonsContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   borderWidth: 2,
  //   borderColor: '#ccc',
  //   borderTopRightRadius: 10,
  //   borderBottomRightRadius: 10,
  //   paddingLeft: 8,
  // },
  // input: {
  //   flex: 1,
  //   // marginRight: 10,
  //   borderBottomWidth: 1,
  //   borderColor: '#ccc',
  //   backgroundColor: 'green',
  //   borderWidth: 2,
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,
  // },
});

export default SearchPanel;
