import { createSlice } from '@reduxjs/toolkit'
import { Product } from '@/models/Interfaces'

export const counterSlice = createSlice({
  initialState: {
    loading: false,
    value: [] as Array<Product>
  },
  name: 'counter',
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setProducts: (state, action: { payload: Array<Product> }) => {
      state.value = action.payload
    }
  }
})

export const { setLoading, setProducts } = counterSlice.actions

export default counterSlice.reducer
