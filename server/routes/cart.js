const express = require('express')
const router = express.Router()
const utils = require('../utils')
const db = require('../db')

router.get('/', (request, response) => {
  const statement = `
        select 
            c.id, c.productId, c.quantity, c.mrp, c.price, c.total,
            p.title, p.category, p.company, p.image
        from 
            cart c, product p
        where
            (c.productId = p.id) AND
            (buyerId = ?)
    `
  db.execute(statement, [request.user.id], (error, items) => {
    response.send(utils.createResponse(error, items))
  })
})

router.post('/', (request, response) => {
  const { productId, quantity, mrp, price, total } = request.body
  const statement = `
    insert into cart 
        (productId, quantity, mrp, price, total, buyerId)
    values
        (?, ?, ?, ?, ?, ?)           
    `
  db.execute(
    statement,
    [productId, quantity, mrp, price, total, request.user.id],
    (error, items) => {
      response.send(utils.createResponse(error, items))
    }
  )
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { quantity, mrp, price, total } = request.body
  const statement = `
      update cart 
        set
            quantity = ?, 
            mrp = ?, 
            price = ?, 
            total = ?
        where   
            id = ?
      `
  db.execute(statement, [quantity, mrp, price, total, id], (error, items) => {
    response.send(utils.createResponse(error, items))
  })
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const statement = `
        delete from cart 
          where   
              id = ?
        `
  db.execute(statement, [id], (error, items) => {
    response.send(utils.createResponse(error, items))
  })
})

module.exports = router
