import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import { addToCart } from '../services/cart'
import { getProducts } from '../services/product'

const ProductList = () => {
  const [products, setProducts] = useState([])

  // read the redux state
  const status = useSelector((state) => state.auth)
  console.log(`status = `, status)

  const loadProducts = async () => {
    const result = await getProducts()
    if (result['status'] == 'success') {
      setProducts(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  const addItemToCart = async (product) => {
    const price = product['mrp'] - (product['mrp'] * product['discount']) / 100
    const result = await addToCart(
      product['id'],
      product['mrp'],
      price,
      1,
      price
    )
    if (result['status'] == 'success') {
      toast.success('successfully added to your cart')
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      <Sidebar />
      <div className='container'>
        <h1>Products</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>MRP</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{ width: 50, height: 50 }}
                      src={'http://localhost:3000/' + product['image']}
                    />
                  </td>
                  <td>{product['title']}</td>
                  <td>{product['company']}</td>
                  <td>{product['category']}</td>
                  <td>₹ {product['mrp']}</td>
                  <td>{product['discount']}%</td>
                  <td>
                    <button
                      onClick={() => {
                        addItemToCart(product)
                      }}
                      className='btn btn-sm btn-success'
                    >
                      add to cart
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

export default ProductList
