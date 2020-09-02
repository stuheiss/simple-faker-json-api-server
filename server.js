// simple faker json api server

// handles all faker APIs
// returns json payload with key of "result" or "error"

const help = [
  'Functions can take optional arg as value or object:',
  'All Faker.js functions are callable',
  'URI fake general form: http://<server>:<port>/faker/<group>/<function>',
  'URI should be encoded with javascript:encodeURI() or php:rawurlencode()',
  'Note: path /faker/random/number corresponds to function faker.random.number',
  'Example paths:',
  '/faker/random/number',
  '/faker/random/number?42',
  '/faker/random/number?{"max":42}',
  '/faker/random/float?{"max":1.99,"min":1,"precision":0.0001}',
  '/faker/name/findName',
  'A complex fake can be specified using the mustache form:',
  '/faker/fake({{name.lastName}}, {{name.firstName}})',
  'Pass array in query string by wrapping values with parens:',
  '/faker/helpers/randomize?("one","two","three")',
];

const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const faker = require('faker');

server.use(middlewares);

/**
 * Service a faker request
 */
server.get('/faker/*', (req, res) => {
  const path = req.path
  const query = req.query
  const tag = path.split('/').pop();
  const fn = path.split('/').slice(2).reduce((acc, cur) => {
    return acc[cur]
  }, faker);
  const key = Object.keys(query)[0]
  const parseOpts = args => {
    try {
      return JSON.parse(args);
    } catch (e) {
      return args
    }
  }
  // options as array in form of (arg, arg ...)
  let opts
  if (typeof key === 'string' && key.match(/^\(.*\)$/)) {
    opts = key.match(/^\((.*)\)$/)[1].split(",").map(parseOpts)
  } else {
    opts = typeof key === 'string' ? parseOpts(key) : key
  }
  let result
  try {
    result = fn(opts)
  } catch (e) {
    result = 'exception: ' + e.message
  }
  res.status(200).jsonp({
    path,
    tag,
    opts,
    result,
  });
});

/**
 * Help
 */
server.get('/help', (req, res) => {
  res.status(200).jsonp({
    help,
  });
});

server.listen(port);
console.log(`faker api server running on http://localhost:${port}`);
