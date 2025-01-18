import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  setSelectedCustomer,
  setSelectedCustomerListItem,
  setSelectedOrder,
} from '../../store/redux/slices/selectedsSlice';
import IconButton from '../ui/IconButton';
import GridTableRow from '../GridTable/GridTableRow';


const ClientItem = React.memo(({ item, theme, editedId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function onLongHandler() {
    const id = item.id || item.code;
    if (editedId) {
      dispatch(setSelectedCustomerListItem(''));
    } else {
      dispatch(setSelectedCustomerListItem(id));
    }
  }

  function selectCustomerHandler(order) {
    dispatch(setSelectedOrder(order));
    dispatch(setSelectedCustomerListItem(''));
    dispatch(setSelectedCustomer({ ...item }));
    navigation.navigate('CustomerScreensDrawer');
  }

  const containerStyle = [
    styles.container,
    {
      backgroundColor: item?.draftOrders?.length > 0
        ? theme.style.customerList.accent
        : theme.style.customerList.bg2,
      shadowColor: theme.style.customerList.shadow,
    },
  ];

  const textTitle = [
    styles.textBase,
    { color: theme.style.customerList.title },
  ];
  const textSubtitle = [
    styles.textBase,
    { color: theme.style.customerList.subtitle },
  ];
  const iconStyle = [styles.icon];
  const percentStyle = [
    ...textTitle,
    item?.percent < 40 && { color: theme.style.customerList.dangerText },
  ];

  // let secondLine = (
  //   <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text>
  // );

  const Order = ({ data }) => {
    return (
      <Text style={styles.order}>
        Заявка №{data?.code} сумма: {data?.totalAmount}
      </Text>
    );
  }


  if (item?.draftOrders?.length > 1) {
    return (
      <View style={[...containerStyle]}>
        <View style={styles.firstLineContainer}>
          <Text style={[...textTitle, styles.description]}>{item?.name}</Text>
          <IconButton
            color={theme.style.customerList.warningText}
            size={24}
            viewStyle={[...iconStyle]}
            name={item?.visit === 1 ? 'footsteps-outline' : 'call-outline'}
          />
        </View>
        {item.draftOrders.map((order, index) => {
          return (<>
            <Pressable
              key={index}
              onLongPress={onLongHandler}
              onPress={() => selectCustomerHandler(order)}
              style={[({ pressed }) => pressed && styles.pressed, styles.orderContainer]}
              android_ripple={true}
            >
              <Order data={order} />
            </Pressable>
          </>);
        })}

      </View>
    );
  }






  // if (Array.isArray(item?.draftOrders)) {
  //   const cells = [
  //     { title: item?.baseTotal, flex: 3, titleStyle: textSubtitle },
  //     { title: item?.total, flex: 3, titleStyle: textSubtitle },
  //     { title: `${item?.percent}%`, flex: 3, titleStyle: percentStyle },
  //   ];
  //   secondLine = (
  //     <View
  //       style={[
  //         styles.secondLineContainer,
  //         item?.percent < 40 && {
  //           backgroundColor: theme.style.customerList.dangerBg,
  //         },
  //       ]}
  //     >
  //       <GridTableRow cells={cells} />
  //     </View>
  //   );
  // }

  return (
    <Pressable
      onLongPress={onLongHandler}
      onPress={() => {
        if (Array.isArray(item?.draftOrders) && item?.draftOrders[0]) {
          selectCustomerHandler(item?.draftOrders[0]);
        } else {
          selectCustomerHandler();
        }
      }}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={true}
    >
      <View style={[...containerStyle]}>
        {/* <View style={styles.textContainer}> */}
        <View style={styles.firstLineContainer}>
          <Text style={[...textTitle, styles.description]}>{item?.name}</Text>
          <IconButton
            color={theme.style.customerList.warningText}
            size={24}
            viewStyle={[...iconStyle]}
            name={item?.visit === 1 ? 'footsteps-outline' : 'call-outline'}
          />
        </View>
        {Array.isArray(item?.draftOrders) && item?.draftOrders[0]
          ? <Order data={item?.draftOrders[0]} />
          : <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text>}
      </View>
    </Pressable>
  );
});

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
  orderContainer: {
    padding: 12,
    borderTopWidth: 1,
    // backgroundColor: GlobalStyles.colors.primary400,
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
