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
        className={"h-64 w-64"}
        cover={
          <>
            {loading && <Skeleton.Image active={true} className={"absolute !w-64 !h-40 bg-white"}/>}
            <img
              alt="example"
              className={`h-40 w-64 object-cover ${loading ? "hidden" : ""}`}
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
    <div className="mx-auto max-w-6xl">
      <Header />
      <span>{count.map.length > 0 && productsRendered()}</span>
      {loading}
    </div>
  )
}

export default Main
