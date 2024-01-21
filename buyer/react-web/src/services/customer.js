import axios from 'axios'
import { config } from '../config'

export async function registerCustomer(name, email, phone, address, password) {
  const body = {
    name,
    email,
    phone,
    address,
    password,
  }

  const url = `${config.server}/customer/register`
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function loginCustomer(email, password) {
  const body = {
    email,
    password,
  }

  const url = `${config.server}/customer/login`
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
