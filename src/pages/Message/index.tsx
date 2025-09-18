// import { useState, useRef, useEffect } from 'react'
import { HOME_PAGE } from '@/constants'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
const users: any[] = []

// const mockMessagesMap: Record<number, any[]> = {
//   1: [
//     {
//       id: 1,
//       sender: 'me',
//       content: 'Hi there! 👋',
//       time: '09:00'
//     },
//     {
//       id: 2,
//       sender: 'other',
//       content: 'Hello! How can I help you?',
//       time: '09:01'
//     },
//     {
//       id: 3,
//       sender: 'me',
//       content: 'I want to know more about your products.',
//       time: '09:02'
//     },
//     {
//       id: 4,
//       sender: 'other',
//       content: 'Sure! We have a wide range of products. What are you interested in?',
//       time: '09:03'
//     }
//   ],
//   2: [
//     {
//       id: 1,
//       sender: 'me',
//       content: 'Hi Alice!',
//       time: '08:40'
//     },
//     {
//       id: 2,
//       sender: 'other',
//       content: 'Thank you!',
//       time: '08:45'
//     }
//   ],
//   3: [
//     {
//       id: 1,
//       sender: 'other',
//       content: 'Can you send me the invoice?',
//       time: 'Yesterday'
//     }
//   ]
// }

const Message = () => {
  // const [users, setUsers] = useState(mockUsers)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  // const [messagesMap, setMessagesMap] = useState<Record<number, any[]>>(mockMessagesMap)
  // const [input, setInput] = useState('')
  // const messagesEndRef = useRef<HTMLDivElement>(null)
  // const [search, setSearch] = useState('')

  // const selectedUser = users.find((u) => u.id === selectedUserId)
  // const messages = messagesMap[selectedUserId] || []

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [messages, selectedUserId])

  // const handleSend = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!input.trim()) return
  //   const newMsg = {
  //     id: messages.length + 1,
  //     sender: 'me',
  //     content: input,
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   }
  //   setMessagesMap((prev) => ({
  //     ...prev,
  //     [selectedUserId]: [...(prev[selectedUserId] || []), newMsg]
  //   }))
  //   setInput('')
  //   // Update last message in sidebar
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === selectedUserId ? { ...u, lastMessage: input, lastTime: newMsg.time } : u))
  //   )
  // }

  return (
    <div className="flex h-[100vh] bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
      {/* Sidebar */}
      <aside className="w-[320px] bg-white border-r flex flex-col">
        <div className="flex items-center px-6 py-5 border-b bg-white">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mr-4">
            <i className="bx bx-message-dots text-emerald-600 text-2xl"></i>
          </div>
          <div className="flex-1">
            <span className="block font-semibold text-xl text-gray-800 tracking-wide">Messages</span>
            <span className="block text-xs text-gray-400">Chat with your customers</span>
          </div>
          <NavLink
            to={HOME_PAGE}
            className="ml-auto p-2 rounded-full hover:bg-gray-100 transition flex items-center"
            title="Back to Home"
          >
            <i className="bx bx-home-alt text-xl text-emerald-600"></i>
            <span className="sr-only">Back to Home</span>
          </NavLink>
        </div>
        <div className="px-6 py-3 border-b bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-white"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="bx bx-search text-lg"></i>
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users && users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition ${
                    selectedUserId === user.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.online ? 'bg-emerald-400' : 'bg-gray-300'
                      }`}
                    ></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate">{user.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user.lastMessage}</div>
                  </div>
                  <div className="text-xs text-gray-400">{user.lastTime}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 py-12 text-gray-400">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <i className="bx  bx-message-circle-notification text-3xl text-gray-400"></i>
              </div>
              <p className="font-medium text-gray-600 leading-5">No conversations yet</p>
              <p className="text-sm text-gray-400">No open conversations left hanging.</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-emerald-50">
        {users && users.length > 0 ? (
          <Outlet />
        ) : (
          <div className="text-center px-6 text-gray-500">
            <div className="flex items-center justify-center rounded-full bg-gray-100 mb-6 mx-auto w-[100px] h-[100px]">
              <img src="/img/chat.png" alt="" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">Select a conversation</h2>
          </div>
        )}
      </main>
    </div>
  )
}

export default Message
