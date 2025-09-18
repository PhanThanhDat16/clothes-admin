// Libs
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Router
import {
  CATEGORIES_PAGE,
  CUSTOMERS_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MESSAGE_PAGE,
  ORDERS_PAGE,
  PRODUCTS_PAGE,
  PROFILE,
  SIGNUP_PAGE
} from '@/constants'

// Page
import HomePage from '@/pages/HomePage'

import MainLayout from '@/layouts'
import Product from '@/pages/Products'
import Category from '@/pages/Categories'
import Customer from '@/pages/Customers'
import Order from '@/pages/Orders'
import Profile from '@/pages/Profile'
import NotFoundPage from '@/pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PrivateRouteLogin from './PrivateRouteLogin'
import Login from '@/pages/Login'
import SignUp from '@/pages/Signup'
import CategoryDetail from '@/pages/CategoryDetail'
import ProductDetail from '@/pages/ProductDetail'
import CustomerDetail from '@/pages/CustomerDetail'
import Message from '@/pages/Message'
import MainMessage from '@/pages/MainMessage'
import OrderDetail from '@/pages/OrderDetail'

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={HOME_PAGE} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={CATEGORIES_PAGE} element={<Category />} />
            <Route path={`${CATEGORIES_PAGE}/:id`} element={<CategoryDetail />} />
            <Route path={PRODUCTS_PAGE} element={<Product />} />
            <Route path={`${PRODUCTS_PAGE}/:id`} element={<ProductDetail />} />
            <Route path={CUSTOMERS_PAGE} element={<Customer />} />
            <Route path={`${CUSTOMERS_PAGE}/:id`} element={<CustomerDetail />} />
            <Route path={ORDERS_PAGE} element={<Order />} />
            <Route path={`${ORDERS_PAGE}/:id`} element={<OrderDetail />} />
            <Route path={PROFILE} element={<Profile />} />
          </Route>
          <Route path={MESSAGE_PAGE} element={<Message />}>
            <Route path={`${MESSAGE_PAGE}/:id`} element={<MainMessage />}></Route>
          </Route>
        </Route>

        <Route element={<PrivateRouteLogin />}>
          <Route path={LOGIN_PAGE} element={<Login />} />
          <Route path={SIGNUP_PAGE} element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouters
