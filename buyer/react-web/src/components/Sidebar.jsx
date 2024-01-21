import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout as logoutAction } from '../features/authSlice'

const Sidebar = () => {
  const navigate = useNavigate()

  // use dispatch to logout
  const dispatch = useDispatch()

  const onLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')

    // update the global store
    dispatch(logoutAction())

    navigate('/')
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-dark bg-body-tertiary'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <a className='navbar-brand'>MyStore</a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/product-list' className='nav-link active'>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/cart' className='nav-link active'>
                Cart
              </Link>
            </li>
            <li className='nav-item'>
              <button onClick={onLogout} className='nav-link active'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
