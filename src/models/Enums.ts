enum RouterPath {
  base = '/'
}

enum RestApiEndpoint {
  products = 'https://api.predic8.de/shop/v2/products',
  vendors = 'https://api.predic8.de/shop/v2/vendors'
}

enum LocalStorage {
  prefix = '[DolceFrutta]-',
  basketStore = 'basket'
}

export { RouterPath, RestApiEndpoint, LocalStorage }
