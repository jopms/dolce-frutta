import { useTranslation } from 'react-i18next'

const Header = () => {

  const { t } = useTranslation()

    return (
      <div>{ t('header.login') }</div>
    )
}

export default Header
