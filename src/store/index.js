import { configureStore } from "@reduxjs/toolkit";
import stockReducer from './Stock.store'

const store = configureStore({
  reducer: {
    stock: stockReducer
  }
})

export default store