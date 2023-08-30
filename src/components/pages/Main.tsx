import Header from '@/components/molecule/Header'
import ProductsOverviewWithFilter
  from '@/components/organism/ProductsOverviewWithFilter'

const Main = () => {
  return (
    <div className="h-full">
      <Header/>
      <ProductsOverviewWithFilter/>
    </div>
  )
}

export default Main
