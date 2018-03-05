# Node.js/Express RESTful API
A persistent, async/await based Node.js API tutorial project with request parameter and body validation as seen on CodeWorkr.

**Enhancements to Original Project**
* Add user password encryption (bcrypt) and login route
* Add JSON Web Token Authorization and route protection

## Getting Started 

### Prerequisites

You will need the following installed on your system
* [Node and NPM](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/)
* [Git](https://git-scm.com/)

### Installation

Clone the repo and install the dependencies in the command line:
```
npm install
```
Rename `nodemon.json-sample` to `nodemon.json` and add your MongoDB connection and JWT key to the environment variables:
```json
{
  "env": {
    "MONGO_DB_CONNECTION": "mongodb://username:password@hostname:port/dbname",
    "JWT_KEY": "secretKeyPassphrase"
  }
}
```
Then start the server:
```
npm run start
```

## Built with
- Node.js and Express
- MongoDB and Mongoose
- JWT
- Joi (Object Schema Validation)