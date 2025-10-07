import axiosConfig from './axioConfig'

const DEFAULT_URL = '/dashboard'
export const getDashboard = async (params?: { startDate?: string; endDate?: string }) =>
  await axiosConfig.get(`${DEFAULT_URL}`, { params })
