# Address History Server

## Running the Server

The only prerequisite for running this server is to have [Docker](https://docs.docker.com/install/) installed. 

Once you have Docker installed and have cloned this repository into a local folder you can run the following:

```bash
./go
```

The server will now be available at http://localhost:5000

## Address Model

This server provides a set of endpoints that allows the user to perform CRUD operations on an `Address` model. The `Address` model has the following properties:


Property | Description | Example
:--- | :--- | :---
id | Unique ID for the Address  | 56b50160-1f92-11e9-8dc5-190726198f14
user_id | Unique ID for the User | da9196a7-11bc-4b54-98c0-53699dbea942
street_one | First line of the street address | 2765 Hyde St
street_two | Second line of the street address| Apartment 1
city | City for the address| San Francisco
state | Two character state code for the address | CA
zip_code | 5 digit zip code of the address | 94109
country | Two character country code for the address | US

## CRUD Endpoints

The Swagger documentation for the endpoints can be found by running the local server and visiting http://localhost:5000/documentation.

### `POST /addresses`

Create a new address for a given `user_id`. The `user_id` can be any unique string you choose (UUIDs might be a good choice here.) Here is a sample payload

```json
{
  "user_id": "da9196a7-11bc-4b54-98c0-53699dbea942",
  "street_one": "123 Main Street",
  "street_two": "Apt 12",
  "city": "Oakland",
  "state": "CA",
  "zip_code": "94618"
}
```

### `GET /users/{userId}/addresses`

Get a list of all addresses belonging to a single `user_id`. This endpoint returns an array that looks like this:

```json
[
  {
    "id": "11de72d0-1f95-11e9-9a66-219542f4f9e9",
    "user_id": "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    "street_one": "123 Main Street",
    "street_two": null,
    "city": "San Francisco",
    "state": "CA",
    "zip_code": "94109",
    "country": "US",
    "created_at": "2019-01-24T05:01:12.191Z",
    "updated_at": "2019-01-24T05:01:12.191Z",
    "deleted_at": null
  },
  {
    "id": "1c190260-1f95-11e9-9a66-219542f4f9e9",
    "user_id": "44fe83d5-a6be-4b2d-934f-1c13796bb569",
    "street_one": "234 Elm Street",
    "street_two": null,
    "city": "Oakland",
    "state": "CA",
    "zip_code": "94618",
    "country": "US",
    "created_at": "2019-01-24T05:01:29.351Z",
    "updated_at": "2019-01-24T05:01:29.351Z",
    "deleted_at": null
  }
]
```

### `GET /addresses/{address_id}`

Get the **latest version** of a given address using its `id`. The endpoint also accepts an optional `as_of` query parameter formatted as [milliseconds since epoch](https://www.epochconverter.com/). If you provide the `as_of` parameter you will get the version of the address at the `as_of` time. The response is always a single address:

```json
{
  "id": "1c190260-1f95-11e9-9a66-219542f4f9e9",
  "user_id": "44fe83d5-a6be-4b2d-934f-1c13796bb569",
  "street_one": "234 Elm Street",
  "street_two": null,
  "city": "Oakland",
  "state": "CA",
  "zip_code": "94618",
  "country": "US",
  "created_at": "2019-01-24T05:01:29.351Z",
  "updated_at": "2019-01-24T05:01:29.351Z",
  "deleted_at": null
}
```

### `PATCH /addresses/{address_id}`

Make an update to an address using its `id` and the fields you want to change. Here is a sample payload to change the `zip_code` for an address:

```json
{
  "zip_code": "94111"
}
```

The response contains the updated address.

### `DELETE /addresses/{address_id}`

Delete an existing address using its `id`. This endpoint responds with no content. 

### `POST /addresses/{address_id}/restore`

The API supports **restoring** a deleted address using this endpoint. It responds with the restored address model.

## The Events Endpoint

### `GET /addresses/{address_id}/events`

You can use this endpoint to see an ordered list of all the events that have occurred for a given address. 

- The sample below contains one of each possible event `type`
- The `payload` is the body of the request that triggered the event. 
- The `url` is a direct link to view the full address with the correct `as_of` populated

```json
[
  {
    "type": "ADDRESS_CREATED",
    "payload": {
      "id": "11de72d0-1f95-11e9-9a66-219542f4f9e9",
      "user_id": "44fe83d5-a6be-4b2d-934f-1c13796bb569",
      "street_one": "123 Main Street",
      "city": "San Francisco",
      "state_id": "CA",
      "zip_code": "94109"
    },
    "created_at": "2019-01-24T05:01:12.236Z",
    "url": "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306072236"
  },
  {
    "type": "ADDRESS_UPDATED",
    "payload": {
      "zip_code": "94111"
    },
    "created_at": "2019-01-24T05:05:49.771Z",
    "url": "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306349771"
  },
  {
    "type": "ADDRESS_DELETED",
    "payload": {
      "deleted_at": "2019-01-24T05:08:50.470Z"
    },
    "created_at": "2019-01-24T05:08:50.505Z",
    "url": "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306530505"
  },
  {
    "type": "ADDRESS_RESTORED",
    "payload": {
      "restored_at": "2019-01-24T05:09:00.050Z"
    },
    "created_at": "2019-01-24T05:09:00.059Z",
    "url": "/addresses/11de72d0-1f95-11e9-9a66-219542f4f9e9?as_of=1548306540059"
  }
]
```
