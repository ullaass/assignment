import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {}
  },
  reducers: {
    submitForm: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
