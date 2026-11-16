# API v2

A small REST API I built while learning backend development with Node.js.

It covers auth (register, login, JWT access + refresh tokens), user profiles,
a product catalog, a shopping cart, and a simple checkout flow.

> Still a work in progress. I'm using this project to practice Express,
> Mongoose, and JWT, so expect changes.

## Stack

- **Node.js** + **Express 5**
- **MongoDB** with **Mongoose**
- **JWT** for access and refresh tokens
- **bcrypt** for password hashing
- **cookie-parser** for the refresh token cookie

## Features

**Auth**

- Register and login with hashed passwords
- Short-lived access token + long-lived refresh token
- Refresh token stored in an `httpOnly` cookie and in the database

**User**

- Get, update, and delete your own account

**Product**

- Public product list and search
- Create products owned by the logged-in user

**Cart & Order**

- Add products to your cart
- View your cart with the total price
- Checkout: creates an order, decreases product stock, and clears the cart

## Getting started

```bash
git clone https://github.com/v0nx6/firs_project.git
cd Api_v2
npm install
```

Create a `.env` file in the root:

```bash
JWT_SECRET=your_access_token_secret
JWT_VERIFY=your_refresh_token_secret
```

Make sure MongoDB is running locally. The connection string is hardcoded in
`app.js` for now (`mongodb://localhost/test123`) — I'll move it to `.env` later.

Run it:

```bash
node app.js
```

Use `node --watch app.js` if you want it to restart on file changes.

Server runs at `http://localhost:3000`.

## Endpoints

### Auth

| Method | Endpoint        | Auth   | Description                                  |
| ------ | --------------- | ------ | -------------------------------------------- |
| POST   | `/api/register` | —      | Register a new user                          |
| POST   | `/api/login`    | —      | Login, returns access token + refresh cookie |
| GET    | `/api/refresh`  | cookie | Get a new access token                       |

### User — Bearer token required

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| GET    | `/user/me`     | Get your own profile    |
| PUT    | `/user/update` | Update your own profile |
| POST   | `/user/logout` | Clear the refresh token |
| DELETE | `/user/delete` | Delete your own account |

### Product

| Method | Endpoint              | Auth   | Description                      |
| ------ | --------------------- | ------ | -------------------------------- |
| GET    | `/product/getAll`     | —      | List all products                |
| GET    | `/product/filter`     | —      | Search products by name          |
| POST   | `/product/addProduct` | Bearer | Create a product owned by you    |
| POST   | `/product/addToCart`  | Bearer | Add a product to your cart       |
| GET    | `/product/cart`       | Bearer | View your cart and total price   |
| POST   | `/product/checkOut`   | Bearer | Turn your cart into an order     |

## Examples

**Register**

```http
POST /api/register
Content-Type: application/json

{
  "username": "budi",
  "email": "budi@mail.com",
  "password": "rahasia123"
}
```

**Login**

```http
POST /api/login
Content-Type: application/json

{
  "username": "budi",
  "password": "rahasia123"
}
```

Response:

```json
{
  "msg": "succes to logIn",
  "jwt": "eyJhbGciOi...",
  "user": "budi",
  "id": "6af902b88f392a4d07877d17"
}
```

**Add a product** (use the token from login)

```http
POST /product/addProduct
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "name": "bakso",
  "price": 20000,
  "stock": 30
}
```

**Add it to your cart**

```http
POST /product/addToCart
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "name": "bakso",
  "sellerID": "6af902b88f392a4d07877d17"
}
```

**View your cart**

```http
GET /product/cart
Authorization: Bearer eyJhbGciOi...
```

```json
{
  "person": "budi",
  "total_price": 20000,
  "total": 1,
  "data": [ ... ]
}
```

**Checkout**

```http
POST /product/checkOut
Authorization: Bearer eyJhbGciOi...
```

```json
{
  "msg": "succes to order",
  "order_id": "6b01a2c3d4e5f60718293a4b",
  "total": 20000
}
```

## Data models

- **User** — `username`, `email`, `password` (hashed), `refreshToken`
- **Product** — `name`, `price`, `stock`, `seller` → User
- **Cart** — `username`, `product` → Product, `price`, `seller` → User
- **Order** — `buyer` → User, `item[]` (product + price), `total`, `status`

## Project structure

```
Api_v2/
├── app.js                    # entry point
├── controller/
│   ├── api.js                # auth routes        (/api)
│   ├── profile.js            # user routes        (/user)
│   └── productRoute.js       # product routes     (/product)
├── route/
│   ├── register.js
│   ├── login.js
│   ├── getData.js
│   ├── updateUser.js
│   ├── deleteData.js
│   └── logOut.js
├── middleware/
│   └── jwtVerify.js          # bearer token check
├── auth/
│   └── refreshToken.js       # refresh flow
├── productController/
│   ├── addProduct.js
│   ├── getAllProduct.js
│   ├── filter.js
│   ├── addToCart.js
│   ├── cartDisplay.js
│   └── checkOut.js
├── schema/
│   ├── Schema.js             # User
│   ├── productSchema.js      # Product
│   ├── cartSchema.js         # Cart
│   └── orderSchema.js        # Order
└── api.http                  # manual request examples
```

## Notes

- `.env` is not committed. Use the example above.
- This is a learning project, not production-ready.
- Prices must be plain numbers in JSON: write `20000`, not `20.000`
  (a dot means a decimal point, so `20.000` is stored as `20`).
- Each user can only have one product with the same name.
- `/product/filter` currently expects `name` in the request body.
