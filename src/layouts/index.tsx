// Libs
import { Outlet } from 'react-router-dom'

// Components
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="flex-1 min-h-screen pr-6 pt-16 pb-6 pl-[280px] bg-gray-100">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
