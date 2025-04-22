// Libs
import { Outlet } from 'react-router-dom'

// Components
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const MainLayout = () => {
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
