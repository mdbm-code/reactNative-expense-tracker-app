import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import IconButton from '../../components/ui/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import * as ImagePicker from 'expo-image-picker';
import { addBody } from '../../store/redux/slices/postsSlice';
import { Ionicons } from '@expo/vector-icons';

const NewCustomerScreen = ({ navigation }) => {
  const theme = useSelector(getTheme);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Новый клиент',
      headerStyle: { backgroundColor: theme.style.bar },
      headerTintColor: theme.style.nav.text,
      headerBackTitle: '',
      headerBackVisible: true, // Показать кнопку "Назад"

      headerBackImage: () => (
        <Ionicons
          name={'chevron-back-outline'}
          size={24}
          color={theme.style.text.main}
        />
      ),
      headerRight: ({ tintColor }) => (
        <IconButton
          name={'share'}
          color={tintColor}
          size={24}
          onPress={() => {}}
        />
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const [shopName, setShopName] = useState('');
  const [payerName, setPayerName] = useState('');
  const [inn, setInn] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async (type) => {
    try {
      // console.log('pickImage'); // Лог для проверки вызова функции

      // Запрашиваем разрешения
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Разрешение необходимо',
          'Пожалуйста, предоставьте доступ к галерее.'
        );
        return;
      }

      // Используем новый API с корректным значением 'images'
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Новый API с правильным значением
        allowsEditing: true,
        quality: 1,
      });

      console.log('ImagePicker result:', result);

      // if (!result.canceled) {
      //   setImages((prevImages) => {
      //     const exists = prevImages.find((img) => img.type === type);
      //     if (exists) return prevImages; // Избегаем дублирования
      //     return [...prevImages, { type, image: result.uri }];
      //   });
      // }
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri; // Получаем URI первого выбранного изображения

        setImages((prevImages) => {
          const exists = prevImages.find((img) => img.type === type);
          if (exists) return prevImages; // Избегаем дублирования
          return [...prevImages, { type, image: selectedImage }];
        });
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
    }
  };

  const handleSave = () => {
    const newCustomer = {
      isNew: true,
      customerCode: `CUST-${Date.now()}`, // Example unique code
      customerName: shopName,
      payerName,
      inn,
      routes: [], // Add routes if needed
      address,
      comment,
      location: { latitude: 0, longitude: 0 }, // Replace with actual location if available
      images,
    };

    dispatch(
      addBody({
        type: 'shopData',
        payload: newCustomer,
      })
    );

    // Clear form
    setShopName('');
    setPayerName('');
    setInn('');
    setAddress('');
    setComment('');
    setImages([]);
  };

  const removeImage = (type) => {
    setImages((prevImages) => prevImages.filter((img) => img.type !== type));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Имя магазина</Text>
      <TextInput
        style={styles.input}
        value={shopName}
        onChangeText={setShopName}
      />

      <Text style={styles.label}>Имя Контрагента</Text>
      <TextInput
        style={styles.input}
        value={payerName}
        onChangeText={setPayerName}
      />

      <Text style={styles.label}>ИНН</Text>
      <TextInput
        style={styles.input}
        value={inn}
        onChangeText={setInn}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Адрес торговой точки</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Примечание</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />

      <Text style={styles.label}>Фотографии</Text>

      {['shopfront', 'shopwindow', 'other'].map((type, index) => (
        <View key={index} style={styles.imageRow}>
          <TouchableOpacity
            onPress={() => pickImage(type)}
            style={styles.imageButton}
          >
            <Text>
              {type === 'shopfront'
                ? 'Добавить фото фасада'
                : type === 'shopwindow'
                ? 'Добавить фото витрины'
                : 'Добавить фото торг.зала'}
            </Text>
          </TouchableOpacity>
          {images.find((img) => img.type === type) && (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: images.find((img) => img.type === type).image,
                }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeImage(type)}
              >
                <Ionicons name='close-circle' size={36} color='red' />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      <Button title='Сохранить' onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },

  imageButton: {
    flex: 3,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  imageContainer: {
    flex: 2,
    // position: 'relative',
    width: 100,
    height: 100,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  deleteIcon: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 10,
    zIndex: 1000,
  },
});

export default NewCustomerScreen;
