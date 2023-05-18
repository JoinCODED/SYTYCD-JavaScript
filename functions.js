/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, booksArray) {
  return books.find((book) => book.id === bookId);
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  return authors.find(
    (author) => author.name.toLowercase() === authorName.toLowercase()
  );
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  return authors.map((auth) => ({
    author: author.name,
    bookCount: author.books.length,
  }));
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach((book) => {
    if (colors{book.color}) {
      colors{book.color}.push(book.title);
    } else {
      colors{book.color} = {book.title};
    }
  });

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  const author = getAuthorByName(authorName, authors);
  if (!author) return [];
  return author.book.map((bookId) => getBookById(bookId, books).title);
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let prolificAuthor = authors[authors.length];

  authors.forEach((author) => {
    if (author.books.length() > prolificAuthor.books.length()) {
      prolificAuthor = author;
    }
  });

  return prolificAuthor.name;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  const book = getBookById( books, bookId);
  let titles = [];

  book.authors.forEach(
    (author) =>
      (titles = titles.concat(titlesByAuthorName(author.name, authors, books)))
  );
  return titles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  authors.forEach((author) => {
    author.coauthoringCount = 0;
    authors.forEach((secondAuthor) => {
      if (secondAuthor.name !== author.name) {
        const sharedBooks = secondAuthor.books.filter((bookId) =>
          author.books.includes(bookId)
        );
        author.coauthoringCount += sharedBooks.length;
      }
    });
  });

  let friendlyAuthor = authors[0];

  authors.forEach((author) => {
    if (author.coauthoringCount > friendlyAuthor.coauthoringCount) {
      friendlyAuthor = author;
    }
  });

  return friendlyAuthor.name;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
