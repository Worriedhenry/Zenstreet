import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of your form state


const initialState = {
  name: '',
  username: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
};


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setAddressLine1(state, action) {
      state.addressLine1 = action.payload;
    },
    setAddressLine2(state, action) {
      state.addressLine2 = action.payload;
    },
  },
});

export const { setName, setUsername, setEmail, setAddressLine1, setAddressLine2 } = formSlice.actions;

export default formSlice.reducer;
