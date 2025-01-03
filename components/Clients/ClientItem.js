import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedCustomer } from '../../store/redux/slices/selectedsSlice';
import IconButton from '../ui/IconButton';

const ClientItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function selectCustomerHandler(data) {
    dispatch(setSelectedCustomer({ ...item }));
    navigation.navigate('ManageOrder');
  }

  return (
    <Pressable
      onPress={selectCustomerHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={styles.container}>
        {/* <View style={styles.textContainer}> */}
        <View style={styles.firstLineContainer}>
          <Text style={[styles.textBase, styles.description]}>{item?.name}</Text>
          <IconButton
            color='white'
            size={24}
            viewStyle={styles.icon}
            name={item?.visit === 1 ? 'walk-outline' : 'call-outline'}
          />
        </View>
        <Text style={[styles.textBase, styles.address]}>{item?.address}</Text>
        {/* </View> */}
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
    flexDirection: 'column',
    // justifyContent: 'space-between',
    borderRadius: 6,

    //for Androit
    elevation: 3,

    //for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  // textContainer: {
  //   // flex: 1, // Позволяет тексту занимать доступное пространство
  //   flexShrink: 1, // Позволяет тексту сжиматься и переноситься по словам
  // },
  firstLineContainer: {
    // flex: 1, // Позволяет тексту занимать доступное пространство
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  icon: {
    flex: 1, // Позволяет тексту занимать доступное пространство
    justifyContent: 'flex-start',
    color: 'white',
    margin: 0,
    padding: 0,
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
    flex: 9,
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
