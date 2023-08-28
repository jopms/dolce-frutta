import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  initialState: {
    value: []
  },
  name: 'counter',
  reducers: {
    incrementByAmount: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
