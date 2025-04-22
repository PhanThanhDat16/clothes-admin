// Libs
import { Route, Routes } from 'react-router-dom'

// Router
import { CATEGORIES_PAGE, CUSTOMERS_PAGE, HOME_PAGE, ORDERS_PAGE, PRODUCTS_PAGE } from '@/constants'

// Page
import HomePage from '@/pages/HomePage'

import MainLayout from '@/layouts'
import Product from '@/pages/Products'
import Category from '@/pages/Categories'
import Customer from '@/pages/Customers'
import Order from '@/pages/Orders'

const AppRouters = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={CATEGORIES_PAGE} element={<Category />} />
        <Route path={PRODUCTS_PAGE} element={<Product />} />
        <Route path={CUSTOMERS_PAGE} element={<Customer />} />
        <Route path={ORDERS_PAGE} element={<Order />} />
      </Route>
    </Routes>
  )
}

export default AppRouters
