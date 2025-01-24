// features/imagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (lastSync) => {
    const response = await fetch(
      `https://your-api-url.com/images?lastSync=${lastSync}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    removeImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Добавление новых изображений к уже существующим
        // Можно добавить логику для удаления изображений, если их нет на сервере
        const existingIds = state.images.map((image) => image._id);
        action.payload.forEach((image) => {
          if (!existingIds.includes(image._id)) {
            state.images.push(image);
          }
        });
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { removeImage } = imagesSlice.actions;
export default imagesSlice.reducer;
