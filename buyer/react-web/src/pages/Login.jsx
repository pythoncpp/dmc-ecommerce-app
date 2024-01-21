import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login as loginAction } from '../features/authSlice'
import { loginCustomer } from '../services/customer'

const Login = () => {
  // get the navigation object
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get the current state from redux
  const status = useSelector((state) => state.auth)
  console.log(`login: status => `, status)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    if (email.length == 0) {
      toast.error('Please enter email')
    } else if (password.length == 0) {
      toast.error('Please enter password')
    } else {
      const result = await loginCustomer(email, password)
      if (result['status'] == 'success') {
        const data = result['data']

        // cache the token
        sessionStorage['token'] = data['token']
        sessionStorage['name'] = data['name']

        // set the status in redux store
        dispatch(loginAction())

        toast.success('Welcome to the application')
        navigate('/product-list')
      } else {
        toast.error(result['error'])
      }
    }
    // navigate('/product-list')
  }

  return (
    <div>
      <h1>Login</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <div className='mb-3'>
              Dont have an account ? Register <Link to='/register'>here.</Link>
            </div>
            <button onClick={onLogin} className='btn btn-success'>
              Login
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Login
