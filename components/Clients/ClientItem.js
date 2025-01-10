import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { GlobalStyles } from '../../constans/styles';
// import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSelectedCustomer } from '../../store/redux/slices/selectedsSlice';
import IconButton from '../ui/IconButton';
import GridTableRow from '../GridTable/GridTableRow';
// import GridTable from '../GridTable';

const ClientItem = ({ item, theme }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function selectCustomerHandler(data) {
    // console.log('SelectedCustomer:', item);
    dispatch(setSelectedCustomer({ ...item }));
    navigation.navigate('CustomerScreens');
  }
  // const containerStyle = [styles.container,]
  const containerStyle = [
    styles.container,
    {
      backgroundColor: item?.hasOrder
        ? theme.style.customerList.accent
        : theme.style.customerList.bg2,
      shadowColor: theme.style.customerList.shadow,
    },
  ];

  // const iconStyle = [styles.icon,];
  const textTitle = [styles.textBase, { color: theme.style.customerList.title }];
  const textSubtitle = [styles.textBase, { color: theme.style.customerList.subtitle }];
  const iconStyle = [styles.icon];
  const percentStyle = [...textTitle, item?.percent < 40 && { color: theme.style.customerList.dangerText }];
  // const textTitle = [styles.textBase, { color: palette.text.primary }];
  // const textSubtitle = [styles.textBase, { color: palette.text.disabled }];

  let secondLine = (
    <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text>
  );
  if (item?.hasOrder) {
    const cells = [
      { title: item?.baseTotal, flex: 3, titleStyle: textSubtitle },
      { title: item?.total, flex: 3, titleStyle: textSubtitle },
      { title: `${item?.percent}%`, flex: 3, titleStyle: percentStyle },

    ];
    secondLine = (
      <View style={[styles.secondLineContainer, item?.percent < 40 && { backgroundColor: theme.style.customerList.dangerBg }]}>
        <GridTableRow cells={cells} />
      </View>
    );
  }

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
            name={item?.visit === 1 ? 'footsteps-outline' : 'call-outline'}
          />
        </View>
        {secondLine}
        {/* <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text> */}
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
    // shadowColor: 'black',
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
    // fontWeight: 'bold',
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
