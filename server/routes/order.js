const express = require('express')
const router = express.Router()
const dbPromise = require('../db-promise')
const db = require('../db')
const utils = require('../utils')

router.post('/', async (request, response) => {
  // step 1: get all items from cart
  const [items] = await dbPromise.query(`select * from cart`)
  console.log(items)

  // step 2: insert the order record in orderId and capture the orderId
  let total = 0
  for (const item of items) {
    total += item['total']
  }
  const [row] = await dbPromise.execute(
    `
    insert into orderMaster
        (buyerId, total)
    values
        (?, ?)
  `,
    [request.user.id, total]
  )
  // capture order Id
  const orderId = row['insertId']

  // step 3: insert the order details in orderDetails table with orderId
  for (const item of items) {
    await dbPromise.execute(
      `
        insert into orderDetails
            (orderId, productId, quantity, mrp, price, total)
        values
            (?, ?, ?, ?, ?, ?)
    `,
      [
        orderId,
        item['productId'],
        item['quantity'],
        item['mrp'],
        item['price'],
        item['total'],
      ]
    )
  }

  // step 4: clear the cart for the user
  await dbPromise.execute(`delete from cart where buyerId = ?`, [
    request.user.id,
  ])

  response.send(utils.createSuccessResponse('done'))
})

router.get('/', async (request, response) => {
  const statement = `
        select 
            id, total, createdTimestamp 
        from
            orderMaster
        where
            buyerId = ?
    `
  const [orders] = await dbPromise.query(statement, [request.user.id])
  for (const order of orders) {
    const [details] = await dbPromise.query(
      `select * from orderDetails where orderId = ?`,
      [order['id']]
    )
    order['details'] = details
  }

  response.send(utils.createResponse(orders))
})

module.exports = router
