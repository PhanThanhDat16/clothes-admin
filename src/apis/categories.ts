import { ICategory } from '@/models/categories'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/categories'

export const createCategory = async (values: ICategory) => await axiosConfig.post(`${DEFAULT_URL}`, values)
export const getCategoryDetail = async (cateId: string) => await axiosConfig.get(`${DEFAULT_URL}/${cateId}`)
export const getAllCategory = async (params?: { search?: string; page?: number; limit?: number }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 10
    }
  })
export const updateCategory = async (cateId: string, values: ICategory) =>
  await axiosConfig.put(`${DEFAULT_URL}/${cateId}`, values)
export const deleteCategory = async (cateId: string) => await axiosConfig.delete(`${DEFAULT_URL}/${cateId}`)
