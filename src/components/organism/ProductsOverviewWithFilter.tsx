import { Product } from '@/models/Interfaces'
import ProductCard from '@/components/molecule/ProductCard'
import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import RestApi from '@/api/RestApi'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ProductsOverviewWithFilter = () => {
  const { t } = useTranslation()
  const products = useSelector((state: any) => state.products.value as Array<Product>)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [options, setOptions] = useState([] as SelectProps['options'])

  const useRestApi = new RestApi()

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

  return <div
    className="absolute flex w-full flex-col pt-10"
  >
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
              key={product.id}
              product={product}
            />)}
        </div>
      </>
    }
    </div>
}

export default ProductsOverviewWithFilter
