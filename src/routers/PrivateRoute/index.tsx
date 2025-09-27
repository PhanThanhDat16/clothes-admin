// Libs
import { LOGIN_PAGE } from '@/constants'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('accessToken')
  const { connect, disconnect } = useStoreSocketIO()

  useEffect(() => {
    if (accessToken) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [])

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
