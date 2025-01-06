import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    uri: null,
  },
  reducers: {
    setPhoto: (state, action) => {
      state.uri = action.payload;
    },
  },
});

export const { setPhoto } = photoSlice.actions;
export default photoSlice.reducer;
