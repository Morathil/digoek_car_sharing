# Docker
## Install
- Docker Compose: `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

## Build & Run
- `npm install`
- `npm run build`
- `sudo docker-compose up --build`

# GraphQL
## Interface
- `http://localhost:4000/graphql` blocked due to authentication

# MongoDB
## AdminMongo
- `http://localhost:8082/`

# REST
## Example Requests
- `curl -X POST http://localhost:4000/register -H "Content-Type:application/json" -d '{"firstName":"c", "lastName": "A", "email": "a@b.at", "password": "testpw"}'`
- `curl -X POST http://localhost:4000/login -H "Content-Type:application/json" -d '{"email": "a@b.at", "password": "testpw"}'`
- `curl -X GET http://localhost:4000/cars/list_available -H "x-access-token: tokenFromLoginResponse"`
- `curl -X POST http://localhost:4000/cars/:carId/rent -H "Content-Type:application/json" -H "x-access-token: tokenFromLoginResponse" -d '{"days":3, "accountId": "test", "price": 300}'`

## SSL
- `https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb`

# Client
## Served via Docker
- `localhost:4000`

## Development
- `npm run development`
- Served on `localhost:8080`

## Registration
- `https://www.freecodecamp.org/news/how-to-authenticate-users-and-implement-cors-in-nodejs-applications/`