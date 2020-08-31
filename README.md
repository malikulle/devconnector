
# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` and `cd client` `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config`
  * Set `MONGOURI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
- `npm run dev` to start the local server and client side

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JavaScript 
- [slugify](https://github.com/simov/slugify) - For encoding titles into a URL-friendly format
- [bcryptjs](https://github.com/dodo/node-slug) - Hashing Password
- [dotenv](https://github.com/motdotla/dotenv) - Zero-Dependency module that loads environment variables
- [react](https://github.com/reactjs/reactjs.org) - React JS
- [bootstrap](https://github.com/twbs/bootstrap) - Bootstrap
- [axios](https://github.com/axios/axios) - For Sending request to server.
- [redux](https://github.com/reduxjs/redux) - For Global State.
- [react-router-dom]

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/api/` - This folder contains the route definitions (answer, question etc. ) for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Post,Comment).
- `public/` - This folder contains static files for our API.
- `middleware/` - This folder contains middlewares for our API.
- `client/src/components` - This folder contains pages.

## Authentication

Requests are authenticated using the `Authorization` header and value `x-auth-token: {{token}}`. with a valid JWT. 

## Project Screens


## Welcome Page
![Image of HomePage](https://github.com/malikulle/devconnector/blob/master/images/1.png?raw=true)
## Signup Page
![Image of Signup](https://github.com/malikulle/devconnector/blob/master/images/2.png?raw=true)
## Login Page
![Image of LoginPage](https://github.com/malikulle/devconnector/blob/master/images/3.png?raw=true)
## Dashboard After login
![Image of Dashboard](https://github.com/malikulle/devconnector/blob/master/images/4.png?raw=true)
## Add Experience Page
![Image of adding experience](https://github.com/malikulle/devconnector/blob/master/images/5.png?raw=true)
## Developers Page
![Image of Developers](https://github.com/malikulle/devconnector/blob/master/images/6.png?raw=true)
## Posts Page
![Image of posts](https://github.com/malikulle/devconnector/blob/master/images/7.png?raw=true)
## Post Detail and Comment Page
![Image of PostDetail](https://github.com/malikulle/devconnector/blob/master/images/8.png?raw=true)
