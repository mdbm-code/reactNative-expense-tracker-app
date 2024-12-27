import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../ui/Button';
import { getFormattedDate2 } from '../../util/date';
import { GlobalStyles } from '../../constans/styles';

const OrderForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: defaultValues
      ? { value: defaultValues['amount']?.toString(), isValid: true }
      : { value: '', isValid: true },
    date: defaultValues
      ? { value: getFormattedDate2(defaultValues['date']), isValid: true }
      : { value: '', isValid: true },
    description: defaultValues
      ? { value: defaultValues['description'], isValid: true }
      : { value: '', isValid: true },
  });

  function inputChangeHandler(key, enteredValue) {
    setInputs((prevState) => {
      return { ...prevState, [key]: { value: enteredValue, isValid: true } };
    });
  }

  function submitHandler() {
    const orderData = {
      amount: parseInt(inputs['amount']?.value),
      date: new Date(inputs['date']?.value),
      description: inputs['description']?.value,
    };

    const amountIsValid = !isNaN(orderData.amount) && orderData.amount > 0;
    const dateIsValid = orderData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = orderData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Ошибка ввода', 'Проверьте корректность введенных данных');
      setInputs((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(orderData);
  }

  const formIsInvelid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>
          Заявка №{''} от {''}
        </Text>
        <View style={styles.inputsRow}>
          <Input
            label={'Сумма'}
            style={styles.rowInput}
            invalid={!inputs['amount']?.isValid}
            inputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: (enteredText) =>
                inputChangeHandler('amount', enteredText),
              value: inputs['amount']?.value,
            }}
          />
          <Input
            label={'Дата'}
            style={styles.rowInput}
            invalid={!inputs['date']?.isValid}
            inputConfig={{
              placeholder: 'ДД-ММ-ГГГГ',
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, 'date'), //другой способ
              value: inputs['date']?.value,
            }}
          />
        </View>
        <Input
          label={'Описание'}
          invalid={!inputs['description']?.isValid}
          inputConfig={{
            multiline: true,
            onChangeText: (enteredText) =>
              inputChangeHandler('description', enteredText),
            value: inputs['description']?.value,
            // autoCorrect:false, //default is true
            // autoCapitalize:'none', //variants :  none sentenses words characters,
          }}
        />
      </View>
      {formIsInvelid && (
        <Text style={styles.errorText}>
          Ошибка ввода - пожалуйста проверьте правильность введенных данных
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode={'flat'} onPress={onCancel} style={styles.button}>
          Отмена
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  form: {
    // marginTop:40
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    // marginVertical:24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8,
  },
});
