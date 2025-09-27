import { IUser } from './user'

export interface IConversation {
  _id: string
  userId: string
  fullName: string
  email: string
  avatar: string
  online: boolean
  lastMessage: string
  createdAt: string
}

export interface IConversationMessage {
  _id: string
  isRead: boolean
  conversationId: string
  receiverId: IUser
  senderId: IUser
  content: string
  createdAt: string
}
