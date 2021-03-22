const isOpenBrackets = (char) => ({
  ['(']: true,
  [ '{']: true,
  [ '[']: true,
  [ ')']: false,
  [  '}']: false,
  [']']: false
}[char])

const getPair = (char) => ({
  ['(']: ')',
  ['{']: '}',
  ['[']: ']'
}[char])

const checkParentheses = (str) => {
  const regex = /[\(\)\{\}\[\]]/g;
  const found = str.match(regex);
  let stack = [];
  for (let i = 0 ; i < found.length ; i++) {
    debugger;
    if(isOpenBrackets(found[i])) {
      stack.push(found[i])
    } else {
      if (getPair(stack.pop()) !== found[i]) return false
    }
  }
  if (stack.length === 0){
    return true
  }
  return false
}

console.log(checkParentheses('--()--')) // true
console.log(checkParentheses('-a]--[')) // false
console.log(checkParentheses('dsa{vsfs{ad')) // false
console.log(checkParentheses('j78(g5b]uyg')) // false
console.log(checkParentheses(',m{i987y}hj')) // true
console.log(checkParentheses('dsa[3ed---:]::')) // true

console.log(checkParentheses('--()---a--[dsa{vsfs{adj78(g5buyg)}}]')) //true
