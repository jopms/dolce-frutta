import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/products/productsSlice'
import { debounce } from 'lodash-es'
import Fuse from 'fuse.js'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Product } from '@/models/Interfaces'

const Search = (props: { placeholder: string }) => {
  const dispatch = useDispatch()
  const products = useSelector((state: { products: { value: Array<Product> }}) => state.products.value)
  const [allProducts, setAllProducts] = useState(products)

  const options = {
    keys: ['name'],
    threshold: 0.4
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (allProducts.length > 0) {
      const searchedValue = e.target?.value?.trim()

      if (searchedValue === '') {
        dispatch(setProducts(allProducts))
        return
      }

      const fuse = new Fuse(allProducts, options)
      const filteredProducts = fuse.search(searchedValue).map((p) => p.item) as unknown as Array<Product>

      dispatch(setProducts(filteredProducts))
    }
  }

  useEffect(() => {
    if (allProducts.length === 0 && products.length > 0) {
      setAllProducts(products)
    }
  }, [products])

  return (
    <>
      <Input
        prefix={<SearchOutlined/>}
        className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
        placeholder={props.placeholder}
        bordered={false}
        onKeyUp={debounce(onInput, 200) as any}
      />
    </>
  )
}

export default Search
