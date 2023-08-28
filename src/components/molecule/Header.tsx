import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Header = () => {
const { t } = useTranslation()

  return (
    <header className="flex flex-col p-6 sm:flex-row">
      <img
        src={Logo}
        className="mx-auto mb-4 h-8 w-max sm:mb-0 sm:mr-10 sm:h-12"
      />

      <div className="flex">
        <Search placeholder={t('main.search.placeholder')} />
        <Button
          shape="circle"
          size={'large'}
          icon={<ShoppingCartOutlined />}
          className="ml-3"
        />
      </div>
    </header>
)
}

export default Header
