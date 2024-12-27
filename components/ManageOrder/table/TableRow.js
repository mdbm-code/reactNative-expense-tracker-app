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

const TableRow = ({
  inputConfig,
  style,
  rowData,
  onPress,
  onUpdate,
  onActive,
  isActiveSlider,
  hideSlider,
}) => {
  const initialPrice = rowData ? parseFloat(rowData['price']) : 0;
  const [inputs, setInputs] = useState({
    price: rowData ? rowData['price'] : '',
    qty: rowData ? rowData['qty'] : '',
  });
  const [isActive, setIsActive] = useState(false);
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
    setIsActive(false);
    onUpdate({
      key: key,
      old: rowData[key],
      new: enteredText.toString(),
    });
    setInputs((prevState) => ({ ...prevState, [key]: enteredText }));
  }

  const handlePricePress = () => {
    onActive();
    // setShowSlider((prev) => !prev); // Переключаем видимость слайдера
    // setIsActive(true);
  };

  const handleSliderChange = (value) => {
    setInputs((prevState) => ({ ...prevState, price: value.toString() }));
  };

  const setPriceHandle = () => {
    onUpdate({
      key: 'price',
      old: rowData['price'],
      new: inputs.price,
    });
    hideSlider();
  };

  const rowCell = [styles.rowCell];
  const textCell = [styles.text];
  if (isActive) {
    rowCell.push(styles.isActive);
    textCell.push(styles.isActiveText);
  }

  if (rowData['minimumPrice'] && +rowData['minimumPrice'] < +rowData['price']) {
    textCell.push(styles.underlinedText);
  }

  return (
    <>
      <View style={[styles.rowContainer, style]}>
        <View style={[...rowCell, styles.nameContainer]}>
          <Pressable
            android_ripple={true}
            onPress={onPress.bind(this, rowData)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={[...textCell, styles.nameText]}>{rowData.name}</Text>
          </Pressable>
        </View>
        <View style={[...rowCell, styles.unitContainer]}>
          <Text style={[...textCell]}>{rowData.unit}</Text>
        </View>
        <View style={[...rowCell, styles.priceContainer]}>
          <Pressable onPress={handlePricePress}>
            <Text style={[...textCell, styles.numberText, styles.priceText]}>
              {inputs.price}
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
            onBlur={() => {
              if (inputs.qty === '') {
                setInputs((prevState) => ({ ...prevState, qty: previousQty })); // Возвращаем предыдущее значение
              } else {
                updateValueHandler(inputs.qty, 'qty'); // Отправляем сообщение наверх только если введено новое значение
              }
              setIsActive(false);
            }}
            onFocus={() => {
              setPreviousQty(inputs.qty); // Сохраняем предыдущее значение
              setInputs((prevState) => ({ ...prevState, qty: '' })); // Очищаем поле
              setIsActive(true);
            }}
          />
        </View>
      </View>
      {isActiveSlider && rowData['minimumPrice'] && inputs.price && (
        // <TableRowSlider
        //   initialPrice={rowData ? parseFloat(rowData['price']) : 0}
        //   onChange={handleSliderChange}
        //   minimumValue={rowData['minimumPrice']}
        //   maximumValue={rowData['price']}
        //   step={1}
        //   value={inputs.price}
        // />
        <View style={styles.sliderContainer}>
          {/* <Text style={styles.percentageText}>
            {calculatePercentageChange()}%
          </Text> */}
          <Button onPress={setPriceHandle}>
            {calculatePercentageChange()}%
          </Button>
          <Slider
            minimumValue={parseFloat(rowData['minimumPrice'])}
            maximumValue={parseFloat(rowData['price'])}
            step={1}
            value={parseFloat(inputs.price) || 0}
            onValueChange={handleSliderChange}
          />
        </View>
      )}
    </>
  );
};

export default TableRow;

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
  sliderContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    // flexDirection: 'row',
  },
  underlinedText: {
    textDecorationLine: 'underline', // Подчеркивание текста
    // fontSize: 18,
    // color: '#000',
  },
});
