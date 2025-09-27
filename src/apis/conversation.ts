import axiosConfig from './axioConfig'

const DEFAULT_URL = '/conversations'

export const getAllConversation = async () => await axiosConfig.get(`${DEFAULT_URL}`)

export const getConversationDetail = async (conversationId: string) =>
  await axiosConfig.get(`${DEFAULT_URL}/${conversationId}`)
