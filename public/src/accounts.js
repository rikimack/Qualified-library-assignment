/*
findAccountById takes in an array of accounts and a string id
returns the account object that has the matching id
*/
function findAccountById(accounts, id) {
//loop through each account and return when id matches
  let found = accounts.find((account) => account.id === id);
  return found;
}

/*
sortAccountsByLastName takes in an array of accounts 
returns a sorted array of account objects alphabetically by last name
*/
function sortAccountsByLastName(accounts) {
//sort items by last name
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1:1);
//return sorted array of objects
  return accounts;
}

/*
getTotalNumberOfBorrows takes in an account object and an array of book objects
returns number of times account ID appears in books borrows array
*/
function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  //iterate through each book
  books.forEach((book) => {
    const borrow = book.borrows;
    //iterate through each borrow record & compare acct parameter vs ids in borrow
    borrow.forEach((acct) => {if(acct.id === account.id) count++;});
  });
  return count;
}

/*
getBooksPossessedByAccount takes in an account object, an array of book objects, & 
an array of author objects
returns array of book objects with 
- author info
- books currently checked out by given acct
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]
*/
function getBooksPossessedByAccount(account, books, authors) {
  let booksCheckedOut = [];
  //look through all books
  //go through all borrow records and match acct id
  //if returned = false, the book is still checked out
  books.forEach((book) => {
    const borrow = book.borrows;
    let borrowedBooks = borrow.filter((acct) => acct.id === account.id && acct.returned === false);
    if (borrowedBooks.length > 0){
      let borrowedBook = book;
      borrowedBook.author = authors.filter((author) => author.id === book.authorId)[0];
      booksCheckedOut.push(borrowedBook);
    }
  });
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
