import { IAuthSignUpForm } from '@/models/auth'
import axiosConfig from './axioConfig'

const DEFAULT_URL = '/users'
export const register = async (values: IAuthSignUpForm) => await axiosConfig.post(`${DEFAULT_URL}/register`, values)
export const getAllUser = async () => await axiosConfig.get(`${DEFAULT_URL}`)
export const updateUser = async (userId: string) => await axiosConfig.put(`${DEFAULT_URL}/${userId}`)
export const getProfile = async () => await axiosConfig.get(`${DEFAULT_URL}/profile`)
