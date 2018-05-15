# Ranking server
This server keeps track of user rankings.

## Starting server
This server requires [nodejs](http://nodejs.org) ***v8 or higher***.

To run the server:
```
npm start
```

## Usage
Server will run in [http://localhost:8080](). For testing purposes, server will randomly generate 10000 users.

### Endpoints
* ```GET /user/:id``` Get score for given user.
* ```POST /user/:id``` Set score for given user. Data example: { score: '+20' }
* ```GET /top/:limit``` Get score ranking for top X users.
* ```GET /at/:position/:limit``` Get relative score ranking for position and limit. ie: /at/100/3 will give you from 97th to 103rd.

### Algorithm choice
Since no criteria was given I decided to use a fast insertion/read object for each user and a fast access duplicated collection for tops, only re-sorting when something is changed. This will improve performance but will consume more memory (since data is stored twice), excelling at big memory systems vs slow processing ones.

Sorting will be executed each time a ranking is requested but only if an insertion was executed before. This will result in a slow calc for the first ranking asked but considerably faster subsequent calls.

## Testing
To launch tests run:
```
npm test
```

### Install test dependencies
This server **does not use** any library. Nonetheless, it uses testing libraries 'chai' and 'mocha' to run network testsing. If you plan to run the tests you must install such dependencies:

```
npm install
```
