import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../store/redux/slices/imagesSlice';

const ImageSync = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const lastSync = useSelector((state) => state.images.lastSync); // Храните время последней синхронизации

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchImages(lastSync));
    }, 3600000); // Проверка каждую 1 час
    return () => clearInterval(interval);
  }, [dispatch, lastSync]);

  return <div>{/* Ваш компонент для отображения изображений */}</div>;
};

export default ImageSync;
