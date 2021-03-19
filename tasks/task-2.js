const invert = (obj) =>
  Object.keys(obj).reduce((res, key) => ({...res,
    [obj[key]]: key
  })
  , {})

console.log(invert({ 'a': 'some', 'b': 'object', 'c': 1 })) // { 'some': 'a', 'object': 'b', '1': 'c' }
