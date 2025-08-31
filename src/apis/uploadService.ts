import axiosConfig from './axioConfig'

const DEFAULT_URL = '/upload'
export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return axiosConfig.post(`${DEFAULT_URL}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const uploadImageImage = async (file: File) => {
  const formData = new FormData()
  formData.append('imageimage', file)

  return axiosConfig.post(`${DEFAULT_URL}/imageimage`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
