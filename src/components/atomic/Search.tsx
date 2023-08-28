import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Header = () => {

  const { t } = useTranslation()

    return (
      <Input
        prefix={<SearchOutlined />}
        className={"bg-gray-200 hover:bg-gray-200 rounded-3xl [&>input]:ml-2"}
        placeholder={t('main.search.placeholder')}
        size="large"
        bordered={false}
      />
    )
}

export default Header
