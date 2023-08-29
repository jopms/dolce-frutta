import { Button, Card, Skeleton } from 'antd'
import { useState } from 'react'
import ProductFallback from '@/assets/images/product-fallback.svg'
import { setLoading } from '@/redux/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '@/models/Interfaces'

const ProductCard = (props: { product: Product }) => {
  const {Meta} = Card
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.counter.loading)

  const [add, setAdd] = useState(0)

  const plus = '+'
  const minus = '-'

  return <Card
    size="small"
    className={'mx-6 my-4 h-64'}
    cover={
      <>
        {loading && <Skeleton.Image active={true}
                                    className={'absolute !h-44 !w-[101%] bg-white'}/>}
        <img
          alt="example"
          className={`h-44 w-full object-cover ${loading ? 'hidden' : ''}`}
          onLoad={() => dispatch(setLoading(false))}
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
          {add}
        </div>
        <div>
          <Button onClick={() => setAdd(add - 1)}>
            {minus}
          </Button>
          <Button onClick={() => setAdd(add + 1)}>
            {plus}
          </Button>
        </div>
      </div>
    </div>
  </Card>
}

export default ProductCard
