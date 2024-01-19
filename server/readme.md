# Web Services

## requirements

- seller
  - register a new seller
    - POST /seller/register: done
  - login a seller
    - POST /seller/login: done
- product
  - add a new product
    - POST /product/ : done
  - search products
    - GET /product/ :done
    - url parameters: sort-by
  - update a product
    - PUT /product/:id: done
  - update only price
    - PATCH /product/:id/
  - delete existing product
    - DELETE /product/:id: done
  - review a product
    - POST /product/review
  - get all reviews
    - GET /product/review/:id
- customer
  - register a new customer
    - POST /customer/register: done
  - login a customer
    - POST /customer/login: done
  - forgot password
    - POST /customer/forgot-password
  - reset password
    - POST /customer/reset-password
  - get customer profile
    - GET /customer/profile/ :done
  - update profile
    - PUT /customer/profile :done
  - close account
    - DELETE /customer :done
- cart
  - add a product to cart
    - POST /cart/ : done
  - get all the cart items
    - GET /cart : done
  - update cart
    - PUT /cart/:id : done
  - delete an item from cart
    - DELETE /cart/:id : done
- order
  - place an order
    - POST /order/place-order : done
  - change status of an order
    - PATCH /order/:id
  - get orders
    - GET /order : done

## packages

- mysql2: database
- express: web server
- cors: cors configuration
- jsonwebtoken: jwt implementation
- multer: uploading a file
- crypto-js: password encryption
- morgan: logging

```bash

# install yarn and nodemon globally
> sudo npm install -g yarn nodemon

# install required packages
> yarn add mysql2 express cors jsonwebtoken crypto-js morgan multer

```
