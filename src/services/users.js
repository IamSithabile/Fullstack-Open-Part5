import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = async () => {
  const request = await axios.get(baseUrl)

  return request.data
}

export const getUser = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return await request.data
}
