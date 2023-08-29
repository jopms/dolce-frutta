import Header from '@/components/molecule/Header'
import { useSelector } from 'react-redux'
import { JSX } from 'react'
import ProductCard from '@/components/molecule/ProductCard'

const Main = () => {
  const count = useSelector((state: any) => state.counter.value)

  const productsRendered = (): JSX.Element => {
    return count.map((product: any) => <ProductCard key={product.id} product={product} />)
  }

  return (
    <div className="h-full">
      <Header />
      <div
        className="grid min-h-full min-w-full grid-cols-min-max justify-center bg-gray-50"
      >
        {productsRendered()}
      </div>
    </div>
  )
}

export default Main
