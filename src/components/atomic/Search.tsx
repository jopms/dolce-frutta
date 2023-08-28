import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search = (props: { placeholder: string }) => {
  return (
      <Input
        prefix={<SearchOutlined />}
        className={"bg-gray-200 hover:bg-gray-200 rounded-3xl [&>input]:ml-2"}
        placeholder={props.placeholder}
        size="large"
        bordered={false}
      />
    )
}

export default Search
