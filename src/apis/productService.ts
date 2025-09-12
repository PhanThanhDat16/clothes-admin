import { IProduct } from '@/models/product'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/items'

export const createProduct = async (values: IProduct) => await axiosConfig.post(`${DEFAULT_URL}`, values)
export const getProductDetail = async (productId: string) => await axiosConfig.get(`${DEFAULT_URL}/${productId}`)
export const getAllProduct = async (params?: { search?: string; page?: number; limit?: number; categoryId?: string }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 10,
      categoryId: params?.categoryId
    }
  })

export const getProductTopPopular = async () => await axiosConfig.get(`${DEFAULT_URL}/popular`)
export const getProductByCategoryId = async (categoryId: string) =>
  await axiosConfig.get(`${DEFAULT_URL}/category/${categoryId}`)
export const updateProduct = async (productId: string, values: IProduct) =>
  await axiosConfig.put(`${DEFAULT_URL}/${productId}`, values)
export const deleteProduct = async (productId: string) => await axiosConfig.delete(`${DEFAULT_URL}/${productId}`)
