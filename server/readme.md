# ecommerce app

## pre-requisites

- mysql
  - http://172.18.4.5:9090/mysql.dmg
  - encryption: legacy (mysql_native_password)
  - password: test1234
  - configuration
    - check your current shell
      - echo $SHELL
    - open .zshrc
      - vim ~/.zshrc
      - keys:
        - shift + G -> go to the last line of the document
        - esc + o -> add a new line
    - add the mysql path to the system path
      - export PATH=$PATH:/usr/local/mysql/bin
      - keys:
        - esc + :wq -> write (save) and quit
    - read the latest changes from zshrc
      - source ~/.zshrc
- nodejs
  - http://172.18.4.5:9090/nodejs.pkg

## requirements (SRS -> software requirement specification)

- seller (react)

  - registration (send an email notification)
  - login
  - create product
  - edit product
  - search / list product
  - orders

- buyer (mobile)
  - registration (send an email notification)
  - login
  - forgot password
  - product
    - list or search products (in sorted order)
    - add review to a product
  - cart
    - add or update a product to cart
    - remove a product from cart
    - place an order
  - order
    - list the orders
    - update the order
    - cancel the order
  - profile
    - get profile
    - update profile
    - change password
