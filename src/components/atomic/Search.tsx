import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import RestApi from '@/api/RestApi'
import { MAX_RESULTS } from '@/helper/globals'

const Search = (props: { placeholder: string }) => {
  const useRestApi = new RestApi()

  const onInput = async (e: any): Promise<void> => {
    if (e.key === 'Enter') {
      const { data } = await useRestApi.getProducts(String(e.target.value), MAX_RESULTS)

      console.log(data.products)
    }
  }

  return (
      <Input
        prefix={<SearchOutlined />}
        className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
        placeholder={props.placeholder}
        size="large"
        bordered={false}
        onKeyDown={onInput}
      />
    )
}

export default Search
