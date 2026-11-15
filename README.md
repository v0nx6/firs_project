# API v2

A small REST API I built while learning backend development with Node.js.

It covers the basics of auth — register, login, JWT access + refresh tokens,
protected routes — plus a simple product endpoint tied to the logged-in user.

> Still a work in progress. I'm using this project to practice Express,
> Mongoose, and JWT, so expect changes.

## Stack

- **Node.js** + **Express 5**
- **MongoDB** with **Mongoose**
- **JWT** for access and refresh tokens
- **bcrypt** for password hashing
- **cookie-parser** for the refresh token cookie

## Features

- Register and login with hashed passwords
- Short-lived access token + long-lived refresh token
- Refresh token stored in an `httpOnly` cookie and in the database
- Bearer token middleware protecting the `/user` routes
- Update and delete your own account
- Add products owned by the logged-in user

## Getting started

```bash
git clone <your-repo-url>
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
| POST   | `/api/SignIn`   | —      | Register a new user                          |
| POST   | `/api/SignUp`   | —      | Login, returns access token + refresh cookie  |
| GET    | `/api/refresh/` | cookie | Get a new access token                       |

### User — Bearer token required

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| GET    | `/user/me`     | Get your own profile    |
| PUT    | `/user/update` | Update your own profile |
| POST   | `/user/logout` | Clear the refresh token |
| DELETE | `/user/delete` | Delete your own account |

### Product — Bearer token required

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | `/api/addProduct` | Add a product owned by you |

> Heads up: the route names are a bit off. `SignIn` actually registers and
> `SignUp` actually logs in. Planning to rename them to `/register` and `/login`.

## Example

**Register**

```http
POST /api/SignIn
Content-Type: application/json

{
  "username": "budi",
  "email": "budi@mail.com",
  "password": "rahasia123"
}
```

**Login**

```http
POST /api/SignUp
Content-Type: application/json

{
  "username": "budi",
  "password": "rahasia123"
}
```

Response:

```json
{
  "msg": "success to log in",
  "jwt": "eyJhbGciOi...",
  "user": "budi",
  "id": "6af902b88f392a4d07877d17"
}
```

**Use the token**

```http
GET /user/me
Authorization: Bearer eyJhbGciOi...
```

## Project structure

```
Api_v2/
├── app.js                  # entry point
├── controller/
│   ├── api.js              # auth + product routes
│   ├── profile.js          # user routes (/user)
│   ├── Schema.js           # User model
│   └── productSchema.js    # Product model
├── route/
│   ├── SignIn.js           # register
│   ├── SignUp.js           # login
│   ├── getData.js
│   ├── updateUser.js
│   ├── deleteData.js
│   └── logOut.js
├── middleware/
│   └── jwtVerify.js        # bearer token check
├── auth/
│   └── refreshToken.js     # refresh flow
├── productController/
│   └── addProduct.js
└── api.http                # manual request examples
```

## Notes

- `.env` is not committed. Use the example above.
- This is a learning project, not production-ready.
- Each user can only have one product with the same name.
