/**************************
 *
 * THIS IS A TESTING FILE
 *
 * DO NOT MODIFY THIS FILE
 *
 ***************************/

import {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
} from "./functions";

// Data
import authors from "./authors.json";
import books from "./books.json";

describe("getBookById(bookId, books)", () => {
  test("returns the correct book", () => {
    const expected = books[Math.floor(Math.random() * books.length)];
    const result = getBookById(expected.id, books);
    expect(result).toBe(expected);
  });

  test("returns undefined if the book is not found", () => {
    const result = getBookById(10000, books);
    expect(result).toBeUndefined();
  });
});

describe("getAuthorByName(authorName, authors)", () => {
  test("returns the correct author", () => {
    const expected = authors[Math.floor(Math.random() * authors.length)];
    const result = getAuthorByName(expected.name, authors);
    expect(result).toBe(expected);
  });

  test("is case insensitive", () => {
    const expected = authors[Math.floor(Math.random() * authors.length)];
    let result = getAuthorByName(expected.name.toLowerCase(), authors);
    expect(result).toBe(expected);
    result = getAuthorByName(expected.name.toUpperCase(), authors);
    expect(result).toBe(expected);
  });

  test("returns undefined if the author is not found", () => {
    const result = getAuthorByName("Dr Patatis", authors);
    expect(result).toBeUndefined();
  });
});

describe("bookCountsByAuthor(authors)", () => {
  test("returns the correct number of objects", () => {
    const expected = authors.length;
    const result = bookCountsByAuthor(authors).length;
    expect(result).toBe(expected);
  });

  test("returns the correct format", () => {
    const result = bookCountsByAuthor(authors).every(author => {
      const keys = Object.keys(author);
      return keys.includes("author") && keys.includes("bookCount");
    });
    expect(result).toBe(true);
  });

  test("returns the correct data", () => {
    const expected = [
      { author: "Margaret Atwood", bookCount: 4 },
      { author: "Lauren Beukes", bookCount: 2 }
    ];
    const result = bookCountsByAuthor(authors.slice(0, 2));
    expect(result).toEqual(expected);
  });
});

describe("booksByColor(books)", () => {
  test("returns the correct number of colors", () => {
    const expected = 2;
    const onlyGreenAndBlueBooks = books.filter(
      book => book.color === "green" || book.color === "blue"
    );
    const result = Object.keys(booksByColor(onlyGreenAndBlueBooks)).length;
    expect(result).toBe(expected);
  });

  test("returns the correct format", () => {
    const result = Object.values(booksByColor(books)).every(bookList =>
      Array.isArray(bookList)
    );
    expect(result).toBe(true);
  });

  test("returns the correct data", () => {
    const expected = {
      white: [
        "12 Rules for Life: An Antidote to Chaos",
        "A Dance With Dragons"
      ],
      yellow: ["A Clash of Kings"],
      red: ["A Feast for Crows"]
    };
    const result = booksByColor(books.slice(0, 4));
    expect(result).toEqual(expected);
  });
});

describe("titlesByAuthorName(authorName, authors, books)", () => {
  test("returns the correct list of books", () => {
    let expected = ["The Shining Girls", "Zoo City"].sort();
    let result = titlesByAuthorName("Lauren Beukes", authors, books).sort();
    expect(result).toEqual(expected);
    expected = ["Jane Eyre"];
    result = titlesByAuthorName("Charlotte Brontë", authors, books);
    expect(result).toEqual(expected);
  });

  test("is case-insensitive", () => {
    let expected = ["The Shining Girls", "Zoo City"].sort();
    let result = titlesByAuthorName("LaUreN BEukeS", authors, books).sort();
    expect(result).toEqual(expected);
    expected = ["Jane Eyre"];
    result = titlesByAuthorName("CHaRlOttE BRontë", authors, books);
    expect(result).toEqual(expected);
  });

  test("returns an empty array if the author is not found", () => {
    const result = titlesByAuthorName("Dr Patatis", authors, books);
    expect(result).toEqual([]);
  });
});

describe("mostProlificAuthor(authors)", () => {
  test("returns the correct author name", () => {
    const expected = "Agatha Christie";
    const result = mostProlificAuthor(authors.slice(0, 5));
    expect(result).toBe(expected);
  });
});

describe("relatedBooks(bookId, authors, books)", () => {
  test("returns the correct books", () => {
    const expected = ["The Shining Girls", "Zoo City"].sort();
    const result = relatedBooks(37, authors, books).sort();
    expect(result).toEqual(expected);
  });

  test("can handle co-authored books - returns the titles of books by BOTH authors", () => {
    const expected = [
      "Good Omens",
      "Good Omens",
      "Neverwhere",
      "Coraline",
      "The Color of Magic",
      "The Hogfather",
      "Wee Free Men",
      "The Long Earth",
      "The Long War",
      "The Long Mars"
    ].sort();
    const result = relatedBooks(46, authors, books).sort();
    expect(result).toEqual(expected);
  });

  /**
   * Remove the x to unskip and run the bonus test.
   * Add an x to the previous test to skip it
   */
  xtest("BONUS - removes duplicate books", () => {
    const expected = [
      "Good Omens",
      "Neverwhere",
      "Coraline",
      "The Color of Magic",
      "The Hogfather",
      "Wee Free Men",
      "The Long Earth",
      "The Long War",
      "The Long Mars"
    ].sort();
    const result = relatedBooks(46, authors, books).sort();
    expect(result).toEqual(expected);
  });
});

describe("friendliestAuthor(authors)", () => {
  test("returns the correct author", () => {
    const expected = "Terry Pratchett";
    const result = friendliestAuthor(authors);
    expect(result).toEqual(expected);
  });
});
