import { Card, Skeleton } from 'antd'
import { useState } from 'react'
import ProductFallback from '@/assets/images/product-fallback.svg'
import { Product } from '@/models/Interfaces'
import AddAndRemoveButton from '@/components/molecule/AddAndRemoveButton'
import { REST_API_PREFIX, CURRENCY, WEIGHT_UNIT } from '@/helper/globals'

const ProductCard = (props: { product: Product, amount: number }) => {
  const {Meta} = Card
  const [imageLoaded, setImageLoaded] = useState(false)

  return <Card
    size="small"
    className={'mx-6 my-4 h-64'}
    cover={
      <>
        {!imageLoaded &&
          <Skeleton.Image
            active={true}
            className={'absolute !h-44 !w-[101%] bg-white'}
          />}
        <img
          alt="fruit"
          className={`h-44 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={({currentTarget}) => {
            currentTarget.onerror = null
            currentTarget.style.backgroundColor = '#f2f2f2'
            currentTarget.style.objectFit = 'fill'
            currentTarget.src = ProductFallback
          }}
          src={`${REST_API_PREFIX}${props.product.image_link}`}/>
      </>
    }
  >
    <div className="flex justify-between">
      <Meta
        description={`${props.product.price} ${CURRENCY}/${WEIGHT_UNIT}`}
        title={props.product.name}
      />
      <div className="flex flex-col">
        <div className="mx-auto">
          {props.amount}
        </div>
        <AddAndRemoveButton
          product={props.product}
          amount={props.amount}
        />
      </div>
    </div>
  </Card>
}

export default ProductCard
