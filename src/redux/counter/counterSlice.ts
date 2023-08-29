import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  initialState: {
    value: [],
    loading: false
  },
  name: 'counter',
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setLoading, setProducts } = counterSlice.actions

export default counterSlice.reducer
