/*
findAuthorById has an array of author objects and an id of a single author object
return author object with matching id
*/
function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

/*
findBookById has an array of book objects and an id of a single book object
return book object with matching id
*/
function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

/*
partitionBooksByBorrowedStatus has an array of book objects
returns an array with two arrays inside of it
All of the inputted books are present in either the first or second array.
the first array contains book objects that represent the books _that are currently 
checked out_, 
the second array contains book objects that represent the books _that have been returned._ 
You can check for the return status by looking 
at the first transaction object in the `borrows` array.
*/
function partitionBooksByBorrowedStatus(books) {
  //if books are checked out (returned = false) add to array
  //if books are returned (returned = true) add to separate array
  const partitionedArray = [];
  //loop through books
  const checkedOut = books.filter((book)=> !book.borrows[0].returned);
  const notCheckedOut = books.filter((book)=> book.borrows[0].returned);
  
  //add both arrays to one array
  partitionedArray.push(checkedOut);
  partitionedArray.push(notCheckedOut);
  return partitionedArray;

}
/*
getBorrowersForBook has a book object and an array of account objects
return array of ten or fewer account objects  that represents the accounts given 
by the IDs in the provided book's `borrows` array. 
However, each account object should include the `returned` entry from the 
corresponding transaction object in the `borrows` array.
*/

function getBorrowersForBook(book, accounts) {
  const borrowers = [];

  //pull out borrows array
  const borrow = book.borrows;

  //find the account ids for the books borrowed
  const accountList = accounts.forEach((acct) => {
    borrow.forEach((borrowRecord) => {
     if(borrowRecord.id === acct.id && borrowers.length < 10) {
      const newObj = {
        "returned": borrowRecord.returned,
        ...acct
      };
      borrowers.push(newObj);
     }
    });
   });

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
