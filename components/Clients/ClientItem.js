import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
// import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedCustomer } from '../../store/redux/slices/selectedsSlice';
import IconButton from '../ui/IconButton';

const ClientItem = ({ item, theme }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function selectCustomerHandler(data) {
    dispatch(setSelectedCustomer({ ...item }));
    navigation.navigate('CustomerScreen');
  }
  // const containerStyle = [styles.container,]
  const containerStyle = [styles.container, { backgroundColor: item?.hasOrder ? theme.success.light : theme.warning.light }]

  // const iconStyle = [styles.icon,];
  const textTitle = [styles.textBase,];
  const textSubtitle = [styles.textBase,];
  const iconStyle = [styles.icon];
  // const textTitle = [styles.textBase, { color: palette.text.primary }];
  // const textSubtitle = [styles.textBase, { color: palette.text.disabled }];

  return (
    <Pressable
      onPress={selectCustomerHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={[...containerStyle]}>
        {/* <View style={styles.textContainer}> */}
        <View style={styles.firstLineContainer}>
          <Text style={[...textTitle, styles.description]}>{item?.name}</Text>
          <IconButton
            color={theme.primary.contrastText}
            size={24}
            viewStyle={[...iconStyle]}
            name={item?.visit === 1 ? 'walk-outline' : 'call-outline'}
          />
        </View>
        <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text>
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
    // backgroundColor: GlobalStyles.colors.primary800,
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
  hasOrder: {
    // backgroundColor: GlobalStyles.colors.primary400,
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
    // color: 'white',
    margin: 0,
    padding: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  // textBase: {
  //   color: GlobalStyles.colors.primary50,
  // },
  address: {
    //   color: GlobalStyles.colors.primary200,
  },
  description: {
    flex: 9,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  // amountContainer: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 4,
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 4,
  //   minWidth: 80,
  // },
  // amount: {
  //   color: GlobalStyles.colors.primary500,
  //   fontWeight: 'bold',
  // },
});
