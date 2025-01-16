import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useGetImagesQuery } from './apiSlice';
// import { setImages } from './imagesSlice';
import ImageViewer from './ImageViewer';
import { selectImages, setImages } from '../../store/redux/slices/imagesSlice';
import { useGetImagesQuery } from '../../store/redux/api/apiSlices';
// import { selectImages } from './imagesSlice';
// import {apiSlice} from './api/apiSlices'

const CustomerImages = () => {
  const dispatch = useDispatch();

  const { data: images, error } = useGetImagesQuery();
  useEffect(() => {
    if (images) {
      dispatch(setImages(images));
    } else {
      // Если нет данных и находимся в режиме разработки, загружаем локальные изображения
      if (__DEV__) {
        // __DEV__ - это предопределенная переменная, которая возвращает true при разработке
        dispatch(loadLocalImages());
      }
    }
  }, [images]);

  const rows = useSelector(selectImages);

  if (error) return <Text>Error loading images</Text>;
  
  return (
    <View style={{ flex: 1 }}>
      {rows.length > 0 ? <ImageViewer rows={rows} /> : <Text>Loading...</Text>}
    </View>
  );
};

export default CustomerImages;
