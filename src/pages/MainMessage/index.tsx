import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getConversationDetail } from '@/apis/conversation'
import { IConversation, IConversationMessage } from '@/models/conversation'
import { IMessage } from '@/models/message'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { createMessage, getMessageConversation } from '@/apis/messages'
import { motion } from 'framer-motion'

const MainMessage = () => {
  const { id } = useParams()
  const currentUserId = localStorage.getItem('userId')
  const [conversation, setConversation] = useState<IConversation | null>(null)
  const [message, setMessage] = useState('')
  const [listMessage, setListMessage] = useState<IConversationMessage[] | []>([])
  const { socket } = useStoreSocketIO((state) => state)

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [conversation?.messages])

  const handleGetMessage = async () => {
    try {
      const res = await getMessageConversation(id as string)
      setListMessage(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    if (!message.trim() || !conversation || !userId) return

    const newMessage: IMessage = {
      conversationId: id as string,
      content: message,
      receiverId: conversation.userId,
      senderId: userId
    }

    try {
      await createMessage(newMessage)
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetMessage()
  }, [])

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (!id) return
        const res = await getConversationDetail(id)
        const c = res.data
        const mapped = {
          ...c,
          userId: c.userId._id,
          fullName: c.userId.fullName,
          avatar: c.userId.avatar,
          email: c.userId.email,
          messages: c.messages || []
        }
        setConversation(mapped)
      } catch (error) {
        console.log(error)
      }
    }

    fetchConversation()
  }, [id])

  useEffect(() => {
    if (socket) {
      socket.on('send-message', (data) => {
        console.log(data)
        handleGetMessage()
      })
    }
  }, [socket])

  return (
    <main className="flex-1 flex flex-col h-full">
      <div className="flex items-center px-8 py-5 border-b bg-white/80 backdrop-blur-md">
        <img
          src={conversation?.avatar || '/img/default-avatar.png'}
          className="w-12 h-12 rounded-full object-cover border mr-4"
        />
        <div>
          <div className="font-semibold text-lg text-gray-800">{conversation?.fullName || 'Unknown User'}</div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full inline-block bg-emerald-400"></span>
            Online
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
        {listMessage.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            No messages yet. Start the conversation!
          </div>
        )}

        {listMessage.map((msg) => {
          const isMine = msg.senderId._id === currentUserId
          return (
            <div key={msg._id} className={`flex mb-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`max-w-[65%] px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed
            ${
              isMine
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
            }`}
              >
                {/* Nội dung */}
                <div>{msg.content}</div>

                <div className="text-[11px] text-gray-300 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSend} className="flex items-center px-8 py-5 border-t bg-white/90 backdrop-blur-md gap-3">
        <input
          type="text"
          className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 text-base"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition flex items-center gap-2 shadow"
        >
          <i className="bx bx-send text-xl"></i>
        </button>
      </form>
    </main>
  )
}

export default MainMessage
