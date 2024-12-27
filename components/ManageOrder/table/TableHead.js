import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';

const TableHead = ({ style, name, unit, price, qty }) => {
  return (
    <View style={[styles.rowContainer, style]}>
      <View style={[styles.rowCell, styles.nameContainer]}>
        <Text style={[styles.text, styles.nameText]}>{name}</Text>
      </View>
      <View style={[styles.rowCell, styles.unitContainer]}>
        <Text style={[styles.text]}>{unit}</Text>
      </View>
      <View style={[styles.rowCell, styles.priceContainer]}>
        <Text style={[styles.text, styles.numberText]}>{price}</Text>
      </View>
      <View style={[styles.rowCell, styles.qtyContainer]}>
        <Text style={[styles.text, styles.numberText]}>{qty}</Text>
      </View>
    </View>
  );
};

export default TableHead;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  rowCell: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 4,
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary400,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
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
    flex: 0.25,
  },
  qtyContainer: {
    flex: 0.15,
  },
  numberText: {
    textAlign: 'right',
  },
});
