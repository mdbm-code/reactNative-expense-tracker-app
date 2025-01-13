import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ThemeScreen from './ThemeScreen';
import IconButton from '../components/ui/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  selectProductSales,
} from '../store/redux/selectors/products';
import { setSelectedProduct } from '../store/redux/slices/selectedsSlice';
import { findAndUpdateOrderRow } from '../store/redux/slices/currentOrdersSlice';
import InputHelper from '../components/ManageProductsScreen/InputHelper';
import { getThemePalette } from '../store/redux/selectors/theme';

const CustomTextInput = ({
  initialValue,
  onBlur = () => {},
  onSubmitEditing = () => {},
  onValueChange = () => {},
  theme,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    onBlur(value); // Отправляем значение наверх
  };

  const handleSubmitEditing = () => {
    onSubmitEditing(value); // Отправляем значение при нажатии "Done"
  };

  const handleChangeText = (text) => {
    setValue(text);
    // if (!ignoreInput) {
    //   setValue(text); // Обновляем внутреннее состояние только если не игнорируем
    // }
    onValueChange(text);
  };

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={handleChangeText} // Обновляем внутреннее состояние
      onBlur={handleBlur} // Сохраняем значение при потере фокуса
      onSubmitEditing={handleSubmitEditing} // Сохраняем значение при нажатии "Done"
      returnKeyType='done' // Устанавливаем тип клавиши "Done"
      keyboardType='decimal-pad' // Устанавливаем тип клавиатуры numeric
      // autoFocus // Автоматически устанавливаем фокус
    />
  );
};
const Item = ({ item, isEditing, onEdit, onValueChange, onBlur, theme }) => {
  const { name, price, qty } = item;

  if (isEditing) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{price}</Text>
        <CustomTextInput
          theme={theme}
          initialValue={qty}
          onValueChange={onValueChange}
          onBlur={onBlur} // Передаем функцию для сохранения значения
          onSubmitEditing={onBlur} // Передаем функцию для сохранения значения при нажатии "Done"
        />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onEdit}>
      <View style={styles.item}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{price}</Text>
        <Text style={styles.text}>{qty || ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedCustomer, selectedProduct } = useSelector(
    (state) => state.selecteds
  );
  const theme = useSelector(getThemePalette);
  const products = useSelector(selectProducts);
  const productSales = useSelector(selectProductSales);
  const [ignoreInput, setIgnoreInput] = useState(true); // Состояние для игнорирования ввода

  const handleSubmitEditing = (product, newValue, from) => {
    console.log('newValue', newValue, 'from', from, 'ignoreInput', ignoreInput);

    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      productCode: product.code,
      qty: newValue || '',
    };

    dispatch(findAndUpdateOrderRow(payload));
    dispatch(setSelectedProduct(null));
  };

  function pressOnItemHandler(item) {
    dispatch(setSelectedProduct(item));
  }

  const renderItem = ({ item, index }) => {
    let rowFooter = '';
    if (
      typeof selectedProduct === 'object' &&
      selectedProduct?.code === item.code &&
      Array.isArray(productSales?.values) &&
      productSales.values.length > 0
    ) {
      rowFooter = (
        <InputHelper
          values={productSales.values}
          postValue={productSales?.increased}
          theme={theme}
          onPress={(value) => {
            setIgnoreInput(true); // Игнорируем ввод после нажатия кнопки
            handleSubmitEditing(selectedProduct, value, 'InputHelper');
          }}
        />
      );
    }

    return (
      <View style={{ flexDirection: 'column' }}>
        <Item
          item={item}
          value={item.value}
          theme={theme}
          isEditing={selectedProduct?.code === item.code}
          onEdit={() => pressOnItemHandler(item)}
          onBlur={(newValue) => {
            handleSubmitEditing(item, newValue, 'TextInput');
          }} // Передаем функцию для сохранения значения
          onValueChange={(newValue) => {
            // console.log('newValue', newValue);
            setIgnoreInput(false); // Разрешаем ввод при редактировании
            // handleSubmitEditing(item, newValue, 'TextInput');
          }} // Передаем функцию для сохранения значения
          ignoreInput={ignoreInput} // Передаем состояние игнорирования
        />
        {rowFooter}
      </View>
    );
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'Заявка',
      headerRight: () => (
        <IconButton
          name='add-circle-outline'
          color={'white'}
          size={24}
          onPr
          ess={toggleDrawer}
        />
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    width: '30%',
  },
  input: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    color: 'black',
    textAlign: 'center',
  },
});
