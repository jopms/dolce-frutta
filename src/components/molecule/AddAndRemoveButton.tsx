import { Button } from 'antd'
import { useState } from 'react'
import { BasketProduct, Product } from '@/models/Interfaces'
import { useDispatch } from 'react-redux'
import { removeProduct, addProduct } from '@/redux/basket/basketSlice'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const AddAndRemoveButton = (props: { product: Product, amount: number }) => {
  const dispatch = useDispatch()

  const [add, setAdd] = useState(0)

  const addOneProduct = (product: Product): void => {
    setAdd(add + 1)
    const basketProduct: BasketProduct = { amount: 1, id: product.id, name: product.name, price: product.price }
    dispatch(addProduct(basketProduct))
  }

  const removeOneProduct = (product: Product): void => {
    setAdd(add - 1)
    const basketProduct: BasketProduct = { amount: -1, id: product.id, name: product.name, price: product.price }
    dispatch(removeProduct(basketProduct))
  }

  return <div className="flex">
          <Button size="small" shape="circle" icon={<MinusOutlined />} onClick={() => removeOneProduct(props.product)} />
          <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => addOneProduct(props.product)} />
        </div>
}

export default AddAndRemoveButton
