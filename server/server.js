const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')

// create a new express application
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(express.static('images'))

// return version for consumer
app.get('/version', (request, response) => {
  response.send(utils.createSuccessResponse('1.0'))
})

// check if token is required
app.use((request, response, next) => {
  const skipTokenUrls = [
    '/seller/register',
    '/seller/login',
    '/customer/register',
    '/customer/login',
  ]

  if (
    skipTokenUrls.findIndex((item) => {
      return request.url.startsWith(item)
    }) != -1
  ) {
    // skip the token check
    next()
  } else {
    const token = request.headers['token']
    console.log(`token: ${token}`)
    if (!token) {
      response.send(utils.createErrorResponse('missing the token'))
    } else {
      try {
        // try validating token
        const payload = jwt.verify(token, config.secrete)
        console.log(payload)

        // add the payload details to the request
        request.user = {
          id: payload['id'],
          name: payload['name'],
          type: payload['type'],
        }

        // go to the next call
        next()
      } catch (ex) {
        console.log(ex)
        response.send(utils.createErrorResponse('invalid token'))
      }
    }
  }
})

// add required routes
const cartRouter = require('./routes/cart')
const customerRouter = require('./routes/customer')
const orderRouter = require('./routes/order')
const productRouter = require('./routes/product')
const sellerRouter = require('./routes/seller')

app.use('/cart', cartRouter)
app.use('/customer', customerRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)
app.use('/seller', sellerRouter)

app.listen(3000, () => {
  console.log(`server started on port 3000`)
})
