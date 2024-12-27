import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constans/styles';
import Button from '../components/ui/Button';
import { OrdersContext } from '../store/context/order-context';
import OrderForm from '../components/ManageOrder/OrderForm';
import Order from '../components/ManageOrder/Order';

const dummyData = [
  {
    id: 'c1',
    name: 'Имя 1',
    unit: 'шт',
    price: '4589.45',
    qty: '34',
    minimumPrice: '3000',
  },
  {
    id: 'c2',
    name: 'Имя 2',
    unit: 'шт',
    price: '4589.45',
    qty: '34',
    minimumPrice: '100',
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
  { id: 'c17', name: 'Имя 4', unit: 'шт', price: '4589.45', qty: '34' },
];

const ManageExpense = ({ route, navigation }) => {
  const { data, deleteOrder, updateOrder, addOrder } =
    useContext(OrdersContext);
  //route, navigation доступны только в компонентах, которые зарегистрированы в навигаторе (см. App.js)
  const editedExpenseId = route?.params?.id;
  const isEditing = !!editedExpenseId;

  const selectedOrder = data.find((item) => item.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Корректировка' : 'Новая заявка',
    });
  }, []);

  function onDeleteHandler() {
    deleteOrder(editedExpenseId);
    navigation.goBack();
  }

  function canselHandler() {
    navigation.goBack();
  }

  function confirmHandler(orderData) {
    if (isEditing) {
      updateOrder(editedExpenseId, orderData);
    } else {
      addOrder(orderData);
    }
    navigation.goBack();
  }

  function pressCellHandler(payload) {
    console.log(payload);
  }

  function updateTableValueHandler(payload) {
    console.log(payload);
  }

  return (
    <View style={styles.container}>
      <Order
        onUpdateValue={updateTableValueHandler}
        onPress={pressCellHandler}
        onCancel={canselHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Обновить' : 'Создать'}
        defaultValues={selectedOrder}
        rows={dummyData}
      />
      {/* <OrderForm
        onCancel={canselHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Обновить' : 'Создать'}
        defaultValues={selectedOrder}
      /> */}
      {/* {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={onDeleteHandler}
          />
        </View>
      )} */}
    </View>
  );
};

export default ManageExpense;

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
