import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen p-6 text-neutral-700 bg-white">
      <h2 className="mb-6 text-2xl font-bold">Clothes Analyst</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" end className="block p-2 rounded-md hover:text-green-600  ">
          Dashboard
        </NavLink>
        <NavLink to="/Categories" className="block p-2 rounded-md hover:text-green-600 ">
          Category
        </NavLink>
        <NavLink to="/Products" className="block p-2 rounded-md hover:text-green-600 ">
          Product
        </NavLink>
        <NavLink to="/Customers" className="block p-2 rounded-md hover:text-green-600 ">
          Customer
        </NavLink>
        <NavLink to="/Orders" className="block p-2 rounded-md hover:text-green-600 ">
          Order
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
