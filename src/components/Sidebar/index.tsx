import { NavLink } from 'react-router-dom'
import { CiCircleList } from 'react-icons/ci'

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-stone-800 text-white p-6">
      <CiCircleList className="size-6" />
      <h2 className="text-2xl font-bold mb-6">Clothes Analyst</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" end className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700 ">
          Dashboard
        </NavLink>
        <NavLink to="/Categories" className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Category
        </NavLink>
        <NavLink to="/Products" className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Product
        </NavLink>
        <NavLink to="/Customers" className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Customer
        </NavLink>
        <NavLink to="/Orders" className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Order
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
