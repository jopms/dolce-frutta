import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeProduct, addProduct } from '@/redux/basket/basketSlice'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { BasketProduct, Product } from '@/models/Interfaces'

const AddAndRemoveButton = (props: { product: Product | BasketProduct, amount: number }) => {
  const dispatch = useDispatch()
  const [add, setAdd] = useState(0)

  const updateProduct = (product: Product | BasketProduct, value: number): void => {
    setAdd(add + value)
    const basketProduct: BasketProduct = {
      amount: value,
      id: product.id,
      name: product.name,
      price: product.price
    }
    dispatch(value > 0 ? addProduct(basketProduct) : removeProduct(basketProduct))
  }

  return <div className="flex">
    <Button className="mr-1" size="small" shape="circle" icon={<MinusOutlined/>}
            onClick={() => updateProduct(props.product, -1)}/>
    <Button size="small" shape="circle" icon={<PlusOutlined/>}
            onClick={() => updateProduct(props.product, 1)}/>
  </div>
}

export default AddAndRemoveButton
