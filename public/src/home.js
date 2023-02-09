/*
getTotalBooksCount gets an array of book objexts
returns a number of book objects 
*/
function getTotalBooksCount(books) {
  return books.length;
}

/*
getTotalAccountsCount gets an array of account objexts
returns a number of account objects 
*/
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*
getBooksBorrowedCount gets an array of books 
returns a number of checked out books from the library
*/
function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {if(book.borrows[0].returned === false) count++});
  return count;

}
/*
getMostCommonGenres gets an array of books 
returns an array containing five objects or fewer that represents 
the most common occurring genres, ordered from most common to least
*/
function getMostCommonGenres(books) {
  const result = [];
  const genreCount = books.reduce((acc, book) => {
     acc[book.genre] = acc[book.genre] + 1 || 1;
     return acc;
  }, {});
  format(genreCount, result);
  sortDescending(result);  
  return result;
}

/*
getMostPopularBooks takes in an array of book objects
returns array of up to five most popular books
popularity is determined by # of borrows

  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
function getMostPopularBooks(books) {
  const result = [];  
  books.forEach((book) => {result.push({"name" : book.title, "count" : book.borrows.length})});
  sortDescending(result);
  if(result.length > 5) result.length = 5;
  return result;
}
/*
getMostPopularAuthors takes in array of book objects and an array of author objects
returns array of up to 5 authors who's books have been checked out the most
*/
function getMostPopularAuthors(books, authors) {
  const result = [];

  //bookCount assigns author id the count of books*borrows
  const bookCount = books.reduce((acc, book) => {
     acc[book.authorId] = acc[book.authorId] + book.borrows.length || book.borrows.length;
     return acc;
  }, {});
  
  //bookCount formatted as desired object with max 5 entries
  format(bookCount, result);
  const formatted = [];

  //assign author first name and last name to the name variable
  const authorNames = authors.forEach((author) => {
    result.forEach((book) => {
      if(author.id == book.name){
        const newObj = {
          "name" : `${author.name.first + ' ' + author.name.last}`,
          "count" : book.count
        }
        formatted.push(newObj);
      }
    })
  });

  //sort in descending order by count
  sortDescending(formatted);
  return formatted;
}
/*
 * Helper function to sort an array of objects by descending value
 */
function sortDescending(array){
  array.sort((a, b) => b.count - a.count);
  return array;
}
/*
 * Helper function to format array as follows {name: , count: } & limit to 5 results
 */
function format(unformatted, result){
  for (const iterator in unformatted) {
    if (result.length < 5) {
      const item = {'name' : iterator, 'count' : unformatted[iterator]};
      result.push(item);
    }
  }
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
