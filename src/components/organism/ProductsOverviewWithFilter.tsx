import { JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setProducts } from '@/redux/products/productsSlice'
import { Select, SelectProps, Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import ProductCard from '@/components/molecule/ProductCard'
import { BasketProduct, Product, Vendor } from '@/models/Interfaces'
import RestApi from '@/api/RestApi'
import { MAX_RESULTS } from '@/helper/globals'

const ProductsOverviewWithFilter = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const products = useSelector((state: { products: { value: Array<Product> } }) => state.products.value)
  const basketProducts = useSelector((state: { basket: { products: Array<BasketProduct> } }) => state.basket.products)
  const loading = useSelector((state: { products: { loading: boolean } }) => state.products.loading)
  const [filters, setFilters] = useState([] as Array<number>)
  const [options, setOptions] = useState([] as SelectProps['options'])
  const [messageApi, contextHolder] = message.useMessage()

  const useRestApi = new RestApi()

  const antIcon = <LoadingOutlined style={{color: 'grey', fontSize: 48}}/>

  useEffect(() => {
    const vendors = [] as Array<Vendor>

    if (vendors.length === 0) {
      void useRestApi.getVendors().then(({data}) => {
        if (vendors.length === 0) {
          vendors.push(...data.vendors)
        }

        const vendorsOptions = [] as SelectProps['options']

        for (let i = 0; i < vendors.length; i++) {
          if (options !== undefined) {
            vendorsOptions?.push({
              label: vendors[i].name,
              value: vendors[i].id
            })
          }
        }
        setOptions(vendorsOptions)
      })
    }

    if (products.length === 0) {
      dispatch(setLoading(true))
      void useRestApi.getProducts('', MAX_RESULTS).then(async ({data}) => {
        const productsWithDescriptions = [] as Array<Product>

        for (const product of data.products) {
          await useRestApi.getProduct(product.id).then((productWithDescription) => {
            productsWithDescriptions.push(productWithDescription.data)
          })
        }

        dispatch(setProducts(productsWithDescriptions))
        dispatch(setLoading(false))
      }).catch(() => {
        messageApi.open({
          content: t('products.service.fail'),
          type: 'error'
        })
      })
    }
  }, [])

  const getAmount = (id: number): number => {
    const product = basketProducts.find((p) => p.id === id)
    return product?.amount ?? 0
  }

  const renderProducts = (): JSX.Element => {
    let filteredProducts = products

    if (filters.length > 0 && products.length > 0) {
      const idSet = new Set(filters)
      filteredProducts = products.filter((product) =>
        product.vendors?.some((vendor) => idSet.has(vendor.id))
      )
    }

    return <>
      {filteredProducts.map((product) =>
        <ProductCard
          key={`${product.name}-${product.id}`}
          amount={getAmount(product.id)}
          product={product}
        />)}
    </>
  }

  return <div
    className="absolute left-1/2 flex w-full max-w-7xl -translate-x-1/2 flex-col pt-10"
  >
    {contextHolder}
    {<Spin
      className={'mt-5'}
      tip={t('products.loading.text')}
      indicator={antIcon} spinning={loading}
      wrapperClassName="spin-text"
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
                placeholder={t('products.filter.vendors.placeholder')}
                options={options}
                onChange={setFilters}
                filterOption={(input, option) =>
                  String(option?.label).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  String(option?.value).toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </div>
          </div>
          <div className="grid h-full w-full grid-cols-min-max justify-center">
            {renderProducts()}
          </div>
        </>
      }
    </Spin>}
  </div>
}

export default ProductsOverviewWithFilter
