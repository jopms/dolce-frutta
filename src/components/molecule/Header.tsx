import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'

const Header = () => {
const { t } = useTranslation()

  return (
    <header className="flex flex-col p-6 sm:flex-row">
      <img
        src={Logo}
        className="mx-auto mb-4 h-8 w-max sm:mb-0 sm:mr-10 sm:h-12"
      />

      <Search placeholder={t('main.search.placeholder')} />
    </header>
)
}

export default Header
