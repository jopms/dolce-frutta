import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '@/redux/basket/basketSlice'
import productsReducer from '@/redux/products/productsSlice'

export default configureStore({
  reducer: {
    basket: basketReducer,
    products: productsReducer
  }
})
