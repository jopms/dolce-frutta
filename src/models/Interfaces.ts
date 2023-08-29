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

export type { Product }
