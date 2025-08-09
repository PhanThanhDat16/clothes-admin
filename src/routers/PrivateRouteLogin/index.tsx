// Libs
import { HOME_PAGE } from '@/constants'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouteLogin = () => {
  // Handle when user already has an account
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    return <Navigate to={HOME_PAGE} replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default PrivateRouteLogin
