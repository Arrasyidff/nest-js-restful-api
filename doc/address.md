# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization: token

Request Body :

```json
{
    "street": "Merdeka street", /** optional */
    "city": "Badung",
    "province": "Bali", /** optional */
    "country": "Indonesia",
    "postal_code": "12211"
}
```

Response Body :

```json
{
    "data": {
        "id": 1,
        "street": "Merdeka street", /** optional */
        "city": "Badung",
        "province": "Bali", /** optional */
        "country": "Indonesia",
        "postal_code": "12211"
    }
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization: token

Response Body :

```json
{
    "data": {
        "id": 1,
        "street": "Merdeka street", /** optional */
        "city": "Badung",
        "province": "Bali", /** optional */
        "country": "Indonesia",
        "postal_code": "12211"
    }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization: token

Request Body :

```json
{
    "street": "Merdeka street", /** optional */
    "city": "Badung",
    "province": "Bali", /** optional */
    "country": "Indonesia",
    "postal_code": "12211"
}
```

Response Body :

```json
{
    "data": {
        "id": 1,
        "street": "Merdeka street", /** optional */
        "city": "Badung",
        "province": "Bali", /** optional */
        "country": "Indonesia",
        "postal_code": "12211"
    }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization: token

Response Body :

```json
{
    "data": true
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization: token

Response Body :

```json
{
    "data": [
        {
            "id": 1,
            "street": "Merdeka street", /** optional */
            "city": "Badung",
            "province": "Bali", /** optional */
            "country": "Indonesia",
            "postal_code": "12211"
        }
    ]
}
```