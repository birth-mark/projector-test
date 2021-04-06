const util = require('util');

const database = {
  getUser: (id, callback) => {
    const users = [{
      id:   1,
      name: 'Robert'
    }, {
      id:   2,
      name: 'John'
    }];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [ 1, 2 ]
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [{
      id:   1,
      name: 'Art of war'
    }, {
      id:   2,
      name: 'Hunger games'
    }, {
      id:   3,
      name: '1984'
    }];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  }
};

const getUserPromisified = util.promisify(database.getUser);
const getUsersBookPromisified = util.promisify(database.getUsersBook);
const getBuyBookPromisified = util.promisify(database.buyBook);

const buyBookForUser = (bookId, userId, callback) => {
  getUserPromisified(userId)
  .then(user=> {
    return getUsersBookPromisified(userId)
  })
  .then(userBooks => {
    if (userBooks.includes(bookId)) {
      throw new Error(`User already has book with id=${bookId}`);
    }
    return getBuyBookPromisified(bookId)
  })
  .then(() => callback(null, 'Success'))
  .catch(error => callback(error) )
}

const buyBookForUserAsunc = async (bookId, userId) => {
  try {
    await getUserPromisified(userId);
    const userBooks = await getUsersBookPromisified(userId);
    if (userBooks.includes(bookId)) {
      throw new Error(`User already has book with id=${bookId}`);
    }
    await getBuyBookPromisified(bookId)
    return 'Success'
  } catch (error) {
    return error;
  }
}

(async () => {
  const test1 = await buyBookForUserAsunc(1,1, (err, message) => {
    console.log(err) // null
    console.log(message) // 'Success'
  })

  console.log(`test1 = ${test1}`)

  const test2 = await buyBookForUserAsunc(1,2, (err, message) => {
    console.log(err) // 'User already has book with id=1'
    console.log(message) // undefined
  })

  console.log(`test2 = ${test2}`)

  const test3 = await buyBookForUserAsunc(3,2, (err, message) => {
    console.log(err) // null
    console.log(message) // 'Success'
  })

  console.log(`test3 = ${test3}`)

  const test4 = await buyBookForUserAsunc(5,2, (err, message) => {
    console.log(err) // 'Book with id=5 not found'
    console.log(message) // undefined
  })

  console.log(`test4 = ${test4}`)

  const test5 = await buyBookForUserAsunc(1,3, (err, message) => {
    console.log(err) // 'User with id=3 not found'
    console.log(message) // undefined
  })
  console.log(`test5 = ${test5}`)
})();








