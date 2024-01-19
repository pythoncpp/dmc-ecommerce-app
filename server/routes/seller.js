const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/register', (request, response) => {
  const { name, email, phone, password, address } = request.body

  // create a sql statement
  const statement = `
    insert into seller 
        (name, phone, email, password, address)
    values
        (?, ?, ?, ?, ?)
  `
  // encrypt the password
  const encryptedPassword = String(crypto.SHA256(password))

  db.execute(
    statement,
    [name, phone, email, encryptedPassword, address],
    (error, result) => {
      response.send(utils.createResponse(error, result))
    }
  )
})

router.post('/login', (request, response) => {
  const { email, password } = request.body

  // create a sql statement
  const statement = `
      select id, name, address from seller 
      where
          email = ? and password = ?
    `
  // encrypt the password
  const encryptedPassword = String(crypto.SHA256(password))

  db.execute(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResponse(error))
    } else {
      // if there is any user found with email and password
      if (users.length == 0) {
        // no user found
        response.send(utils.createErrorResponse('seller not found'))
      } else {
        const user = users[0]

        // create a payload for jwt token
        const payload = {
          id: user['id'],
          name: user['name'],
          type: 'seller',
        }

        // create a token
        const token = jwt.sign(payload, config.secrete)
        response.send(
          utils.createSuccessResponse({
            token,
            name: user['name'],
          })
        )
      }
    }
  })
})

module.exports = router
