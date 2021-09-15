/* eslint-disable max-classes-per-file */
class BooksDatabase {
  constructor() {
    this.booksList = [];
  }

  addNewBook(bookInfo) {
    this.booksList.push(bookInfo);
  }

  deleteBook(bookInfo) {
    this.booksList = this.booksList.filter((element) => element.id !== bookInfo.id);
  }
}

const Books = new BooksDatabase();

function searchID(id) {
  return document.getElementById(id);
}

function createElement(element) {
  return document.createElement(element)
}

class Book {
  constructor(title, author, id) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.id = id;
  }
}

var background = true

function showBook(object) {
  const name = object.bookTitle;
  const author = object.bookAuthor;

  const booksWrapper = searchID('booksSection');

  const container = createElement("li");
  container.classList.add("bookGoesHere", "d-flex", "flex-row", "justify-content-around", "col-lg-6", "p-2");
  if (background) {
    container.classList.add("bg-secondary")
    background = !background
  } else {
    background = !background
  }
  container.id = name;

  const bookinfowrapper = createElement("div")
  bookinfowrapper.classList.add("d-flex", "flex-row")

  const bookNameandAuthor = createElement('p');
  bookNameandAuthor.classList.add("m-1")
  bookNameandAuthor.innerText = "\""+name+"\" by "+author;
  bookinfowrapper.appendChild(bookNameandAuthor);
  container.appendChild(bookinfowrapper)

  const buttonDiv = createElement("div")
  buttonDiv.classList.add("col-md-4")

  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', () => {
    container.remove();
    background = true
    books = document.getElementsByClassName("bookGoesHere")
    Array.prototype.forEach.call(books, (elem) => {
      if (elem.classList.contains("bg-secondary") && !background) {
        elem.classList.remove("bg-secondary")
      } else if (!elem.classList.contains("bg-secondary") && background){
        elem.classList.add("bg-secondary")
      }
      background = !background
    })
    Books.deleteBook(object);
    localStorage.booksObjects = JSON.stringify(Books.booksList);
  });
  deleteButton.innerText = 'Remove Book';
  buttonDiv.appendChild(deleteButton)
  container.appendChild(buttonDiv);

  booksWrapper.appendChild(container);
}

function addBooks() {
  const title =   searchID('bookName').value;
  const author = searchID('bookAuthor').value;
  const id = Date.now();
  const object = new Book(title, author, id);
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