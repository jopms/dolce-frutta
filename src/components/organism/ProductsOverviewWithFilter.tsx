import { BasketProduct, Product } from '@/models/Interfaces'
import ProductCard from '@/components/molecule/ProductCard'
import { Select, SelectProps, Spin } from 'antd'
import { useEffect, useState } from 'react'
import RestApi from '@/api/RestApi'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { LoadingOutlined } from '@ant-design/icons'
import { MAX_RESULTS } from '@/helper/globals'
import { setLoading, setProducts } from '@/redux/products/productsSlice'

const ProductsOverviewWithFilter = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const products = useSelector((state: any) => state.products.value as Array<Product>)
  const basketProducts = useSelector((state: any) => state.basket.products as Array<BasketProduct>)
  const loading = useSelector((state: any) => state.products.loading)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [options, setOptions] = useState([] as SelectProps['options'])

  const useRestApi = new RestApi()

  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: 'grey' }} />

  useEffect(() => {
    const vendors = [] as any

    if (vendors.length === 0) {
      void useRestApi.getVendors().then(({ data }: any) => {
        if (vendors.length === 0) {
          vendors.push(...data.vendors)
        }

        const vendorsArray = [] as any

        for (let i = 0; i < vendors.length; i++) {
          if (options !== undefined) {
            vendorsArray.push({
              label: vendors[i].name,
              value: vendors[i].id
            })
          }
        }
        setOptions(vendorsArray)
      })
    }

    if (products.length === 0) {
      dispatch(setLoading(true))
      void useRestApi.getProducts('', MAX_RESULTS).then(async ({data}) => {
        const productsWithDescriptions = [] as Array<Product>

        for (const product of data.products) {
          await useRestApi.getProduct((product as any).id).then((productWithDescription) => {
            console.log(productWithDescription)
            productsWithDescriptions.push(productWithDescription.data)
          })
        }

        dispatch(setProducts(productsWithDescriptions))
        dispatch(setLoading(false))
      })
    }
  }, [])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const applyVendorsFilter = (ids: Array<number>): void => {
    if (ids.length > 0 && products.length > 0) {
      const idSet = new Set(ids)
      setFilteredProducts(products.filter((product) =>
        product.vendors?.some((vendor) => idSet.has(vendor.id))
      ))
    } else {
      setFilteredProducts(products)
    }
  }

  const getAmount = (id: number): number => {
    const product = basketProducts.find((p) => p.id === id)
    return product?.amount ?? 0
  }

  return <div
    className="absolute left-1/2 flex w-full max-w-7xl -translate-x-1/2 flex-col pt-10"
  >
    {<Spin className={'absolute'} indicator={antIcon} spinning={loading}>
    {
      products.length > 0 && options && options.length > 0 &&
      <>
        <div className="w-full">
          <div className="mx-6 mb-4 flex flex-col xs:w-96">
          <span>
          {t('products.filter.vendors.label')}
        </span>
            <Select
              mode="multiple"
              placeholder="All vendors"
              options={options}
              onChange={applyVendorsFilter}
              filterOption={(input, option) =>
                String(option?.label).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                String(option?.value).toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </div>
        </div>
        <div className="grid h-full w-full grid-cols-min-max justify-center">
          {filteredProducts.map((product) =>
            <ProductCard
              key={`${product.name}-${product.id}`}
              amount={getAmount(product.id)}
              product={product}
            />)}
        </div>
      </>
    }
    </Spin>}
    </div>
}

export default ProductsOverviewWithFilter
