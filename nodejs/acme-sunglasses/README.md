# ACME Sunglasses

This is a sample template for [ACME Sunglasses](https://github.com/retgits/acme-sunglasses) - Below is a brief explanation of the files in this repository:

```
.
├── orders                      <-- The source code for the "Orders service"
├── users                       <-- The source code for the "Users service"
├── warehouse                   <-- The source code for the "Warehouse service"
├── README.md                   <-- This file
└── serverless.yml              <-- The deployment file for the Serverless Framework
```

For more information about the services and how they work, check out the [ACME Sunglasses repository](https://github.com/retgits/acme-sunglasses)

## Requirements

* [An Akka Serverless account](https://docs.cloudstate.com/getting-started/lightbend-account.html)
* [Node.js installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)
* [Serverless Framework installed](https://www.serverless.com/framework/docs/getting-started/)

## Setup process

### Local development

All the code for the user function bits of the sample are located in `function.js`.

To run your sample locally, you can run:

```bash
npm install
serverless package -f <the service you want to start>
serverless local start -f <the service you want to start>
```

## Testing

What good are services if you can't test them? This section has a cURL command for each of the operations that the services expose.

### Warehouse

#### Receive Product

```bash
curl --request POST \
  --url http://localhost:9002/warehouse/5c61f497e5fdadefe84ff9b9 \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "5c61f497e5fdadefe84ff9b9",
    "name": "Yoga Mat",
    "description": "Limited Edition Mat",
    "imageURL": "/static/images/yogamat_square.jpg",
    "price": 62.5,
    "stock": 5,
    "tags": [
        "mat"
    ]
}'
```

#### Get Product Details

```bash
curl --request GET \
  --url http://localhost:9002/warehouse/5c61f497e5fdadefe84ff9b9
```

#### Update Stock

```bash
curl --request POST \
  --url http://localhost:9002/warehouse/5c61f497e5fdadefe84ff9b9/stock \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "5c61f497e5fdadefe84ff9b9",
    "stock": 10
}'
```

### Users

#### New User

```bash
curl --request POST \
  --url http://localhost:9003/user/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"id": "1",
	"name": "retgits",
	"emailAddress": "retgits@example.com",
	"orderID":[]
}'
```

#### Get User Details

```bash
curl --request GET \
  --url http://localhost:9003/user/1
```

#### Update User Orders

```bash
curl --request POST \
  --url http://localhost:9003/user/1/order \
  --header 'Content-Type: application/json' \
  --data '{
	"id": "1",
	"orderID": "1234"
}'
```

### Order

#### Add Order

```bash
curl --request POST \
  --url http://localhost:9001/order/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"userID": "1", 
	"orderID": "4557", 
	"items":[
		{
			"productID": "turkey", 
		 	"quantity": 12, 
			"price": 10.4
		}
	]
}'
```

#### Get Order Details

```bash
curl --request GET \
  --url http://localhost:9001/order/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"userID": "1",
	"orderID": "1234"
}'
```

#### Get All Orders

```bash
curl --request GET \
  --url http://localhost:9001/order/1/all
```