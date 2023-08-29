import Header from '@/components/molecule/Header'
import ProductsOverviewWithFilter from '@/components/organism/ProductsOverviewWithFilter'

const Main = () => {
  return (
    <div className="h-full">
      <Header />
      <div
        className="grid min-h-full min-w-full grid-cols-min-max justify-center bg-gray-50"
      >
        <ProductsOverviewWithFilter />
      </div>
    </div>
  )
}

export default Main
