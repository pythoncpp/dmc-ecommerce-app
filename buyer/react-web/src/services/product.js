import axios from 'axios'
import { config } from '../config'

export async function getProducts() {
  const url = `${config.server}/product/search`
  const token = sessionStorage['token']
  const headers = {
    token,
  }
  try {
    const response = await axios.get(url, {
      headers,
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
