import { Card, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import RestApi from '@/api/RestApi'
import { MAX_RESULTS } from '@/helper/globals'
import { JSX, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/redux/counter/counterSlice'

const Search = (props: { placeholder: string }) => {
  const useRestApi = new RestApi()
  const [products, setProducts] = useState()
  const count = useSelector((state: any) => state.counter.value)
  const dispatch = useDispatch()

  const incrementText = 'Increment'
  const decrementText = 'Decrement'

  const renderProducts = (data: Array<any>): JSX.Element => {
    const { Meta } = Card

    return (
      <>
        {data.map((product) =>
          <Card
            key={product.id}
            hoverable
            style={{width: 240}}
            cover={<img alt="example"
                        src={`https://api.predic8.de${product.image_link}`}/>}
          >
            <Meta title={product.name} description={product.price} />
          </Card>
        )}
      </>
    )
  }

  const onInput = async (e: any): Promise<void> => {
    if (e.key === 'Enter') {
      const { data } = await useRestApi.getProducts(String(e.target.value), MAX_RESULTS)
      const productsWithDescriptions = []

      for (const product of data.products) {
        const productWithDescription = await useRestApi.getProduct((product as any).id)
        productsWithDescriptions.push(productWithDescription.data)
      }

      console.log(productsWithDescriptions)

      setProducts(renderProducts(productsWithDescriptions) as any)
    }
  }

  return (
      <>
        <Input
          prefix={<SearchOutlined />}
          className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
          placeholder={props.placeholder}
          size="large"
          bordered={false}
          onKeyDown={onInput}
        />
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            { incrementText }
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            { decrementText }
          </button>
        </div>
        {products}
      </>
    )
}

export default Search
