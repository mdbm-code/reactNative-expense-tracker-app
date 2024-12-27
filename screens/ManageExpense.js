import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constans/styles';
import Button from '../components/ui/Button';
import { OrdersContext } from '../store/context/order-context';
import OrderForm from '../components/ManageOrder/OrderForm';

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

  return (
    <View style={styles.container}>
      <OrderForm
        onCancel={canselHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Обновить' : 'Создать'}
        defaultValues={selectedOrder}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={onDeleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
