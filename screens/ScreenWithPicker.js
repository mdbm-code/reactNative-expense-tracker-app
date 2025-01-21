import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { getTheme } from '../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
import Tally from '../components/Tally';

const ScreenWithPicker = ({
  onSwipe,
  component,
  rows,
  value,
  onSelect,
  children,
  title,
  footerContent,
}) => {
  const theme = useSelector(getTheme);
  const [isPickerVisible, setIsPickerVisible] = useState(false);


  const handleValueChange = (item) => {
    onSelect(item); // Устанавливаем новое значение
    setIsPickerVisible(false); // Закрываем Picker
  };

  const renderOption = ({ item }) => {
    // const { label, value } = Object.values(item)[0];

    return <TouchableOpacity
      style={styles.option}
      onPress={() => handleValueChange(item)} // Устанавливаем выбранное значение
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  };


  const selectedLabel = rows.find((item) => item.value === value)?.label;


  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <Tally color={theme.style.nav.bg} bg={theme.style.bg}>
        {component ? (
          component
        ) : (<TouchableOpacity
          style={styles.selectionField}
          onPress={() => setIsPickerVisible(true)} // Открываем Picker при нажатии
        >
          <Text style={styles.selectionText}>{selectedLabel}</Text>
        </TouchableOpacity>)}
      </Tally>
      {title && <Text style={styles.infoText}>{title}</Text>}
      {children}
      {/* Модальное окно с Picker */}
      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)} // Закрываем Picker при нажатии назад
      >
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={styles.modalContainer}>
            {/* <View style={styles.pickerContainer}> */}
            <View style={styles.listContainer}>
              <FlatList
                data={rows} // Передаем список опций
                keyExtractor={(item, index) => index.toString()} // Уникальный ключ для каждого элемента
                renderItem={renderOption} // Рендерим каждый элемент списка
              />
              {footerContent && <TouchableOpacity
                style={styles.option}
                onPress={() => handleValueChange(item)} // Устанавливаем выбранное значение
              >
                {footerContent}
              </TouchableOpacity>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ScreenWithPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    minHeight: 30,
  },

  selectionField: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Размещаем модальное окно внизу экрана
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
  },
  listContainer: {
    height: '50%', // Высота модального окна — 50% экрана
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },







  selectionField: {
    // width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Размещаем модальное окно внизу экрана
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
  },
  pickerContainer: {
    height: '50%', // Высота модального окна — 50% экрана
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
