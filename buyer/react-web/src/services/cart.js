import axios from 'axios'
import { config } from '../config'

export async function getCartItems() {
  const url = `${config.server}/cart/`
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

export async function removeItemFromCart(itemId) {
  const url = `${config.server}/cart/${itemId}`
  const token = sessionStorage['token']
  const headers = {
    token,
  }
  try {
    const response = await axios.delete(url, {
      headers,
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function addToCart(productId, mrp, price, quantity, total) {
  const url = `${config.server}/cart/`
  const token = sessionStorage['token']
  const headers = {
    token,
  }
  const body = {
    productId,
    mrp,
    price,
    quantity,
    total,
  }
  try {
    const response = await axios.post(url, body, {
      headers,
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
