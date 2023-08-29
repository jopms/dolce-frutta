import { Card } from 'antd'
import { useEffect } from 'react'

const ProductCard = () => {
  const { Meta } = Card

  const componentDidLoad = (): void => {
    console.log('loaded!')
  }

  useEffect(() => {
    componentDidLoad()
  }, [])

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  )
}

export default ProductCard
