import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
export const getOne = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  console.log(`${baseUrl}/${id}`)
  console.log(request.data)
  return request.data
}

export const create = async (blogObject, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const request = await axios.post(baseUrl, blogObject, config)
  return request.data
}

export const update = async (id, updateBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, updateBlog)
  return request.data
}

export const remove = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
