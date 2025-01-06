import React, { useState } from 'react';
import { TextInput, StyleSheet, Animated } from 'react-native';
import IconButton from '../ui/IconButton';

const SearchPanel = ({ onCancel, onSearch }) => {
  const [searchString, setSearchString] = useState('');
  const [slideAnim] = useState(new Animated.Value(-100)); // Начальная позиция панели

  // Анимация появления панели
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={[styles.searchPanel, { transform: [{ translateY: slideAnim }] }]}
    >
      <TextInput
        style={styles.input}
        placeholder='Поиск...'
        value={searchString}
        onChangeText={setSearchString}
      />
      <IconButton
        viewStyle={{ margin: 0 }}
        name={'search-outline'}
        size={24}
        onPress={() => {
          onSearch(searchString);
        }}
      />
      <IconButton
        name={'close-outline'}
        size={24}
        onPress={() => {
          onCancel();
        }}
      />

      {/* <Button
        title='Отмена'
        onPress={() => {
          onCancel();
          setSearchString('');
        }}
      />
      <Button title='Поиск' onPress={() => onSearch(searchString)} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default SearchPanel;
