import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerCustomer } from '../services/customer'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')

  const onRegister = async () => {
    if (name.length == 0) {
      toast.error('Please enter name')
    } else if (email.length == 0) {
      toast.error('Please enter email')
    } else if (password.length == 0) {
      toast.error('Please enter password')
    } else if (confirmPassword.length == 0) {
      toast.error('Please confirm password')
    } else if (confirmPassword != password) {
      toast.error('Password does not match')
    } else {
      const result = await registerCustomer(
        name,
        email,
        phone,
        address,
        password
      )
      if (result['status'] == 'success') {
        toast.success('Successfully registered your account')
        navigate('/')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col'>
          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
            <div className='col'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className='form-control'
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='form-control'
              />
            </div>
            <div className='col'>
              <label htmlFor=''>Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                className='form-control'
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <label htmlFor=''>Phone Number</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type='tel'
                className='form-control'
              />
            </div>
            <div className='col'>
              <label htmlFor=''>Address</label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                rows='5'
                type='text'
                className='form-control'
              ></textarea>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                Already have an account ? Login <Link to='/'>here</Link>{' '}
              </div>
              <button onClick={onRegister} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default Register
