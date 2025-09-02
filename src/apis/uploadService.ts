import axiosConfig from './axioConfig'

const DEFAULT_URL = '/upload'
export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return axiosConfig.post(`${DEFAULT_URL}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  return axiosConfig.post(`${DEFAULT_URL}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const uploadImages = async (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('images', file)
  })

  return axiosConfig.post(`${DEFAULT_URL}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
