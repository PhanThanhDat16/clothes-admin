// router.post('/', messageController.createMessage)
// router.get('/:conversationId', messageController.getMessagesByConversation)
// router.patch('/:messageId/read', messageController.markAsRead)

import { IMessage } from '@/models/message'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/messages'

export const createMessage = (value: IMessage) => axiosConfig.post(DEFAULT_URL, value)

export const getMessageConversation = (conversationId: string) => axiosConfig.get(`${DEFAULT_URL}/${conversationId}`)

// export const createMessage = (value: IMessage) => axiosConfig.post(DEFAULT_URL, value)
