import { createSelector, createSlice } from '@reduxjs/toolkit'
import { BasketProduct } from '@/models/Interfaces'

export const basketSlice = createSlice({
  initialState: {
    products: [] as Array<BasketProduct>
  },
  name: 'basket',
  reducers: {
    addProduct: ({ products }, { payload }: { payload: BasketProduct}): void => {
      const productToUpdate = products.find((product) => product.id === payload.id)

      if (products.length === 0 || productToUpdate === undefined) {
        products.push(payload)
        return
      }

      productToUpdate.amount += payload.amount
    },
    removeProduct: ({ products }, { payload }: { payload: BasketProduct}): void => {
      const indexProductToUpdate = products.findIndex((product) => product.id === payload.id)
      const productToUpdate = products[indexProductToUpdate]

      if (products.length === 0 || productToUpdate === undefined) {
        return
      }

      if (productToUpdate.amount > 1) {
        productToUpdate.amount += payload.amount
      } else {
        products.splice(indexProductToUpdate, 1)
      }
    }
  }
})

export const { removeProduct, addProduct } = basketSlice.actions

export default basketSlice.reducer

const selectProducts = (state: any) => state.products

const selectSum = createSelector(
  selectProducts,
  (products) => products
)
