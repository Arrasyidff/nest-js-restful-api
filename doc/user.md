# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "username": "Fadel",
    "password": "secret",
    "name": "Arrasyid Fadel Fatonsyah"
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Fadel",
        "name": "Arrasyid Fadel Fatonsyah"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "Fadel",
    "password": "secret"
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Fadel",
        "name": "Arrasyid Fadel Fatonsyah",
        "token": "session_id_generated"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : PUT /api/users/current

Headers :
- Authorization : token

Response Body (Success) :

```json
{
    "data": {
        "username": "Fadel",
        "name": "Arrasyid Fadel Fatonsyah"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
    "username": "Fadel", /** optional */
    "password": "secret", /** optional */
    "name": "Arrasyid Fadel Fatonsyah" /** optional */
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Fadel",
        "name": "Arrasyid Fadel Fatonsyah"
    }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :
- Authorization : token

Response Body (Success) :

```json
{
    "data": true
}
```