import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

const TableRowSlider = ({
  initialPrice,
  onChange,
  minimumValue,
  maximumValue,
  step = 1,
  value = 0,
}) => {
  const calculatePercentageChange = () => {
    const currentPrice = parseFloat(value);
    const percentageChange =
      ((currentPrice - initialPrice) / initialPrice) * 100;
    return percentageChange.toFixed(2); // Округляем до двух знаков после запятой
  };

  const handleSliderChange = (value) => {
    onChange(value);
    // setInputs((prevState) => ({ ...prevState, price: value.toString() }));
    // onUpdate({
    //   key: 'price',
    //   old: rowData['price'],
    //   new: value.toString(),
    // });
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.sliderContainer}>
        <Text style={styles.percentageText}>
          {calculatePercentageChange()}%
        </Text>
        <Slider
          minimumValue={parseFloat(minimumValue)}
          maximumValue={parseFloat(maximumValue)}
          step={step}
          value={parseFloat(value) || 0}
          onValueChange={handleSliderChange}
        />
      </View>
    </View>
  );
};

export default TableRowSlider;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  percentageText: {
    marginRight: 10,
    fontSize: 16,
    color: 'black',
  },
});
