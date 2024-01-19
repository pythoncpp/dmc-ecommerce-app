const express = require('express')
const router = express.Router()
const utils = require('../utils')
const db = require('../db')
const multer = require('multer')
const upload = multer({ dest: 'images' })

// create a new product
router.post('/', upload.single('image'), (request, response) => {
  const { title, description, mrp, discount, company, category } = request.body
  const statement = `
    insert into product
        (title, description, mrp, discount, company, category, image, sellerId)
    values
        (?, ?, ?, ?, ?, ?, ?, ?)
  `
  db.execute(
    statement,
    [
      title,
      description,
      mrp,
      discount,
      company,
      category,
      request.file.filename,
      request.user.id,
    ],
    (error, result) => {
      response.send(utils.createResponse(error, result))
    }
  )
})

// delete existing product
router.delete('/:id', (request, response) => {
  const { id } = request.params
  const statement = `
    delete from product
      where
        id = ?
  `
  db.execute(statement, [id], (error, result) => {
    response.send(utils.createResponse(error, result))
  })
})

// update existing product
router.put('/:id', (request, response) => {
  const { id } = request.params
  const { description, mrp, discount, company, category } = request.body
  const statement = `
    update product
      set
        description = ?, 
        mrp = ?, 
        discount = ?, 
        company = ?, 
        category = ?
      where
        id = ?
  `
  console.log([description, mrp, discount, company, category, id])
  db.execute(
    statement,
    [description, mrp, discount, company, category, id],
    (error, result) => {
      console.log(error)
      response.send(utils.createResponse(error, result))
    }
  )
})

// get all products
router.get('/search', (request, response) => {
  let statement = `
    select 
      id, title, mrp, discount, description, category, company, image 
    from product`

  const parameters = []
  if (request.user.type == 'seller') {
    statement += ` where sellerId = ?`
    parameters.push(request.user.id)
  }

  db.execute(statement, parameters, (error, result) => {
    response.send(utils.createResponse(error, result))
  })
})

module.exports = router
