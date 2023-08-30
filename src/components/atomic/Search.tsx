import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/products/productsSlice'
import { useTranslation } from 'react-i18next'
import { Product } from '@/models/Interfaces'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { debounce } from 'lodash-es'

const Search = (props: { placeholder: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const products = useSelector((state: any) => state.products.value as Array<Product>)
  const [allProducts, setAllProducts] = useState(products)

  const options = {
    keys: ['name'],
    threshold: 0.4
  }

  const onInput = (e: any): void => {
    if (allProducts.length > 0) {
      if (e.target.value.trim() === '') {
        dispatch(setProducts(allProducts))
        return
      }

      const fuse = new Fuse(allProducts, options)
      const filteredProducts = fuse.search(e.target.value.trim()).map((p) => p.item) as unknown as Array<Product>
      dispatch(setProducts(filteredProducts))
    }
  }

  useEffect(() => {
    console.log(allProducts)
    if (allProducts.length === 0 && products.length > 0) {
      setAllProducts(products)
    }
  },[products])

  return (
      <>
        <Input
          prefix={<SearchOutlined />}
          className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
          placeholder={props.placeholder}
          bordered={false}
          onKeyUp={debounce(onInput, 200)}
        />
      </>
    )
}

export default Search
