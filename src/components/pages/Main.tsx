import Header from '@/components/molecule/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Skeleton } from 'antd'
import { JSX } from 'react'
import { setLoading } from '@/redux/counter/counterSlice'
import ProductFallback from '@/assets/images/product-fallback.svg'

const Main = () => {
  const dispatch = useDispatch()

  const count = useSelector((state: any) => state.counter.value)
  const loading = useSelector((state: any) => state.counter.loading)

  const stopLoading = (): void => {
    dispatch(setLoading(false))
  }

  const { Meta } = Card

  const productsRendered = (): JSX.Element => {
    return count.map((product: any) =>
      <Card
        key={product.id}
        className={"h-64 w-full"}
        cover={
          <>
            {loading && <Skeleton.Image active={true} className={"absolute !w-full !h-40 bg-white"}/>}
            <img
              alt="example"
              className={`h-40 w-full object-cover ${loading ? "hidden" : ""}`}
              onLoad={stopLoading}
              onError={({ currentTarget }) =>
              {
                currentTarget.onerror = null
                currentTarget.style.backgroundColor = '#f2f2f2'
                currentTarget.style.objectFit = 'fill'
                currentTarget.src = ProductFallback
              }}
              src={`https://api.predic8.de${product.image_link}`} />
          </>
        }
      >
      <Meta description={product.price} title={product.name}/>
      </Card>)
  }

  return (
    <div className="h-full">
      <Header />
      <div
        className="grid grid-cols-min-max gap-8 px-8 bg-gray-50 min-w-full min-h-full"
      >
        {productsRendered()}
      </div>
    </div>
  )
}

export default Main
