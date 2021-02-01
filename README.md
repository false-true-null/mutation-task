
# [Nodejs Starter](https://appseed.us/boilerplate-code/nodejs-starter)

Express / [Nodejs Starter](https://appseed.us/boilerplate-code/nodejs-starter) with [JWT authentication](https://jwt.io/introduction/), [SQLite](https://www.sqlite.org/index.html) database, [Sequelize](http://docs.sequelizejs.com/) ORM, unit tests and basic tooling - Provided by **AppSeed** [Web App Generator](https://appseed.us/app-generator).

<br />

![Open-Source Nodejs Starter - Product cover image.](https://github.com/app-generator/static/blob/master/products/boilerplate-code-nodejs-starter-cover.jpg?raw=true) 

<br />

## Requirements
- [Node.js](https://nodejs.org/) >= 6.x

## Usage

Install dependencies.
Run `npm start`

Example request:
```
curl --request POST \
  --url http://localhost:3000/api/statementgen/mutations \
  --header 'Content-Type: application/json' \
  --data '{
	"document": {"_id":1,"name":"Johnny Content Creator","posts":[{"_id":2,"value":"one","mentions":[]},{"_id":3,"value":"two","mentions":[{"_id":5,"text":"apple"},{"_id":6,"text":"orange"}]},{"_id":4,"value":"three","mentions":[]}]},
	"mutation": { "posts": [{ "_id": 2, "value": "too" }] }
}'
```

Tests can be launched with `npm test`
