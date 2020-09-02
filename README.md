# simple faker json api server

## Abstract

Faker is really helpful when building a prototype or simple proof of concept. But what do you use when working in a purely functional language like Elm? There is currently no faker-type package for Elm and it is not likely that there will ever be one. This server exposes fake data over a simple API that mimics the API implemented by Faker.js and can be used to provide random fake data to anything that can fetch data and parse a json payload.

## Why use this

While this may be generally useful for any type of web app, it is really handy when developing in a functional language than enforces purity. The alternatives for a language like Elm are to create a faker-type package in Elm (way more effort than seems worth it), use ports to interop with JavaScript (still more effort than need be), or just fetch fake data over the faker server as needed. This simple server makes it easy to request fake data over the network via simple GET requests.

## What this won't do

It doesn't attempt to provide complex and abstract data structures like a Customer or ShoppingCart. It assumes you'll create "factory" functions in your application which will build an abstract data structure and flesh it out with fake data from this server.

## How to use it

Start the server on the default port with:

`yarn start`

Start the server on port 4567 with:

`PORT=4567 yarn start`

Send a GET request to http://localhost:3000/path where path corresponds to a Faker API. For example, to get a random number between 0 and 100 directly from Faker.js, you would call:

`faker.random.number(100)`

Use the query string to pass options to the faker function.

To make the same request via the server use:

`curl 'http://localhost:3000/faker/random/number?100'`

```
{
  "path": "/faker/random/number",
  "tag": "number",
  "opts": 100,
  "result": 5
}
```

You can omit the parens when no option is needed:

`curl 'http://localhost:3000/faker/random/number'`

```
{
  "path": "/faker/random/number",
  "tag": "number",
  "opts": null,
  "result": 66927
}
```

Some options are an object:

`curl 'http://localhost:3000/faker/random/number?\{"min":20,"max":50\}'`

```
{
  "path": "/faker/random/number",
  "tag": "number",
  "opts": {
    "min": 20,
    "max": 50,
    "precision": 1
  },
  "result": 20
}
```

Some options are strings:

`curl 'http://localhost:3000/faker/name/firstName?female'`

```
{
  "path": "/faker/name/firstName",
  "tag": "firstName",
  "opts": "female",
  "result": "Casey"
}
```

Request multiple fakes in a single request using the mustache form:
(Note url encoded space as %20, option to firstName() passed inline)

`curl 'http://localhost:3000/faker/fake?\{\{name.lastName\}\},%20\{\{name.firstName(female)\}\}'`

```
{
  "path": "/faker/fake",
  "tag": "fake",
  "opts": "{{name.lastName}}, {{name.firstName(female)}}",
  "result": "Rippin, Audrey"
}
```

Passing an array in the query string by wrapping the vaules with parens:

`curl 'http://localhost:3000/faker/helpers/randomize?("one","two","three")'`

```
{
  "path": "/faker/helpers/randomize",
  "tag": "randomize",
  "opts": [
    "one",
    "two",
    "three"
  ],
  "result": "two"
}
```

Get help:

`curl 'http://localhost:3000/help'`

## Thanks

Thanks to Marak Squires for [Faker.js](https://github.com/Marak/faker.js)

See the Faker.js [API](http://marak.github.io/faker.js/)
