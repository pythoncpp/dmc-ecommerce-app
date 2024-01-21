import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import { getCartItems, removeItemFromCart } from '../services/cart'

const Cart = () => {
  const [items, setItems] = useState([])

  const onRemoveItem = async (id) => {
    const result = await removeItemFromCart(id)
    if (result['status'] == 'success') {
      loadCartItems()
    } else {
      toast.error(result['error'])
    }
  }

  const loadCartItems = async () => {
    const result = await getCartItems()
    if (result['status'] == 'success') {
      setItems(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadCartItems()
  }, [])

  return (
    <div>
      <Sidebar />
      <div className='container'>
        <h1>Cart</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>MRP</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{ width: 50, height: 50 }}
                      src={'http://localhost:3000/' + item['image']}
                    />
                  </td>
                  <td>{item['title']}</td>
                  <td>{item['company']}</td>
                  <td>{item['category']}</td>
                  <td>₹ {item['mrp']}</td>
                  <td>{item['price']}%</td>
                  <td>{item['quantity']}%</td>
                  <td>
                    <button
                      onClick={() => {
                        onRemoveItem(item['id'])
                      }}
                      className='btn btn-sm btn-danger'
                    >
                      remove
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cart
