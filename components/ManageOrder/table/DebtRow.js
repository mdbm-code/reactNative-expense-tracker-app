import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';

const DebtRow = ({ style, rowData, onPress, isActive }) => {
  const rowCell = [styles.rowCell];
  const textCell = [styles.text];

  if (isActive) {
    rowCell.push(styles.isActive);
    textCell.push(styles.isActiveText);
  }

  return (
    <>
      <Pressable
        android_ripple={true}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.rowContainer, style]}>
          <View style={[...rowCell, styles.date]}>
            <Text style={[...textCell]}>{rowData.date}</Text>
          </View>
          <View style={[...rowCell, styles.doc]}>
            <Text style={[...textCell]}>{rowData.doc}</Text>
          </View>
          <View style={[...rowCell, styles.sum]}>
            <Text style={[...textCell]}>{rowData.sum}</Text>
          </View>
          <View style={[...rowCell, styles.balance]}>
            <Text style={[...textCell]}>{rowData.balance}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DebtRow;

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
  text: {
    color: 'white',
    textAlign: 'left',
  },
  date: {
    flex: 2,
  },
  doc: {
    flex: 9,
    textAlign: 'left',
  },
  sum: {
    flex: 3,
  },
  balance: {
    flex: 3,
  },
});
