import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  initialState: {
    products: []
  },
  name: 'products',
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
