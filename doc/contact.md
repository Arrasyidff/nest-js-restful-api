# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :
- Authorization: token

Request Body :

```json
{
    "first_name": "Arrasyid Fadel",
    "last_name": "Fatonsyah",
    "email": "aff.anton20@gmail.com",
    "phone": "089635164141"
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Arrasyid Fadel",
        "last_name": "Fatonsyah",
        "email": "aff.anton20@gmail.com",
        "phone": "089635164141"
    }
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId

Headers :
- Authorization: token

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Arrasyid Fadel",
        "last_name": "Fatonsyah",
        "email": "aff.anton20@gmail.com",
        "phone": "089635164141"
    }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :
- Authorization: token

Request Body :

```json
{
    "first_name": "Arrasyid Fadel",
    "last_name": "Fatonsyah",
    "email": "aff.anton20@gmail.com",
    "phone": "089635164141"
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "first_name": "Arrasyid Fadel",
        "last_name": "Fatonsyah",
        "email": "aff.anton20@gmail.com",
        "phone": "089635164141"
    }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :
- Authorization: token

Response Body (Success) :

```json
{
    "data": true
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :
- Authorization: token

Query Params :
- name: string, contact.first_name or contact.last_name optional
- phone: string, contact.phone optional
- email: string, contact.email optional
- page: number, default 1
- size: number, default 10

Response Body (Success) :

```json
{
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    },
    "data": [
        {
            "id": 1,
            "first_name": "Arrasyid Fadel",
            "last_name": "Fatonsyah",
            "email": "aff.anton20@gmail.com",
            "phone": "089635164141"
        },
        {
            "id": 2,
            "first_name": "Arrasyid Fadel",
            "last_name": "Fatonsyah",
            "email": "aff.anton20@gmail.com",
            "phone": "089635164141"
        }
    ]
}
```