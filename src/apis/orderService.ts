import { IOrderItemCreate } from '@/models/order'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/orders'

export const createOrder = async (values: IOrderItemCreate) => await axiosConfig.post(`${DEFAULT_URL}`, values)
export const getOrderDetail = async (orderId: string) => await axiosConfig.get(`${DEFAULT_URL}/${orderId}`)
export const getOrderAll = async (params?: { search?: string; page?: number; limit?: number; status?: string }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 10,
      status: params?.status
    }
  })
export const updateOrder = async (orderId: string, data: { status: string }) =>
  await axiosConfig.put(`${DEFAULT_URL}/${orderId}`, data)
export const deleteOrder = async (orderId: string) => await axiosConfig.delete(`${DEFAULT_URL}/${orderId}`)
