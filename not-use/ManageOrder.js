import { StyleSheet, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
// import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constans/styles';
// import Button from '../components/ui/Button';
import { OrdersContext } from '../store/context/order-context';
// import OrderForm from '../components/ManageOrder/OrderForm';
import Order from '../screens/CustomerScreen';
import { ClientsContext } from '../store/context/client-context';
import { useSelector } from 'react-redux';
import CustomerDoc from '../screens/CustomerScreen';

const dummyData = [
  {
    id: 'c1',
    name: 'Имя 1',
    unit: 'шт',
    basePrice: '5000',
    price: '4589.45',
    qty: '34',
    ret: '15',
    minimumPrice: '3000',
    qtyLog: [
      { date: new Date('2024-12-01'), qty: 18 },
      { date: new Date('2024-12-03'), qty: 25 },
      { date: new Date('2024-12-06'), qty: 20 },
      { date: new Date('2024-12-09'), qty: 2 },
      { date: new Date('2024-12-14'), qty: 25 },
      { date: new Date('2024-12-20'), qty: 25 },
      { date: new Date('2024-12-24'), qty: 18 },
    ],
  },
  {
    id: 'c2',
    name: 'Имя 2',
    unit: 'шт',
    basePrice: '7000',
    price: '4589.45',
    qty: '34',
    minimumPrice: '1000',
    qtyLog: [
      { date: new Date('2024-12-01'), qty: 18 },
      { date: new Date('2024-12-03'), qty: 25 },
      { date: new Date('2024-12-06'), qty: 20 },
      { date: new Date('2024-12-09'), qty: 2 },
      { date: new Date('2024-12-14'), qty: 25 },
      { date: new Date('2024-12-20'), qty: 25 },
      { date: new Date('2024-12-24'), qty: 18 },
    ],
  },
  {
    id: 'c3',
    name: 'Имя 3',
    unit: 'шт',
    price: '4589.45',
    qty: '34',
    images: ['2.jpg', '3.jpg', '4.jpg', '6.jpg'],
  },
  { id: 'c4', name: 'Имя 4', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c5', name: 'Имя 1', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c6', name: 'Имя 2', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c7', name: 'Имя 3', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c8', name: 'Имя 4', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c9', name: 'Имя 1', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c10', name: 'Имя 2', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c11', name: 'Имя 3', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c12', name: 'Имя 4', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c13', name: 'Имя 4', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c14', name: 'Имя 1', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c15', name: 'Имя 2', unit: 'шт', price: '4589.45', qty: '34' },
  { id: 'c16', name: 'Имя 3', unit: 'шт', price: '4589.45', qty: '34' },
  {
    id: 'c17',
    name: 'Имя 4',
    unit: 'шт',
    price: '4589.45',
    qty: '34',
    basePrice: '7000',
    price: '4589.45',
    qty: '34',
    minimumPrice: '1000',
    qtyLog: [
      { date: new Date('2024-12-01'), qty: 18 },
      { date: new Date('2024-12-03'), qty: 25 },
      { date: new Date('2024-12-06'), qty: 20 },
      { date: new Date('2024-12-09'), qty: 2 },
      { date: new Date('2024-12-14'), qty: 25 },
      { date: new Date('2024-12-20'), qty: 25 },
      { date: new Date('2024-12-24'), qty: 18 },
    ],
    images: ['2.jpg', '3.jpg', '4.jpg', '6.jpg'],
  },
];

const ManageOrder = ({ route, navigation }) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  const { data, deleteOrder, updateOrder, addOrder } =
    useContext(OrdersContext);
  const { data: clients } = useContext(ClientsContext);
  //route, navigation доступны только в компонентах, которые зарегистрированы в навигаторе (см. App.js)
  const editedExpenseId = ''; //route?.params?.id;
  const customerId = ''; //route?.params?.customerId;
  const orderId = ''; //route?.params?.orderId;
  // console.log('customerId', customerId);
  // console.log('orderId', orderId);

  const isEditing = !!orderId;

  const orderCustomer = {};
  const orderParams = {};
  const orderCart = [];
  // const selectedOrder = data.find((item) => item.id === editedExpenseId);
  // const selectedClient = clients.find((item) => item.id === editedExpenseId);

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   title: selectedCustomer?.name,
    //   // title: isEditing ? 'Корректировка' : 'Новая заявка',
    // });
  }, []);

  function onDeleteHandler() {
    deleteOrder(editedExpenseId);
    //navigation.goBack();
  }

  function canselHandler() {
    //navigation.goBack();
  }

  function confirmHandler(orderData) {
    if (isEditing) {
      updateOrder(editedExpenseId, orderData);
    } else {
      addOrder(orderData);
    }
    //navigation.goBack();
  }

  function pressCellHandler(payload) {
    // console.log(payload);
  }

  function updateTableValueHandler(payload) {
    // console.log(payload);
  }

  return (
    <View style={styles.container}>
      <CustomerDoc
        onUpdateValue={updateTableValueHandler}
        onPress={pressCellHandler}
        onCancel={canselHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Обновить' : 'Создать'}
        orderParams={orderParams}
        rows={orderCart}
        client={orderCustomer}
      />
    </View>
  );
};

export default ManageOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
