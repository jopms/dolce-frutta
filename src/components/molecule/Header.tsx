import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { restoreProductsFromLocalStorage } from '@/redux/basket/basketSlice'
import { Button, Modal, Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'
import { BasketProduct } from '@/models/Interfaces'
import { LocalStorage } from '@/models/Enums'
import Basket from '@/components/molecule/Basket'

const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const basketProducts = useSelector((state: { basket: { products: Array<BasketProduct> }}) => state.basket.products)

  const dispatch = useDispatch()

  const showModal = (status: boolean): void => {
    setOpen(status)
  }

  const getBasketSize = (): number => basketProducts.reduce((a, c) => a + c.amount, 0)

  useEffect(() => {
    const persistedBasket = localStorage.getItem(`${LocalStorage.prefix}${LocalStorage.basketStore}`)

    if (persistedBasket !== null && basketProducts.length === 0) {
      const basket = JSON.parse(persistedBasket)
      dispatch(restoreProductsFromLocalStorage(basket))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`${LocalStorage.prefix}${LocalStorage.basketStore}`, JSON.stringify(basketProducts))
  }, [basketProducts])

  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div
          className="mx-auto flex max-w-6xl flex-col items-center p-6 md:flex-row">
          <img
            alt="logo"
            src={Logo}
            className="mx-auto mb-4 h-16 md:mx-0 md:mb-0 md:mr-5"
          />

          <div className="flex w-full">
            <Search
              placeholder={t('main.search.placeholder')}
            />
            <Badge count={getBasketSize()}>
              <Button
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined/>}
                className="ml-5"
                onClick={() => showModal(true)}
              />
            </Badge>
          </div>
        </div>
      </header>
      <Modal
        open={open}
        title={t('basket.title')}
        onCancel={() => showModal(false)}
        footer={[]}
      >
        <Basket />
      </Modal>
    </>
  )
}

export default Header
