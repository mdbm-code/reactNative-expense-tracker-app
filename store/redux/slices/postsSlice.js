import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bodies: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addBody: (state, action) => {
      const { type, payload } = action.payload;

      // Check for duplicates in array fields
      if (type === 'shopData') {
        const existing = state.bodies.find(
          (body) =>
            body.type === 'shopData' &&
            body.payload.customerCode === payload.customerCode
        );
        if (!existing) {
          state.bodies.push({
            ...payload,
            managerCode: 'MANAGER123', // Example manager code
            date: new Date().toISOString(),
            deviceId: 'DEVICE123', // Example device ID
            status: 'draft',
          });
        }
      } else {
        state.bodies.push({
          ...payload,
          managerCode: 'MANAGER123',
          date: new Date().toISOString(),
          deviceId: 'DEVICE123',
          status: 'draft',
        });
      }
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const body = state.bodies.find((b) => b.id === id);
      if (body) {
        body.status = status;
      }
    },
  },
});

export const { addBody, updateStatus } = postsSlice.actions;
export default postsSlice.reducer;
