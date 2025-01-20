import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  setSelectedCustomer,
  setSelectedCustomerListItem,
} from '../../store/redux/slices/selectedsSlice';
import IconButton from '../ui/IconButton';
import GridTableRow from '../GridTable/GridTableRow';
import {
  confirmAndSendOrder,
  setSelectedOrder,
} from '../../store/redux/slices/ordersSlice';
import TableRow from '../GridTable/v2/TableRow';
import { Ionicons } from '@expo/vector-icons';

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
    if (order) {
      // console.log('selectCustomerHandler(order):', order);
      dispatch(setSelectedOrder(order));
    } else {
      dispatch(setSelectedOrder({}));
    }
    dispatch(setSelectedCustomerListItem(''));
    dispatch(setSelectedCustomer({ ...item }));
    navigation.navigate('CustomerScreensDrawer');
  }

  const containerStyle = [
    styles.container,
    {
      backgroundColor:
        item?.draftOrders?.length > 0
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
        №{data?.code} от {data?.formattedDate} сумма: {data?.totalAmount}
      </Text>
    );
  };

  function getIcon(status) {
    switch (status) {
      case 'draft':
        return ['share-outline', theme.style.warning.light];
      case 'accepted':
        return ['cloud-offline-outline', theme.style.error.light];
      case 'failed':
        return ['cloud-done-outline', theme.style.success.light];
      case 'delivered':
        return ['star-outline', theme.style.info.light];
      case 'canceled':
        return [
          'trash-outline',
          theme.style.customerList.bg2,
          theme.style.error.dark,
        ];
      default:
        return ['time-outline', theme.style.info.light];
    }
  }

  const shareCurrentOrder = (orderCode) => {
    const res = dispatch(confirmAndSendOrder(orderCode));
    console.log('res', res);
  };

  function onPressShareOrderHandler(orderCode) {
    Alert.alert(
      '',
      'Отправить заявку на сервер ?',
      [
        {
          text: 'Отмена',
          // onPress: () => console.log('Удалить нажато'),
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: () => shareCurrentOrder(orderCode),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert был закрыт'), // Вызывается при закрытии
      } // Если true, Alert можно закрыть, нажав вне него);
    );
  }

  const OrderRow = ({ order }) => {
    const iconSet = getIcon(order.status);
    const cells = {
      code: order.code,
      title: `№ ${order.code}`, // от ${order?.formattedDate}
      status: iconSet[0],
      iconBg: iconSet[1],
      iconColor: iconSet[2],
      sumContent: (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {order.totalReturn === 0 ? null : (
            <Text
              style={{
                color: theme.style.text.main,
                marginRight: 10,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: theme.style.error.main,
              }}
            >
              -{order.totalReturn}
            </Text>
          )}
          <Text
            style={{
              color: theme.style.text.main,
              textAlign: 'right',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {order.totalAmount}
          </Text>
        </View>
      ),
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => onPressShareOrderHandler(order.code)}
          style={{
            flex: 1,
            marginRight: 12,
            backgroundColor: cells.iconBg,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            padding: 8,
            marginBottom: 6,
          }}
        >
          <Ionicons
            name={cells.status}
            size={24}
            color={cells.iconColor || theme.style.text.main}
          />
        </TouchableOpacity>
        <View style={{ flex: 6 }}>
          <Text style={{ color: theme.style.text.main }}>{cells.title}</Text>
        </View>
        <View style={{ flex: 7 }}>{cells.sumContent}</View>
      </View>
    );
  };

  if (item?.draftOrders?.length > 1) {
    return (
      <View style={[...containerStyle]}>
        <View style={styles.firstLineContainer}>
          <Text style={[...textTitle, styles.description]}>{item?.name}</Text>
          {/* <IconButton
            color={theme.style.customerList.warningText}
            size={24}
            viewStyle={[...iconStyle]}
            name={item?.visit === 1 ? 'footsteps-outline' : 'call-outline'}
          /> */}
        </View>
        {item.draftOrders.map((order, index) => {
          return (
            <Pressable
              key={index}
              onLongPress={onLongHandler}
              onPress={() => selectCustomerHandler(order)}
              style={[({ pressed }) => pressed && styles.pressed]}
              android_ripple={true}
            >
              <OrderRow order={order} />
            </Pressable>
          );
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
          {/* <IconButton
            color={theme.style.customerList.warningText}
            size={24}
            viewStyle={[...iconStyle]}
            name={item?.visit === 1 ? 'footsteps-outline' : 'call-outline'}
          /> */}
        </View>
        {Array.isArray(item?.draftOrders) && item?.draftOrders[0] ? (
          <OrderRow order={item?.draftOrders[0]} />
        ) : (
          <Text style={[...textSubtitle, styles.address]}>{item?.address}</Text>
        )}
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
  icon: {
    flex: 1,
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
