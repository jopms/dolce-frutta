import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search = (props: { placeholder: string }) => {
  return (
      <Input
        prefix={<SearchOutlined />}
        className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
        placeholder={props.placeholder}
        size="large"
        bordered={false}
      />
    )
}

export default Search
