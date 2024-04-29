# Project: 10xers

## End-point: home

### Method: GET

> ```
> {{baseUrl}} = http://localhost:3000
> ```

### Response: 200

```json
[
  {
    "id": 1,
    "name": "iPhone 14 Pro Max",
    "description": "Apple's flagship smartphone with a stunning Super Retina XDR display, powerful A16 Bionic chip, and an advanced camera system.",
    "price": 1099,
    "brand": "Apple",
    "createdAt": "2024-04-29T02:10:37.654Z",
    "updatedAt": "2024-04-29T02:10:37.654Z"
  },
  {
    "id": 2,
    "name": "Samsung Galaxy S23 Ultra",
    "description": "Samsung's top-of-the-line smartphone with a bright and vibrant Dynamic AMOLED 2X display, powerful Snapdragon 8 Gen 2 processor, and versatile quad-camera setup.",
    "price": 1200,
    "brand": "Samsung",
    "createdAt": "2024-04-29T02:10:37.654Z",
    "updatedAt": "2024-04-29T02:10:37.654Z"
  },
  {
    "id": 3,
    "name": "Google Pixel 7 Pro",
    "description": "Google's premium smartphone with a stunning 6.7-inch QHD+ display, Tensor G2 chip, and advanced camera capabilities powered by Google's computational photography.",
    "price": 899,
    "brand": "Google",
    "createdAt": "2024-04-29T02:10:37.654Z",
    "updatedAt": "2024-04-29T02:10:37.654Z"
  },
  {
    "id": 4,
    "name": "OnePlus 11 Pro",
    "description": "OnePlus' flagship device with a stunning 6.7-inch QHD+ AMOLED display, powerful Snapdragon 8 Gen 2 processor, and a triple camera system with Hasselblad tuning.",
    "price": 900,
    "brand": "OnePlus",
    "createdAt": "2024-04-29T02:10:37.654Z",
    "updatedAt": "2024-04-29T02:10:37.654Z"
  },
  {
    "id": 5,
    "name": "Xiaomi 13 Pro",
    "description": "Xiaomi's high-end smartphone with a 6.73-inch AMOLED display, Snapdragon 8 Gen 2 processor, and a triple camera setup co-engineered with Leica.",
    "price": 1000,
    "brand": "Xiaomi",
    "createdAt": "2024-04-29T02:10:37.654Z",
    "updatedAt": "2024-04-29T02:10:37.654Z"
  }
]
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: search

### Method: GET

> ```
> {{baseUrl}}/search?search=xia
> ```

### Body (**raw**)

```json

```

### Query Params

| Param  | value |
| ------ | ----- |
| search | xia   |

### 🔑 Authentication noauth

| Param | value | Type |
| ----- | ----- | ---- |

### Response: 200

```json
[
  {
    "id": 2,
    "name": "Samsung Galaxy S23 Ultra",
    "description": "Samsung's top-of-the-line smartphone with a bright and vibrant Dynamic AMOLED 2X display, powerful Snapdragon 8 Gen 2 processor, and versatile quad-camera setup.",
    "price": 1200,
    "brand": "Samsung",
    "createdAt": "2024-04-29T05:04:00.864Z",
    "updatedAt": "2024-04-29T05:04:00.864Z"
  }
]
```

### Response: 404

```json
{
  "message": "Product not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: register

### Method: POST

> ```
> {{baseUrl}}/register
> ```

### Body (**raw**)

```json
{
  "email": "userexample.com",
  "password": "123456",
  "admin": "false"
}
```

### Response: 201

```json
{
  "id": 3,
  "email": "user3@example.com"
}
```

### Response: 201

```json
{
  "id": 4,
  "email": "user4@example.com"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

### Response: 400

```json
{
  "message": "Admin is required"
}
```

### Response: 400

```json
{
  "message": "Password length should be between 4 and 20 characters"
}
```

### Response: 400

```json
{
  "message": "Email format is not correct"
}
```

### Response: 401

```json
{
  "message": "Email already exist"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login

### Method: POST

> ```
> {{baseUrl}}/login
> ```

### Body (**raw**)

```json
{
  "email": "user3@example.com"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE0MzU4ODQyfQ.LfVdRBQSGd-rRkGFuLgyEc9Zq27JgMOyMUEonauUhAo"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzE0MzU5MDAyfQ.ILfHOzQEa9FPTiYosAw92QmAkLqR60v3aFa7hVl-0nI"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

### Response: 401

```json
{
  "message": "Invalid email/password"
}
```

### Response: 401

```json
{
  "message": "Invalid email/password"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get order

### Method: GET

> ```
> {{baseUrl}}/order
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
[
  {
    "id": 5,
    "userId": 3,
    "productId": 1,
    "createdAt": "2024-04-29T04:23:08.710Z",
    "updatedAt": "2024-04-29T04:23:08.710Z",
    "Product": {
      "id": 1,
      "name": "iPhone 14 Pro Max",
      "description": "Apple's flagship smartphone with a stunning Super Retina XDR display, powerful A16 Bionic chip, and an advanced camera system.",
      "price": 1099,
      "brand": "Apple",
      "createdAt": "2024-04-29T02:10:37.654Z",
      "updatedAt": "2024-04-29T02:10:37.654Z"
    }
  }
]
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add order

### Method: POST

> ```
> {{baseUrl}}/order
> ```

### Body (**raw**)

```json
{
  "productId": 6
}
```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 201

```json
{
  "data": {
    "id": 5,
    "userId": 3,
    "productId": 1,
    "updatedAt": "2024-04-29T04:23:08.710Z",
    "createdAt": "2024-04-29T04:23:08.710Z"
  }
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Product not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: edit order

### Method: PATCH

> ```
> {{baseUrl}}/edit-order/:id
> ```

### Body (**raw**)

```json
{
  "productId": 2
}
```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "Order has been updated"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Order not found"
}
```

### Response: 404

```json
{
  "message": "Product not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete order

### Method: DELETE

> ```
> {{baseUrl}}/delete-order/:id
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "Order has been deleted"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Order not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add product

### Method: POST

> ```
> {{baseUrl}}/add-product
> ```

### Body (**raw**)

```json
{
  "name": "linux",
  "description": "linux phone",
  "price": 100,
  "brand": "fedora"
}
```

### 🔑 Authentication bearer

| Param | value                  | Type   |
| ----- | ---------------------- | ------ |
| token | {{access_token_admin}} | string |

### Response: 201

```json
{
  "id": 6,
  "name": "linux",
  "description": "linux phone",
  "price": 100,
  "brand": "fedora"
}
```

### Response: 400

```json
{
  "message": "name cannot be null"
}
```

### Response: 400

```json
{
  "message": "name must be unique"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: edit product

### Method: PUT

> ```
> {{baseUrl}}/edit-product/:id
> ```

### Body (**raw**)

```json
{
  "name": "linux",
  "description": "linux phone",
  "price": 200,
  "brand": "ubuntu"
}
```

### 🔑 Authentication bearer

| Param | value                  | Type   |
| ----- | ---------------------- | ------ |
| token | {{access_token_admin}} | string |

### Response: 200

```json
{
  "message": "Product has been updated"
}
```

### Response: 400

```json
{
  "message": "price cannot be null"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

### Response: 404

```json
{
  "message": "Product not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete product

### Method: DELETE

> ```
> {{baseUrl}}/delete-product/:id
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value                  | Type   |
| ----- | ---------------------- | ------ |
| token | {{access_token_admin}} | string |

### Response: 200

```json
{
  "message": "Product has been deleted"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

### Response: 404

```json
{
  "message": "Product not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: view order

### Method: GET

> ```
> {{baseUrl}}/view-order
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value                  | Type   |
| ----- | ---------------------- | ------ |
| token | {{access_token_admin}} | string |

### Response: 200

```json
[
  {
    "id": 1,
    "Product": {
      "id": 1,
      "name": "iPhone 14 Pro Max",
      "description": "Apple's flagship smartphone with a stunning Super Retina XDR display, powerful A16 Bionic chip, and an advanced camera system.",
      "price": 1099,
      "brand": "Apple"
    }
  },
  {
    "id": 2,
    "Product": {
      "id": 2,
      "name": "Samsung Galaxy S23 Ultra",
      "description": "Samsung's top-of-the-line smartphone with a bright and vibrant Dynamic AMOLED 2X display, powerful Snapdragon 8 Gen 2 processor, and versatile quad-camera setup.",
      "price": 1200,
      "brand": "Samsung"
    }
  },
  {
    "id": 3,
    "Product": {
      "id": 1,
      "name": "iPhone 14 Pro Max",
      "description": "Apple's flagship smartphone with a stunning Super Retina XDR display, powerful A16 Bionic chip, and an advanced camera system.",
      "price": 1099,
      "brand": "Apple"
    }
  },
  {
    "id": 4,
    "Product": {
      "id": 2,
      "name": "Samsung Galaxy S23 Ultra",
      "description": "Samsung's top-of-the-line smartphone with a bright and vibrant Dynamic AMOLED 2X display, powerful Snapdragon 8 Gen 2 processor, and versatile quad-camera setup.",
      "price": 1200,
      "brand": "Samsung"
    }
  }
]
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
