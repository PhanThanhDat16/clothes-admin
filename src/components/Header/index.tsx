import { handleLogout } from '@/store'
import { Menu, MenuItems, MenuItem, MenuButton, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router'

interface IListDropdown {
  icon: string
  href?: string
  name: string
}

const listDropDown: IListDropdown[] = [
  {
    icon: 'bx bx-dashboard',
    href: '/',
    name: 'Dashboard'
  },
  {
    icon: 'bx bx-cog',
    href: '/profile',
    name: 'Edit Profile'
  },
  {
    icon: 'bx  bx-arrow-out-right-square-half',
    name: 'Logout'
  }
]

const notifications = [
  {
    id: 1,
    content: 'Bạn có đơn hàng mới',
    createdAt: new Date(),
    isRead: false
  },
  {
    id: 2,
    content: 'Tài khoản của bạn đã được cập nhật',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    isRead: true
  }
]

const Header = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notiList, setNotiList] = useState(notifications)
  const unreadCount = notiList.filter((n) => !n.isRead).length

  return (
    <div className=" fixed flex items-center justify-end w-full h-16 gap-6 px-6 bg-white shadow-md ">
      <div>
        <i className="text-xl text-[var(--Puerto-Rico)] bx bx-menu"></i>
      </div>
      <Menu as="div" className="relative">
        <MenuButton className="relative text-[var(--Puerto-Rico)] text-xl">
          <i className="bx bxs-bell" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[9px]">
              {unreadCount}
            </span>
          )}
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <MenuItems className="absolute right-0 mt-2 w-96 h-[420px] bg-white shadow-lg rounded-lg overflow-hidden z-50 border text-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  )}
                </div>
                <div className="relative group">
                  <div className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer">
                    <i className="bx bx-cog text-[18px] text-gray-600 group-hover:text-gray-800" />
                  </div>

                  <div
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-50 
                    opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto 
                    transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-max"
                  >
                    <button className="block text-left px-4 py-2 text-sm w-max text-gray-700 hover:bg-gray-100">
                      Read All
                    </button>
                    <button className="block text-left px-4 py-2 text-sm w-max text-gray-700 hover:bg-gray-100">
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notiList.length === 0 ? (
                <>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/020/936/880/non_2x/notification-icon-for-your-website-design-logo-app-ui-free-vector.jpg"
                    alt=""
                    className="w-[100px] h-[100px] mt-12 m-auto"
                  />
                  <div className="p-4 text-gray-500 text-center">No notifications</div>
                </>
              ) : (
                notiList.map((noti) => (
                  <button
                    key={noti.id}
                    className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 ${
                      !noti.isRead ? 'bg-gray-50' : ''
                    }`}
                  >
                    <img src="https://i.pravatar.cc/40" className="w-10 h-10 rounded-full object-cover border" />
                    <div className="flex flex-col text-left">
                      <span className="text-sm text-gray-800">{noti.content}</span>
                      {/* <span className="text-xs text-gray-500">
                        {formatDistanceToNow(noti.createdAt, { addSuffix: true })}
                      </span> */}
                    </div>
                  </button>
                ))
              )}
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      <Menu as="div" className="relative">
        <MenuButton className="flex items-center gap-2 focus:outline-none">
          <div className="w-8 h-8 overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-medium">Phan Dat</span>
        </MenuButton>

        <MenuItems className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
          <div className="py-1">
            {listDropDown.map((item) => (
              <MenuItem key={item.icon}>
                {({ active }) =>
                  item.href ? (
                    <NavLink
                      to={item.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm w-full ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      {item.icon && <i className={`${item.icon}`}></i>}
                      {item.name}
                    </NavLink>
                  ) : (
                    <button
                      className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                      onClick={() => handleLogout()}
                    >
                      {item.icon && <i className={`${item.icon}`}></i>}
                      {item.name}
                    </button>
                  )
                }
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default Header
