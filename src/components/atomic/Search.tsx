import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import RestApi from '@/api/RestApi'
import { MAX_RESULTS } from '@/helper/globals'
import { useDispatch } from 'react-redux'
import { setLoading, setProducts } from '@/redux/products/productsSlice'
import { useTranslation } from 'react-i18next'

const Search = (props: { placeholder: string, disabled: boolean }) => {
  const { t } = useTranslation()
  const useRestApi = new RestApi()
  const dispatch = useDispatch()

  const onInput = async (e: any): Promise<void> => {
    if (e.key === 'Enter' && !props.disabled) {
      dispatch(setLoading(true))
      const { data } = await useRestApi.getProducts(String(e.target.value), MAX_RESULTS)
      const productsWithDescriptions = []

      for (const product of data.products) {
        const productWithDescription = await useRestApi.getProduct((product as any).id)
        productsWithDescriptions.push(productWithDescription.data)
      }

      dispatch(setProducts(productsWithDescriptions))
      dispatch(setLoading(false))
    }
  }

  return (
      <>
        <Input
          prefix={<SearchOutlined />}
          className={'rounded-3xl bg-gray-100 hover:bg-gray-100 [&>input]:ml-2'}
          placeholder={props.placeholder}
          bordered={false}
          onKeyDown={onInput}
        />
        <Button>
          {t('main.search.showAll')}
        </Button>
      </>
    )
}

export default Search
