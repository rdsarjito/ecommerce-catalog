import axios from 'axios'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { rate: number; count: number }
}

const client = axios.create({ baseURL: 'https://fakestoreapi.com' })

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await client.get<Product>(`/products/${id}`)
  return data
}
