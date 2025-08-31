import { IAuthSignUpForm } from '@/models/auth'
import axiosConfig from './axioConfig'
import { IUser } from '@/models/user'

const DEFAULT_URL = '/users'
export const register = async (values: IAuthSignUpForm) => await axiosConfig.post(`${DEFAULT_URL}/register`, values)
export const getAllUser = async (params?: { search?: string; page?: number; limit?: number }) =>
  await axiosConfig.get(DEFAULT_URL, {
    params: {
      search: params?.search || '',
      page: params?.page || 1,
      limit: params?.limit || 10
    }
  })
export const updateUser = async (userId: string, value: IUser) =>
  await axiosConfig.put(`${DEFAULT_URL}/${userId}`, value)
export const deleteUser = async (userId: string) => await axiosConfig.delete(`${DEFAULT_URL}/${userId}`)
export const getProfile = async () => await axiosConfig.get(`${DEFAULT_URL}/profile`)
export const getUserDetail = async (userId: string) => await axiosConfig.get(`${DEFAULT_URL}/${userId}`)
