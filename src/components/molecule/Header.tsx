import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Header = () => {
const { t } = useTranslation()

  return (
    <header className="mx-auto flex max-w-6xl flex-col items-center p-6 md:flex-row">
      <img
        src={Logo}
        className="mx-auto mb-4 h-16 md:mx-0 md:mb-0 md:mr-10"
      />

      <div className="flex w-full">
        <Search placeholder={t('main.search.placeholder')} />
        <Button
          shape="circle"
          size="large"
          icon={<ShoppingCartOutlined />}
          className="ml-3"
        />
      </div>
    </header>
)
}

export default Header
