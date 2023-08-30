import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
// @ts-ignore
import Logo from '@/assets/images/logo.png'
// @ts-ignore
import EmptyBasket from '@/assets/images/empty-basket.svg'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Modal, Divider, Badge } from 'antd'
import { JSX, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restoreProductsFromLocalStorage } from '@/redux/basket/basketSlice'
import { BasketProduct } from '@/models/Interfaces'
import { LocalStorage } from '@/models/Enums'
import AddAndRemoveButton from '@/components/molecule/AddAndRemoveButton'

const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const basketProducts = useSelector((state: { basket: { products : Array<BasketProduct> } }) => state.basket.products)

  const dispatch = useDispatch()

  const showModal = ():void => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const renderBasket = (): JSX.Element => {
    const total = basketProducts.reduce((a, c) => a + Number(c.price) * c.amount, 0)

    return <div className="my-6 min-h-[5rem]">
      {total > 0 ?
        <>
          <div>
          {basketProducts.map((basketProduct: BasketProduct, i) => <div key={basketProduct.id}>
            <div className="flex">
              <AddAndRemoveButton product={basketProduct as any} amount={basketProduct.amount} />
              <span className="flex w-full" >
                    <div className="ml-4 flex w-full justify-between">
                      <span>{`${basketProduct.amount}x ${basketProduct.name}`}</span>
                      <span>{`${(Number(basketProduct.price) * basketProduct.amount).toFixed(2)}chf`}</span>
                    </div>
                </span>
            </div>
              {i < basketProducts.length - 1 && <Divider className="my-3"/>}
            </div>
          )}
        </div>
          <div className="mt-10">
            <Divider className="my-3"/>
            <span className="flex justify-between">{'Total: '}<b>{`${total.toFixed(2)}chf`}</b></span>
          </div>
        </> :
        <div className="flex flex-col justify-center">
          <img className="h-24" src={EmptyBasket} alt="empty basker" />
          <span className="mx-auto mt-4 text-[1rem]">{t('basket.empty')}</span>
        </div>}
    </div>
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
        <div className="mx-auto flex max-w-6xl flex-col items-center p-6 md:flex-row">
          <img
            src={Logo}
            className="mx-auto mb-4 h-16 md:mx-0 md:mb-0 md:mr-10"
          />

          <div className="flex w-full">
            <Search
              placeholder={t('main.search.placeholder')}
            />
            <Badge count={getBasketSize()}>
              <Button
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="ml-3"
                onClick={showModal}
              />
            </Badge>
          </div>
        </div>
      </header>
      <Modal
        open={open}
        title={t('basket.title')}
        onCancel={handleCancel}
        footer={[]}
      >
        <div>{renderBasket()}</div>
      </Modal>
  </>
)
}

export default Header
