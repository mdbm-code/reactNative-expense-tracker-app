import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import PhoneButton from '../../components/ui/PhoneButton';
import CustomerImages from '../../components/ImageViewer/CustomerImages';

const CustomerProfileScreen = ({ }) => {
  const { selectedCustomer } = useSelector((state) => state.selecteds);
  const theme = useSelector(getTheme);
  const textStyle = [styles.text, { color: theme.style.customerList.title }];
  const labelStyle = [styles.text, { color: theme.style.customerList.title }];

  // function onPressStoreHandler() {
  //   if (typeof customerDoc === 'string') {
  //     Alert.alert('Ошибка', customerDoc, { text: 'Отмена', style: 'cancel' });
  //   }
  //   dispatch(insertUpdateDocument(customerDoc)); //сохраним локально
  //   storeOrder(customerDoc); //сохраним на сервере
  // }

  let phones = '';
  if (
    typeof selectedCustomer?.phone === 'string' &&
    selectedCustomer?.phone.includes(',')
  ) {
    phones = (
      <View style={styles.dataContainer}>
        <Text style={[labelStyle]}>Телефоны:</Text>
        <View style={styles.phones}>
          {selectedCustomer.phone.split(',').map((phone, index) => (
            <PhoneButton
              key={index}
              number={phone}
              style={{
                backgroundColor: theme.style.drawer.header.button.dark.bg,
              }}
              textStyle={
                ([textStyle],
                  { color: theme.style.drawer.header.button.main.text })
              }
            />
          ))}
        </View>
      </View>
    );
  } else {
    phones = (
      <View style={styles.dataContainer}>
        <Text style={[labelStyle]}>Телефон:</Text>
        <PhoneButton
          textStyle={
            ([textStyle], { color: theme.style.drawer.header.button.main.text })
          }
          number={selectedCustomer?.phone}
          style={{
            backgroundColor: theme.style.drawer.header.button.dark.bg,
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      {/* <Text style={textStyle}>{selectedCustomer?.name}</Text> */}

      {/* <View style={styles.dataContainer}>
        <Button
          title='Отправить заявку на сервер'
          onPress={onPressStoreHandler}
        />
      </View> */}
      <View style={styles.dataContainer}>
        <Text style={[labelStyle, { color: theme.style.customerList.title }]}>
          Адрес:
        </Text>
        <Text
          style={[
            textStyle,
            styles.address,
            { color: theme.style.customerList.title },
          ]}
        >
          {selectedCustomer?.address}
        </Text>
      </View>
      {phones}
      <View style={styles.photoContainer}>
        {/* <Text style={labelStyle}>Фото фасада:</Text> */}
        {/* <Photo code={selectedCustomer?.code} /> */}
        <CustomerImages theme={theme} />
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
    // marginVertical: 10,
    flex: 1,
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
    marginRight: 8,
  },
});
