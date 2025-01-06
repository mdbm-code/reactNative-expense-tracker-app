import React from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera } from 'react-native-image-picker';
// import { setPhoto } from '../store/redux/slices/photoSlice'; // Предположим, что у вас есть такой экшен
import { getThemePalette } from '../../store/redux/selectors/theme';
import { getCustomerPhoto } from '../../store/redux/selectors/customers';
import { setCustomerPhoto } from '../../store/redux/slices/customersSlice';

const Photo = ({ code }) => {
  const dispatch = useDispatch();
  const theme = useSelector(getThemePalette);
  const photoUri = useSelector(getCustomerPhoto);

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          dispatch(setCustomerPhoto({ code, uri })); // Сохраняем URI фото в Redux
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, { borderColor: theme.bg.text }]}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={[styles.button, { backgroundColor: theme.secondary.main }]}
          >
            <Text style={[styles.buttonText, { color: theme.bg.text }]}>
              Сделать фото
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholder: {
    width: 200,
    height: 200,
    borderWidth: 1,
    // borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    // backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    // color: '#fff',
    fontSize: 16,
  },
});
