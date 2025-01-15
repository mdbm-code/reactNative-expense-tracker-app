import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';
import { getFormattedDate } from '../../../util/date';

const DebtRow = ({ isHeader, style, rowData, onPress, isActive }) => {
  const rowCell = [styles.rowCell];
  const textCell = [styles.text];

  if (isActive) {
    rowCell.push(styles.isActive);
    textCell.push(styles.isActiveText);
  }

  if (isHeader) {
    rowCell.push(styles.headerCell);
    textCell.push(styles.headerText);
  }

  // console.log(rowData.date);

  return (
    <>
      <Pressable
        android_ripple={true}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.rowContainer, style]}>
          <View style={[...rowCell, styles.date]}>
            <Text style={[...textCell]}>
              {getFormattedDate(rowData.date, true)}
            </Text>
          </View>
          <View style={[...rowCell, styles.doc]}>
            <Text style={[...textCell]}>{rowData.title}</Text>
          </View>
          <View style={[...rowCell, styles.out]}>
            <Text style={[...textCell]}>
              {rowData.type === 'out' ? rowData.sum : ''}
            </Text>
          </View>
          <View style={[...rowCell, styles.in]}>
            <Text style={[...textCell]}>
              {rowData.type === 'in' ? rowData.sum : ''}
            </Text>
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
    flex: 2.7,
  },
  doc: {
    flex: 9,
    textAlign: 'left',
  },
  out: {
    flex: 3,
  },
  in: {
    flex: 3,
  },
  headerCell: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
  headerText: {
    color: 'white',
  },
});
