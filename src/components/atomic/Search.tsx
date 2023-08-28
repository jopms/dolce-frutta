import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import RestApi from '@/api/RestApi'
import { MAX_RESULTS } from '@/helper/globals'
import { useDispatch } from 'react-redux'
import { incrementByAmount } from '@/redux/counter/counterSlice'

const Search = (props: { placeholder: string }) => {
  const useRestApi = new RestApi()
  const dispatch = useDispatch()

  const onInput = async (e: any): Promise<void> => {
    if (e.key === 'Enter') {
      const { data } = await useRestApi.getProducts(String(e.target.value), MAX_RESULTS)
      const productsWithDescriptions = []

      for (const product of data.products) {
        const productWithDescription = await useRestApi.getProduct((product as any).id)
        productsWithDescriptions.push(productWithDescription.data)
      }

      dispatch(incrementByAmount(productsWithDescriptions))
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
        </div>
      </>
    )
}

export default Search
