import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constans/styles';
import Button from '../components/ui/Button';
import { OrdersContext } from '../store/context/order-context';

const ManageExpense = ({ route, navigation }) => {
  //route, navigation доступны только в компонентах, которые зарегистрированы в навигаторе (см. App.js)
  const editedExpenseId = route?.params?.id;
  const isEditing = !!editedExpenseId;

  const { deleteOrder, updateOrder, addOrder } = useContext(OrdersContext);

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

  function confirmHandler() {
    if (isEditing) {
      updateOrder(editedExpenseId, {
        description: 'text-updated!!',
        amount: 345,
        date: new Date('2024-12-26'),
      });
    } else {
      addOrder({
        description: 'text',
        amount: 345,
        date: new Date('2024-12-26'),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode={'flat'} onPress={canselHandler} style={styles.button}>
          Отмена
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Обновить' : 'Создать'}
        </Button>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // flex: 1,
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
