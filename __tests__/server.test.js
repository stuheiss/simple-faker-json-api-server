const axios = require('axios')
const baseUrl = 'http://localhost:3000/'

test('random.number', () => {
  return axios.get(baseUrl + 'faker/random/number')
  .then(res => {
    expect(res.data.result).toBeGreaterThanOrEqual(0)
  })
})

test('random.number()', () => {
  return axios.get(baseUrl + 'faker/random/number?')
  .then(res => {
    expect(res.data.result).toBeGreaterThanOrEqual(0)
  })
});

test('random.number(10)', () => {
  return axios.get(baseUrl + 'faker/random/number?10')
  .then(res => {
    expect(res.data.result).toBeGreaterThanOrEqual(0)
    expect(res.data.result).toBeLessThanOrEqual(10)
  })
})

test('random.number?{"min":2,"max":5}', () => {
  const url = encodeURI(baseUrl + 'faker/random/number?{"min":2,"max":5}')
  return axios.get(url)
  .then(res => {
    expect(res.data.result).toBeGreaterThanOrEqual(2)
    expect(res.data.result).toBeLessThanOrEqual(5)
  })
});

test('random.float?{"min":2,"max":5,"precision":0.001}', () => {
  const url = encodeURI(baseUrl + 'faker/random/float?{"min":2.0,"max":5.0,"precision":0.001}')
  return axios.get(url)
  .then(res => {
    expect(res.data.result).toBeGreaterThanOrEqual(2)
    expect(res.data.result).toBeLessThanOrEqual(5)
    expect(res.data.result.toString().split('.')[1].length).toBeGreaterThanOrEqual(1)
    expect(res.data.result.toString().split('.')[1].length).toBeLessThanOrEqual(3)
  })
})

test('fake?{{name.lastName}}, {{name.firstName}}', () => {
  const url = encodeURI(baseUrl + 'faker/fake?{{name.lastName}}, {{name.firstName}}')
  return axios.get(url)
  .then(res => {
    expect(res.data.result).toMatch(/^[A-Z]\w*, [A-Z]\w*$/)
  })
})

// pass an array by wrapping values with parens
// faker/helpers/randomize?("one","two","three")'
// resolves to
// faker.helpers.randomize(["one", "two", "three"])
test('helpers.randomize?("one","two","three")', () => {
  const url = encodeURI(baseUrl + 'faker/helpers/randomize?("one","two","three")')
  return axios.get(url)
  .then(res => {
    expect(res.data.result).toMatch(/^one|two|three$/)
  })
})
