// imagesSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import {} from '../../../assets';

const localImages = [
  require('../../../assets/images/2.jpg'),
  require('../../../assets/images/3.jpg'),
  require('../../../assets/images/4.jpg'),
  require('../../../assets/images/6.jpg'),
  // Добавьте остальные изображения
];

const imagesSlice = createSlice({
  name: 'images',
  initialState: [],
  reducers: {
    setImages: (state, action) => {
      return action.payload; // Сохраните полученные изображения в состояние
    },
    loadLocalImages: (state) => {
      console.log('loadLocalImages', localImages);

      return localImages; // Загрузите локальные изображения
    },
  },
});

export const { setImages, loadLocalImages } = imagesSlice.actions;

export const selectImages = (state) => state.images;

export default imagesSlice.reducer;
