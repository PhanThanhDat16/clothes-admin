import axiosConfig from './axioConfig'

const DEFAULT_URL = '/categories'

export const createCategory = async (values) => await axiosConfig.post(`${DEFAULT_URL}`, values)
export const getCategoryDetail = async (cateId) => await axiosConfig.get(`${DEFAULT_URL}/${cateId}`)
export const getAllCategory = async () => await axiosConfig.get(`${DEFAULT_URL}`)
export const updateCategory = async (cateId, values) => await axiosConfig.put(`${DEFAULT_URL}/${cateId}`, values)
export const deleteCategory = async (cateId) => await axiosConfig.delete(`${DEFAULT_URL}/${cateId}`)
