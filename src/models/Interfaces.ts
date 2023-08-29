interface Vendor {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  price: string
  image_link: string
  vendors: Array<Vendor>
}

interface BasketProduct extends Omit<Product, 'image_link' | 'vendors'> {
  amount: number
}

export type { Product, BasketProduct }
