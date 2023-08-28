import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'

const Header = () => {
const { t } = useTranslation()

  return (
    <header className="flex p-6">
      <img
        src={Logo}
        className="mr-10 h-12"
      />

      <Search placeholder={t('main.search.placeholder')} />
    </header>
)
}

export default Header
