import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCurrentCustomer } from '../../store/redux/slices/customersSlice';

const ClientItem = ({ name, address, amount, id }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function pressExpenseHandler(data) {
    dispatch(setCurrentCustomer({ id, name }));
    navigation.navigate('ManageOrder', { id, customerId: id, orderId: '' });
  }

  return (
    <Pressable
      onPress={pressExpenseHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.textBase, styles.description]}>{name}</Text>
          <Text style={[styles.textBase, styles.address]}>{address}</Text>
          {/* <Text style={styles.textBase}>{getFormattedDate(date)}</Text> */}
        </View>
        {/* <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View> */}
      </View>
    </Pressable>
  );
};

export default ClientItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,

    //for Androit
    elevation: 3,

    //for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textContainer: {
    // flex: 1, // Позволяет тексту занимать доступное пространство
    flexShrink: 1, // Позволяет тексту сжиматься и переноситься по словам
  },
  pressed: {
    opacity: 0.75,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  address: {
    color: GlobalStyles.colors.primary200,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
