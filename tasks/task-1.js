const groupBy = (array, func) =>
  array.reduce((res, item) => {
    const applyFunc = func(item);
    if (res.hasOwnProperty(applyFunc)){
      res[applyFunc].push(item);
      return res;
    } else {
      return {...res, [applyFunc]: [item] }
    }
  },{})

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)) // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
