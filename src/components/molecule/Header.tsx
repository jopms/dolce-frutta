import { useTranslation } from 'react-i18next'
import Search from '@/components/atomic/Search'
import Logo from '@/assets/images/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Modal, Divider, Badge } from 'antd'
import { JSX, useState } from 'react'
import { useSelector } from 'react-redux'
import { BasketProduct } from '@/models/Interfaces'

const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const basketProducts = useSelector((state: { basket: { products : Array<BasketProduct> } }) => state.basket.products)

  const showModal = ():void => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const renderBasket = (): JSX.Element => {
    const total = basketProducts.reduce((a, c) => a + Number(c.price) * c.amount, 0)

    return <div className="my-6 min-h-[5rem]">
      <div>
        {basketProducts.map((basketProduct: BasketProduct, i) => <div key={basketProduct.id}>
        <span className="flex justify-between">
          <span>{`${basketProduct.amount}x ${basketProduct.name}`}</span>
          <span>{`${(Number(basketProduct.price) * basketProduct.amount).toFixed(2)}chf`}</span>
        </span>
        {i < basketProducts.length - 1 && <Divider className="my-1"/>}
        </div>
        )}
      </div>
      <span className="mt-8 flex justify-between">{'Total: '}<b>{`${total.toFixed(2)}chf`}</b></span>
    </div>
  }

  const getBasketSize = (): number => basketProducts.reduce((a, c) => a + c.amount, 0)

  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center p-6 md:flex-row">
          <img
            src={Logo}
            className="mx-auto mb-4 h-16 md:mx-0 md:mb-0 md:mr-10"
          />

          <div className="flex w-full">
            <Search placeholder={t('main.search.placeholder')} />
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
        title="Basket"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>{renderBasket()}</div>
      </Modal>
  </>
)
}

export default Header
