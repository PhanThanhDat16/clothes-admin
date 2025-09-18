import axiosConfig from './axioConfig'

const DEFAULT_URL = '/dashboard'
export const getDashboard = async () => await axiosConfig.get(`${DEFAULT_URL}`)
