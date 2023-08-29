import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '@/redux/basket/basketSlice'
import counterReducer from '@/redux/counter/counterSlice'

export default configureStore({
  reducer: {
    basket: basketReducer,
    counter: counterReducer
  }
})
