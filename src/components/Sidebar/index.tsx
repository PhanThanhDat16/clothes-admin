import { CATEGORIES_PAGE, CUSTOMERS_PAGE, HOME_PAGE, ORDERS_PAGE, PRODUCTS_PAGE } from '@/constants'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (

    <aside className="fixed w-64 h-screen p-6 text-white bg-stone-800">
      <h2 className="mb-6 text-2xl font-bold">Clothes Analyst</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to={HOME_PAGE} end className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700 ">
          Dashboard
        </NavLink>
        <NavLink to={CATEGORIES_PAGE} className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Category
        </NavLink>
        <NavLink to={PRODUCTS_PAGE} className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Product
        </NavLink>
        <NavLink to={CUSTOMERS_PAGE} className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Customer
        </NavLink>
        <NavLink to={ORDERS_PAGE} className="block p-2 rounded-md hover:text-blue-400 hover:bg-stone-700">
          Order
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
