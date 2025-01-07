import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getThemePalette } from '../../store/redux/selectors/theme';
import PhoneButton from '../../components/ui/PhoneButton';
import Photo from '../../components/Photo/Photo';
import { storeOrder } from '../../util/http';
import { getCurrentCustomerDoc } from '../../store/redux/selectors/orders';
import { insertUpdateDocument } from '../../store/redux/slices/documentsSlice';

const CustomerProfileScreen = ({}) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  const dispatch = useDispatch();
  const theme = useSelector(getThemePalette);
  const customerDoc = useSelector(getCurrentCustomerDoc);

  const textStyle = [styles.text, { color: theme.bg.active }];
  const labelStyle = [styles.text, { color: theme.bg.text }];

  function onPressStoreHandler() {
    if (typeof customerDoc === 'string') {
      Alert.alert('Ошибка', customerDoc, { text: 'Отмена', style: 'cancel' });
    }
    dispatch(insertUpdateDocument(customerDoc)); //сохраним локально
    storeOrder(customerDoc); //сохраним на сервере
  }

  let phones = '';
  if (
    typeof selectedCustomer?.phone === 'string' &&
    selectedCustomer?.phone.includes(',')
  ) {
    phones = (
      <View style={styles.dataContainer}>
        <Text style={labelStyle}>Телефоны:</Text>
        <View style={styles.phones}>
          {selectedCustomer.phone.split(',').map((phone, index) => (
            <PhoneButton
              key={index}
              number={phone}
              style={{ borderColor: theme.success.light }}
              textStyle={textStyle}
            />
          ))}
        </View>
      </View>
    );
  } else {
    phones = (
      <Text style={textStyle}>
        <Text style={labelStyle}>Телефон:</Text>
        <PhoneButton
          number={selectedCustomer?.phone}
          style={{ borderColor: theme.success.light }}
          textStyle={textStyle}
        />
      </Text>
    );
  }

  return (
    <View style={styles.rootContainer}>
      {/* <Text style={textStyle}>{selectedCustomer?.name}</Text> */}
      <View style={styles.dataContainer}>
        <Button
          title='Отправить заявку на сервер'
          onPress={onPressStoreHandler}
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={labelStyle}>Адрес:</Text>
        <Text style={[textStyle, styles.address]}>
          {selectedCustomer?.address}
        </Text>
      </View>
      {phones}
      <View style={styles.photoContainer}>
        <Text style={labelStyle}>Фото фасада:</Text>
        <Photo code={selectedCustomer?.code} />
      </View>
    </View>
  );
};

export default CustomerProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
  },
  photoContainer: {
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
  },
  address: { flexShrink: 1 },
  dataContainer: {
    flexDirection: 'row',
  },
  phones: {
    flexDirection: 'column',
  },
});
