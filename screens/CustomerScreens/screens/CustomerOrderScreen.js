import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// import ManageProductsScreen from './ManageProductsScreen'; // Другой экран
// import { selectOrder } from '../../store/redux/selectors/orders';
// import ProductsOutput from '../../components/ManageProductsScreen/ProductsOutput';
// import {
//   deleteOrderRow,
//   findAndUpdateOrderRow,
// } from '../../store/redux/slices/currentOrdersSlice';
import { useNavigation } from '@react-navigation/native';
import { selectOrder } from '../../../store/redux/selectors/orders';
import FallbackText from '../../../components/FallbackText';
import IconButton from '../../../components/ui/IconButton';
import ProductsOutput from '../../../components/ManageProductsScreen/ProductsOutput';
import {
  deleteOrderRow,
  findAndUpdateOrderRow,
} from '../../../store/redux/slices/currentOrdersSlice';
import GridTable from '../../../components/GridTable';
import { getThemePalette } from '../../../store/redux/selectors/theme';
// import IconButton from '../../components/ui/IconButton';
// import { selectOrder } from '../../../store/redux/selectors/orders';
// import FallbackText from '../../../components/FallbackText';
// import IconButton from '../../../components/ui/IconButton';

const CustomerOrderScreen = ({ stackNavigation }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector(getThemePalette);
  const rows = useSelector(selectOrder);
  const selectedCustomer = useSelector(
    (state) => state.selecteds?.selectedCustomer
  );
  const customerCode = selectedCustomer?.code;
  const minSum = selectedCustomer?.minSum;

  // useLayoutEffect(() => {
  //   stackNavigation.setOptions({
  //     title: 'Заявка',
  //     headerRight: () => (
  //       <IconButton
  //         name='add-circle-outline'
  //         color={'white'}
  //         size={30}
  //         onPress={() => {
  //           stackNavigation.navigate('ManageProductsScreen');
  //         }}
  //       />
  //     ),
  //   });
  // }, [stackNavigation]);

  if (typeof rows === 'string') return <FallbackText>{rows}</FallbackText>;
  if (!typeof customerCode === 'string')
    return <FallbackText>{'Покупатель не выбран'}</FallbackText>;

  function onChangeTextHandler(value) {
    const payload = {
      customerCode: customerCode,
      minSum: minSum,
      productCode: value?.code,
      base_price: value.base_price,
      price: value.price,
      qty: value.newValue,
    };
    // console.log('onChangeTextHandler.payload:', payload);
    dispatch(findAndUpdateOrderRow(payload));

    //"base_price": 54.6, "code": "ТД000110", "description": "5-10", "id": "ТД000110", "multiple": 9, "name": "Айран БУДЬ ЗДОРОВ 0,1% 1 л.",
    // "newValue": "5", "oldValue": "", "parentCode": "29", "prices": { "price": "" }, "qty": "", "shortName": "Айран БУДЬ ЗДОРОВ 0, 1 % 1 л.",
    // "specs": [{"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1366E", "value": 53.39}, {"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1128389E", "value": 57}], "unit": "шт"}
  }

  function onLongPressHandler(event) {
    Alert.alert('Удалить?', `Вы хотите удалить элемент: ${event.name}?`, [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Удалить',
        onPress: () => {
          dispatch(deleteOrderRow({ customerCode, productCode: event?.code }));
        },
      },
    ]);
  }

  function onPressHandler(data) {
    // if (data?.from === 'head') {
    //   navigation.navigate('ManageProductsScreen');
    // }
  }

  // const renderContent = (
  //   <View style={styles.headerContentContainer}>
  //     <Text style={{ color: 'white' }}>Наименование</Text>
  //     <IconButton
  //       name='add-circle-outline'
  //       color={'white'}
  //       size={24}
  //       onPress={() => {
  //         navigation.navigate('ManageProductsScreen');
  //       }}
  //     />
  //   </View>
  // );

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      // content: renderContent,
      flex: 8,
      titleStyle: {
        textAlign: 'left',
        fontSize: 12,
        color: theme.text.primary,
      },
      // onPress: () => onPress({ from: 'head', id: 'name' }),
    },
    {
      id: 'base_price',
      title: 'Б.Цена',
      flex: 3,
      titleStyle: {
        textAlign: 'right',
        fontSize: 12,
        color: theme.text.primary,
      },
    },
    {
      id: 'price',
      title: 'Цена',
      flex: 3,
      titleStyle: {
        textAlign: 'right',
        fontSize: 12,
        color: theme.text.primary,
      },
    },
    {
      id: 'qty',
      title: 'Колв',
      flex: 2,
      as: 'input',
      titleStyle: { fontSize: 12, color: theme.text.primary },
    },
  ];

  return (
    <View style={[styles.rootContainer]}>
      {/* <ProductsOutput
        rows={rows}
        onChangeText={onChangeTextHandler}
        onLongPress={onLongPressHandler}
        onPress={onPressHandler}
        columns={columns}
        deletable
      /> */}
      <GridTable
        rows={rows}
        columns={columns}
        rowId='code'
        onPress={onPressHandler}
        onChangeText={onChangeTextHandler}
        onLongPress={onLongPressHandler}
      />
    </View>
  );
};

export default CustomerOrderScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
