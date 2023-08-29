import { Product } from '@/models/Interfaces'
import ProductCard from '@/components/molecule/ProductCard'
import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import RestApi from '@/api/RestApi'
import { useSelector } from 'react-redux'

const ProductsOverviewWithFilter = () => {
  const count = useSelector((state: any) => state.counter.value as Array<Product>)
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

  return <>
    {(options as any)?.length > 0 &&
      <Select
        mode="multiple"
        placeholder="All vendors"
        options={options}
        filterOption={(input, option) =>
          String(option?.label).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          String(option?.value).toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />}
    {count.map((product) =>
      <ProductCard
        key={product.id}
        product={product}
      />)}
    </>
}

export default ProductsOverviewWithFilter
