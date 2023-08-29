import { createSlice } from '@reduxjs/toolkit'
import { BasketProduct } from '@/models/Interfaces'

export const basketSlice = createSlice({
  initialState: {
    products: [] as Array<BasketProduct>
  },
  name: 'basket',
  reducers: {
    addProduct: ({ products }, { payload }: { payload: BasketProduct}) => {
      const productToUpdate = products.find((product) => product.id === payload.id)

      if (products.length === 0 || productToUpdate === undefined) {
        products.push(payload)
        return
      }

      productToUpdate.amount += payload.amount
    },
    deleteProducts: ({ products }) => {
      products.splice(0, products.length)
    }
  }
})

export const { deleteProducts, addProduct } = basketSlice.actions

export default basketSlice.reducer
