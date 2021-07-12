import { createSlice } from "@reduxjs/toolkit";

const stock = createSlice({
  name: 'stock',
  initialState: {
    token: '',
    auth: false
  },
  reducers: {
    setToken(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setToken } = stock.actions
export default stock.reducer