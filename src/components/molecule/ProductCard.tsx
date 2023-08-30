import { Button, Card, Skeleton } from 'antd'
import { useState } from 'react'
// @ts-ignore
import ProductFallback from '@/assets/images/product-fallback.svg'
import { BasketProduct, Product } from '@/models/Interfaces'
import { useDispatch } from 'react-redux'
import { removeProduct, addProduct } from '@/redux/basket/basketSlice'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const ProductCard = (props: { product: Product, amount: number }) => {
  const {Meta} = Card
  const [imageLoaded, setImageLoaded] = useState(false)
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

  return <Card
    size="small"
    className={'mx-6 my-4 h-64'}
    cover={
      <>
        {!imageLoaded && <Skeleton.Image active={true}
                                    className={'absolute !h-44 !w-[101%] bg-white'}/>}
        <img
          alt="example"
          className={`h-44 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={({currentTarget}) => {
            currentTarget.onerror = null
            currentTarget.style.backgroundColor = '#f2f2f2'
            currentTarget.style.objectFit = 'fill'
            currentTarget.src = ProductFallback
          }}
          src={`https://api.predic8.de${props.product.image_link}`}/>
      </>
    }
  >
    <div className="flex justify-between">
      <Meta description={`${props.product.price} chf/kg`}
            title={props.product.name}/>
      <div className="flex flex-col">
        <div className="mx-auto">
          {props.amount}
        </div>
        <div>
          <Button size="small" shape="circle" icon={<MinusOutlined />} onClick={() => removeOneProduct(props.product)} />
          <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => addOneProduct(props.product)} />
        </div>
      </div>
    </div>
  </Card>
}

export default ProductCard
