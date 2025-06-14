import { CATEGORIES_PAGE, CUSTOMERS_PAGE, HOME_PAGE, ORDERS_PAGE, PRODUCTS_PAGE } from '@/constants'

export const itemSideBar = [
  {
    name: 'Dashboard',
    path: HOME_PAGE,
    icon: 'bx bx-dashboard'
  },
  {
    name: 'Category',
    path: CATEGORIES_PAGE,
    icon: 'bx bx-cube-inside'
  },
  {
    name: 'Product',
    path: PRODUCTS_PAGE,
    icon: 'bx bx-t-shirt'
  },
  {
    name: 'Customer',
    path: CUSTOMERS_PAGE,
    icon: 'bx bx-community'
  },
  {
    name: 'Order',
    path: ORDERS_PAGE,
    icon: 'bx bx-cart'
  }
]
