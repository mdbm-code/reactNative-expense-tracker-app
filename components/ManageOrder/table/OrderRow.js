import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GlobalStyles } from '../../../constans/styles';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import Button from '../../ui/Button';
import ModalCarousel from '../../ModalCarousel';

const OrderRow = ({
  inputConfig,
  style,
  rowData,
  onPress,
  onUpdate,
  onActive,
  isActiveSlider,
  hideSlider,
  onPressPrice,
  isShowSlider,
  onPressRow,
  isActiveRow,
  deactiveRow,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isQtyImput, setIsQtyInput] = useState(false);
  const initialPrice = rowData ? parseFloat(rowData['price']) : 0;
  const [inputs, setInputs] = useState({
    price: rowData ? rowData['price'] : '',
    qty: rowData ? rowData['qty'] : '',
    selectedQty: '',
  });
  const [previousQty, setPreviousQty] = useState(rowData ? rowData['qty'] : '');

  const inputStyles = [styles.input];
  if (!inputConfig) {
    inputConfig = {};
  }

  if (rowData.qty) {
    inputConfig['value'] = rowData.qty;
  }

  const calculatePercentageChange = () => {
    const currentPrice = parseFloat(inputs.price);
    const percentageChange =
      ((currentPrice - initialPrice) / initialPrice) * 100;
    return percentageChange.toFixed(0); // Округляем до двух знаков после запятой
  };

  function updateValueHandler(enteredText, key) {
    setInputs((prevState) => ({ ...prevState, [key]: enteredText }));
    onUpdate({
      key: key,
      old: rowData[key],
      new: enteredText.toString(),
    });
  }

  function pressCellHandler(name) {
    if (name === 'price') {
      onPressPrice();
    }
    if (name === 'name') {
      if (Array.isArray(rowData['images']) && rowData['images'].length > 0) {
        setModalVisible(true);
      }
    }
    onPressRow();
  }

  function closeModal() {
    setModalVisible(false);
  }

  function onFocusQtyInputHandler() {
    setPreviousQty(inputs.qty); // Сохраняем предыдущее значение
    setInputs((prevState) => ({ ...prevState, qty: '' })); // Очищаем поле
    setIsQtyInput(true);
    hideSlider();
    onPressRow();
  }
  function onFocusPriceInputHandler() {
    // setPreviousQty(inputs.price); // Сохраняем предыдущее значение
    // setInputs((prevState) => ({ ...prevState, price: '' })); // Очищаем поле
    // setIsActiveInput(true);
    // onPressRow();
    setIsQtyInput(false);
  }

  function onBlurQtyInputHandler() {
    console.log('onBlurQtyInputHandler', inputs);

    if (inputs.qty === '') {
      if (inputs.selectedQty) {
        setInputs((prevState) => ({ ...prevState, qty: selectedQty })); // Возвращаем предыдущее значение
        updateValueHandler(inputs.selectedQty, 'qty'); // Отправляем сообщение наверх только если введено новое значение
      } else {
        setInputs((prevState) => ({ ...prevState, qty: previousQty })); // Возвращаем предыдущее значение
      }
    } else {
      updateValueHandler(inputs.qty, 'qty'); // Отправляем сообщение наверх только если введено новое значение
    }
    setIsQtyInput(false);
  }
  function onBlurPriceInputHandler() {
    if (inputs.price === '') {
      // setInputs((prevState) => ({ ...prevState, price: previousQty })); // Возвращаем предыдущее значение
      // } else {
      //   updateValueHandler(inputs.price, 'price'); // Отправляем сообщение наверх только если введено новое значение
    }
  }

  const onChangeSlider = (value) => {
    setInputs((prevState) => ({ ...prevState, price: value.toString() }));
  };

  const onChoicePrice = () => {
    onUpdate({
      key: 'price',
      old: rowData['price'],
      new: inputs.price,
    });
    hideSlider();
  };

  const onChoiceQty = (value) => {
    // setInputs((prevState) => ({ ...prevState, selectedQty: value }));
    updateValueHandler(value, 'qty');
    setIsQtyInput(false);
  };

  const rowCell = [styles.rowCell];
  const textCell = [styles.text];
  const priceText = [styles.priceText];
  const nameText = [styles.nameText];

  if (isActiveRow) {
    rowCell.push(styles.isActive);
    textCell.push(styles.isActiveText);
  }

  if (rowData['minimumPrice'] && +rowData['minimumPrice'] < +rowData['price']) {
    priceText.push(styles.underlinedText);
  }

  if (rowData['images']) {
    nameText.push(styles.underlinedText);
  }

  return (
    <>
      <View style={[styles.rowContainer, style]}>
        <View style={[...rowCell, styles.nameContainer]}>
          <Pressable
            android_ripple={true}
            onPress={() => pressCellHandler('name')}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={[...textCell, ...nameText]}>{rowData.name}</Text>
          </Pressable>
        </View>
        <View style={[...rowCell, styles.unitContainer]}>
          <Text style={[...textCell]}>{rowData.unit}</Text>
        </View>
        <View style={[...rowCell, styles.priceContainer]}>
          <Pressable onPress={() => pressCellHandler('price')}>
            <Text style={[...textCell, styles.numberText, ...priceText]}>
              {rowData['price']}
            </Text>
          </Pressable>
        </View>
        <View style={[...rowCell, styles.qtyContainer]}>
          <TextInput
            style={[inputStyles, ...textCell, styles.numberText]}
            {...inputConfig}
            value={inputs.qty}
            // onChangeText={(enteredText) => updateValueHandler(enteredText, 'qty')}
            onChangeText={(enteredText) =>
              setInputs((prevState) => ({ ...prevState, qty: enteredText }))
            }
            // onFocus={() => setIsActive(true)} // Устанавливаем isActive в true при получении фокуса
            returnKeyType='done' //'done', 'go', 'next', 'search', 'send'
            // onBlur={() => updateValueHandler(inputs.qty, 'qty')} // Отправляем сообщение наверх при потере фокуса
            onSubmitEditing={() => {
              updateValueHandler(inputs.qty, 'qty'); // Отправляем сообщение наверх при нажатии Enter
              Keyboard.dismiss(); // Скрываем клавиатуру
            }}
            keyboardType='decimal-pad'
            onBlur={onBlurQtyInputHandler}
            onFocus={onFocusQtyInputHandler}
          />
        </View>
      </View>
      {isActiveRow && isShowSlider && rowData['minimumPrice'] && (
        <View style={styles.sliderOutterContainer}>
          <View style={styles.sliderInnerContainer}>
            <Text style={styles.prevPrice}>{rowData['price']}</Text>
            <Button onPress={onChoicePrice}>
              {calculatePercentageChange()}%
            </Button>
            {/* <Text style={styles.currentPrice}>{inputs.price}</Text> */}
            <TextInput
              style={[
                inputStyles,
                ...textCell,
                styles.numberText,
                styles.currentPrice,
              ]}
              {...inputConfig}
              value={inputs.price}
              // onChangeText={(enteredText) => updateValueHandler(enteredText, 'qty')}
              onChangeText={(enteredText) =>
                setInputs((prevState) => ({ ...prevState, price: enteredText }))
              }
              // onFocus={() => setIsActive(true)} // Устанавливаем isActive в true при получении фокуса
              returnKeyType='done' //'done', 'go', 'next', 'search', 'send'
              // onBlur={() => updateValueHandler(inputs.qty, 'qty')} // Отправляем сообщение наверх при потере фокуса
              onSubmitEditing={() => {
                // updateValueHandler(inputs.qty, 'qty'); // Отправляем сообщение наверх при нажатии Enter
                // Keyboard.dismiss(); // Скрываем клавиатуру
              }}
              keyboardType='decimal-pad'
              onBlur={onBlurPriceInputHandler}
              onFocus={onFocusPriceInputHandler}
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={parseFloat(rowData['minimumPrice'])}
            maximumValue={parseFloat(rowData['price'])}
            step={10}
            value={parseFloat(inputs.price) || 0}
            onValueChange={onChangeSlider}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
          />
        </View>
      )}
      {Array.isArray(rowData['qtyLog']) &&
        rowData['qtyLog'].length > 0 &&
        isQtyImput &&
        isActiveRow && (
          <>
            <View style={styles.qtyLogContainer}>
              {rowData['qtyLog'].map((item, index) => {
                return (
                  <Button
                    key={index}
                    style={styles.qtyLogButton}
                    onPress={() => onChoiceQty(item?.qty)}
                  >
                    {item?.qty}
                  </Button>
                );
              })}
            </View>
          </>
        )}
      <ModalCarousel
        isVisible={isModalVisible}
        onClose={closeModal}
        images={rowData['images']}
      />
    </>
  );
};

export default OrderRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  percentageText: {
    marginRight: 10,
    fontSize: 16,
    color: 'white',
  },
  rowCell: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 4,
    justifyContent: 'center',
    minHeight: 36,
  },
  isActive: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
  isActiveText: {
    color: GlobalStyles.colors.primary800,
  },
  input: {
    color: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  nameText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingLeft: 4,
  },
  nameContainer: {
    flex: 1,
    textAlign: 'left',
  },
  unitContainer: {
    flex: 0.2,
  },
  priceContainer: {
    flex: 0.3,
  },
  qtyContainer: {
    flex: 0.15,
  },
  numberText: {
    textAlign: 'right',
  },
  priceText: {
    fontSize: 11,
  },
  pressed: {
    opacity: 0.75,
  },
  qtyLogContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    // paddingHorizontal: 20,
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyLogButton: { flex: 1, marginHorizontal: 2 },
  sliderOutterContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    // paddingHorizontal: 20,
    marginBottom: 24,
  },
  sliderInnerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: { flex: 1 },
  prevPrice: {
    flex: 0.4,
    color: 'white',
    fontSize: 12,
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
  currentPrice: {
    flex: 0.4,
    color: 'white',
    fontSize: 12,
    textAlignVertical: 'center',
    textAlign: 'right',
    paddingRight: 10,
  },
  underlinedText: {
    textDecorationLine: 'underline', // Подчеркивание текста
    // fontSize: 18,
    // color: '#000',
  },
});
