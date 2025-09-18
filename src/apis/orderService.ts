import { IOrderItemCreate } from '@/models/order'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/orders'

export const createOrder = async (values: IOrderItemCreate) => await axiosConfig.post(`${DEFAULT_URL}`, values)
export const getOrderDetail = async (orderId: string) => await axiosConfig.get(`${DEFAULT_URL}/${orderId}`)
export const getOrderAll = async () => await axiosConfig.get(`${DEFAULT_URL}`)
export const updateOrder = async (orderId: string) => await axiosConfig.put(`${DEFAULT_URL}/${orderId}`)
export const deleteOrder = async (orderId: string) => await axiosConfig.delete(`${DEFAULT_URL}/${orderId}`)
