// import { useState, useRef, useEffect } from 'react'
import { getAllConversation } from '@/apis/conversation'
import { HOME_PAGE, MESSAGE_PAGE } from '@/constants'
import { IConversation } from '@/models/conversation'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router'

const Message = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [conversations, setConversations] = useState<IConversation[] | []>([])
  const { socket } = useStoreSocketIO((state) => state)
  const { id } = useParams()

  const handleGetAllConversation = async () => {
    try {
      const res = await getAllConversation()
      const mapped = res.data.map((c: any) => ({
        userId: c.userId._id,
        fullName: c.userId.fullName,
        email: c.userId.email,
        avatar: c.userId.avatar,
        online: false,
        lastMessage: 'No messages yet',
        ...c
      }))

      setConversations(mapped)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('new-conversation', async (data) => {
        const { conversationId } = data
        socket.emit('join-admin-conversation', { conversationId })
        handleGetAllConversation()
      })
    }
  }, [socket])

  useEffect(() => {
    handleGetAllConversation()
  }, [])

  useEffect(() => {
    async function joinRoomConversations() {
      try {
        const res = await getAllConversation()
        const mapped = res.data.map((c: any) => ({
          userId: c.userId._id,
          fullName: c.userId.fullName,
          email: c.userId.email,
          avatar: c.userId.avatar,
          online: false,
          lastMessage: 'No messages yet',
          ...c
        }))
        if (socket) {
          mapped.map((m: any) => {
            socket.emit('join-admin-conversation', { conversationId: m._id })
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    joinRoomConversations()
  }, [socket])

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
          {conversations && conversations.length > 0 ? (
            <ul>
              {conversations.map((c) => (
                <NavLink
                  to={`${MESSAGE_PAGE}/${c._id}`}
                  key={c._id}
                  className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition ${
                    selectedUserId === c.userId ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedUserId(c.userId)}
                >
                  <div className="relative">
                    <img src={c.avatar} alt={c.fullName} className="w-10 h-10 rounded-full object-cover border" />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        c.online ? 'bg-emerald-400' : 'bg-gray-300'
                      }`}
                    ></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate">{c.fullName}</div>
                    <div className="text-xs text-gray-400 truncate">{c.lastMessage}</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {' '}
                    {new Date(c.createdAt).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </div>
                </NavLink>
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

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-emerald-50">
        {id ? (
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
