import { JSX } from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'
import { BasketProduct } from '@/models/Interfaces'
import AddAndRemoveButton from '@/components/molecule/AddAndRemoveButton'
import { CURRENCY } from '@/helper/globals'
import EmptyBasket from '@/assets/images/empty-basket.svg'
import { useTranslation } from 'react-i18next'

const Basket = () => {
  const { t } = useTranslation()

  const basketProducts = useSelector((state: { basket: { products: Array<BasketProduct> } }) => state.basket.products)

  const renderBasket = (): JSX.Element => {
    const total = basketProducts.reduce((a, c) => a + Number(c.price) * c.amount, 0)

    return <div className="my-6 min-h-[5rem]">
      {total > 0 ?
        <>
          <div>
            {basketProducts.map((basketProduct: BasketProduct, i) => <div
                key={basketProduct.id}>
                <div className="flex">
                  <AddAndRemoveButton
                    product={basketProduct}
                    amount={basketProduct.amount}
                  />
                  <span className="flex w-full">
                    <div className="ml-4 flex w-full justify-between">
                      <span>{`${basketProduct.amount}x ${basketProduct.name}`}</span>
                      <span>{`${(Number(basketProduct.price) * basketProduct.amount).toFixed(2)} ${CURRENCY}`}</span>
                    </div>
                </span>
                </div>
                {i < basketProducts.length - 1 && <Divider className="my-3"/>}
              </div>
            )}
          </div>
          <div className="mt-10">
            <Divider className="my-3"/>
            <span className="flex justify-between">
              {t('basket.total')}<b>{`${total.toFixed(2)} ${CURRENCY}`}</b>
            </span>
          </div>
        </> :
        <div className="flex flex-col justify-center">
          <img
            className="h-24"
            src={EmptyBasket}
            alt="empty basket"
          />
          <span className="mx-auto mt-4 text-[1rem]">{t('basket.empty')}</span>
        </div>}
    </div>
  }

  return <div>
    {renderBasket()}
  </div>
}

export default Basket
