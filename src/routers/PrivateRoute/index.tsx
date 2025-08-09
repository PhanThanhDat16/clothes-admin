// Libs
import { LOGIN_PAGE } from '@/constants'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return <Navigate to={LOGIN_PAGE} replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default PrivateRoute
