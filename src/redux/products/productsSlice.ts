import { createSlice } from '@reduxjs/toolkit'
import { Product } from '@/models/Interfaces'

export const productsSlice = createSlice({
  initialState: {
    loading: false,
    value: [] as Array<Product>
  },
  name: 'products',
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setProducts: (state, action: { payload: Array<Product> }) => {
      state.value = action.payload
    }
  }
})

export const { setLoading, setProducts } = productsSlice.actions

export default productsSlice.reducer
