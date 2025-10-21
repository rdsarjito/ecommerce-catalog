import axios from 'axios'

const client = axios.create({ baseURL: 'https://fakestoreapi.com' })

export async function fetchProductById(id) {
  const { data } = await client.get(`/products/${id}`)
  return data
}
