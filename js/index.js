/* eslint-disable max-classes-per-file */
class BooksDatabase {
  constructor() {
    this.booksList = [];
  }

  addNewBook(bookInfo) {
    this.booksList.push(bookInfo);
  }

  deleteBook(bookInfo) {
    this.booksList = this.booksList.filter((element) => element.bookTitle !== bookInfo.bookTitle);
  }
}

const Books = new BooksDatabase();

function searchID(id) {
  return document.getElementById(id);
}

class Book {
  constructor(title, author) {
    this.bookTitle = title;
    this.bookAuthor = author;
  }
}

function showBook(object) {
  const name = object.bookTitle;
  const author = object.bookAuthor;

  const booksWrapper = searchID('booksSection');

  const container = document.createElement('div');
  container.classList.add('bookContainer');
  container.id = name;

  const bookName = document.createElement('h3');
  bookName.innerText = name;
  container.appendChild(bookName);

  const bookAuthor = document.createElement('h4');
  bookAuthor.innerText = author;
  container.appendChild(bookAuthor);

  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', () => {
    container.remove();
    Books.deleteBook(object);
    localStorage.booksObjects = JSON.stringify(Books.booksList);
  });
  deleteButton.innerText = 'Delete';
  container.appendChild(deleteButton);

  booksWrapper.appendChild(container);
}

function addBooks() {
  const title = searchID('bookName').value;
  const author = searchID('bookAuthor').value;
  const object = new Book(title, author);
  Books.addNewBook(object);
  showBook(object);
  localStorage.booksObjects = JSON.stringify(Books.booksList);
}

window.onload = () => {
  const btn = searchID('addBookButton');
  btn.addEventListener('click', () => {
    addBooks();
  });
  if (localStorage.booksObjects !== undefined) {
    Books.booksList = JSON.parse(localStorage.booksObjects);
    JSON.parse(localStorage.booksObjects).forEach((element) => {
      showBook(element);
    });
  }
};