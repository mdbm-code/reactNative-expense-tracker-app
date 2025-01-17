import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useGetImagesQuery } from './apiSlice';
// import { setImages } from './imagesSlice';
// import ImageViewer from './ImageGallery';
import {
  loadLocalImages,
  selectImages,
  setImages,
} from '../../store/redux/slices/imagesSlice';
// import { useGetImagesQuery } from '../../store/redux/api/apiSlices';
import { getTheme } from '../../store/redux/selectors/theme';
import ImageGallery from './ImageGallery';
// import ImageGallery from './ImageGallery';
// import { selectImages } from './imagesSlice';
// import {apiSlice} from './api/apiSlices'

const CustomerImages = ({ theme }) => {
  const dispatch = useDispatch();
  const imagesFromState = useSelector(selectImages); // Получаем локальные изображения из состояния
  // const { data: apiImages, error, isLoading } = useGetImagesQuery();
  // const { data: images, error } = useGetImagesQuery();
  useEffect(() => {
    // if (!apiImages && !imagesFromState?.length) {
    // Если изображений из API нет, и нет локальных изображений, загружаем локальные
    dispatch(loadLocalImages());
    // }
    // if (images) {
    //   console.log('setImages', images);

    //   dispatch(setImages(images));
    // } else {
    //   console.log('dispatch(loadLocalImages())');
    //   // Если нет данных и находимся в режиме разработки, загружаем локальные изображения
    //   // if (__DEV__) {
    //   // __DEV__ - это предопределенная переменная, которая возвращает true при разработке
    //   dispatch(loadLocalImages());
    //   // }
    // }
  }, []);

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />; // Индикатор загрузки
  // }

  // if (error) {
  //   return <Text>Ошибка: {error.message}</Text>; // Сообщение об ошибке
  // }

  // const imagesToDisplay = apiImages || imagesFromState; // Используем данные из API, либо из локального состояния

  // console.log('imagesFromState', imagesFromState);

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      {Array.isArray(imagesFromState) && imagesFromState?.length > 0 ? (
        <ImageGallery theme={theme} rows={imagesFromState} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default CustomerImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
