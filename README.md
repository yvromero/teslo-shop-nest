<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

This RESTful API offers CRUD functionality for managing users, products, and authentication. Key features include:

User Registration and Login: Endpoints for user creation and login via JWT authentication.
Product Management: Full CRUD operations for products (create, read, update, delete).
File Upload: Endpoints to upload and retrieve product-related files.
Database Seeding: A seed endpoint to populate the product database.
WebSocket Communication: Secure WebSocket support for real-time communication between authenticated clients.

This WebSocket endpoint is built using socket.io in a NestJS application, Authentication is implemented using JWT tokens.

## Running the app

# Teslo DB
1. Clone the project
2. Build the project
```bash
$ yarn install
```
3. Copy the file ```.env.template``` and rename it to ```.env```
4. Change the values of the environment variables
5. Start the database```docker-compose up -d```
6. Run the project:
```bash
# watch mode
$ yarn start:dev
```
7. Execute seed```http://localhost:3000/api/seed```