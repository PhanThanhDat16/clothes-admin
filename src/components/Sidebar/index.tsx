import { NavLink } from 'react-router-dom'
import { itemSideBar } from './itemSideBar'

const Sidebar = () => {
  return (
    <aside className="fixed w-64 h-screen p-6 text-white bg-white">
      <h2 className="mb-8 text-2xl font-bold text-black">Clothes Analyst</h2>
      <div className="flex flex-col gap-4">
        {itemSideBar.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group p-2 rounded-md flex items-center gap-2 
             ${isActive ? 'text-[var(--Gossamer)] font-semibold' : 'text-[var(--Mobster)]'}`
            }
          >
            <i
              className={`${item.icon} text-2xl 
              group-hover:text-[var(--Gossamer)]`}
            ></i>
            <span className="group-hover:text-[var(--Gossamer)]">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
