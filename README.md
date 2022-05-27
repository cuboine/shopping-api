# shopping-api
Shopping API using Node.js, restify, and MongoDB (mongoose)

### Heroku
  [https://shopping-api-sw.herokuapp.com](https://shopping-api-sw.herokuapp.com)


### Documentation
The **Postman Documentation** can be viewed [here](https://documenter.getpostman.com/view/9010967/Uz5AsKEV).


#### API Endpoints
> Every endpoint requires to be authenticated except for `/register` and `/login`.
- Register
  - `/register`



      |Field|Type|Required|Value
      |---|---|---|:---:|
      |email|String|yes|
      |password|String|yes|
      |type|String|yes|`"customer"` or `"seller"`
      |name|String|yes, if `type === "seller"`
      |firstName|String|yes, if `type === "customer"`
      |lastName|String|yes, if `type === "customer"`

   
- Login
  - `/login`

      |Field|Type|Required|Value
      |---|---|---|:---:|
      |email|String|yes|
      |password|String|yes|
   
- Add new product. Has to be logged in as a seller.
  - `/products`

      |Field|Type|Required|Value
      |---|---|---|:---:|
      |name|String|yes|
      |price|Decimal|no|
   
- Get list of products. If logged in as seller, returns only their products.
  - `/products`
   
- Get product
  - `/products/:id`
   
- Add product to cart
  - `/products/:id/add-to-cart`
   
- Get products in cart
  - `/customers/:id/cart`
   
- Checkout all products in cart
  - `/customers/:id/cart/checkout`
   
- Get list of orders (customer)
  - `/customers/:id/orders`
   
- Get list of orders (seller)
  - `/sellers/:id/orders`
