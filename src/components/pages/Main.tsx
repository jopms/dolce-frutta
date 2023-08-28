import Header from '@/components/molecule/Header'
import { useSelector } from 'react-redux'
import { Card } from 'antd'
import { JSX } from 'react'

const Main = () => {
  const count = useSelector((state: any) => state.counter.value)

  const productsRendered = (): JSX.Element => {
    const { Meta } = Card

    return count.map((product: any) => <Card
        key={product.id}
        hoverable
        style={{width: 240}}
        cover={<img alt="example"
                    src={`https://api.predic8.de${product.image_link}`}/>}
      >
      <Meta description={product.price} title={product.name}/>
      </Card>)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Header />
      <span>{productsRendered()}</span>
    </div>
  )
}

export default Main
