/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */

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
  return document.createElement(element);
}

class Book {
  constructor(title, author, id) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.id = id;
  }
}

let background = true;

function showBook(object) {
  const name = object.bookTitle;
  const author = object.bookAuthor;

  const booksWrapper = searchID('booksSection');

  const container = createElement('li');
  container.classList.add('bookGoesHere', 'd-flex', 'flex-row', 'justify-content-around', 'col-lg-12', 'p-2');
  if (background) {
    container.classList.add('background-color');
    background = !background;
  } else {
    background = !background;
  }
  container.id = name;

  const bookinfowrapper = createElement('div');
  bookinfowrapper.classList.add('d-flex', 'flex-row', 'col-lg-6', 'text-left');

  const bookNameandAuthor = createElement('p');
  bookNameandAuthor.classList.add('m-1');
  bookNameandAuthor.innerText = `"${name}" by ${author}`;
  bookinfowrapper.appendChild(bookNameandAuthor);
  container.appendChild(bookinfowrapper);

  const buttonDiv = createElement('div');
  buttonDiv.classList.add('col-md-4', 'align-self-center');

  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', () => {
    container.remove();
    background = true;
    const books = document.getElementsByClassName('bookGoesHere');
    Array.prototype.forEach.call(books, (elem) => {
      if (elem.classList.contains('background-color') && !background) {
        elem.classList.remove('background-color');
      } else if (!elem.classList.contains('background-color') && background) {
        elem.classList.add('background-color');
      }
      background = !background;
    });
    Books.deleteBook(object);
    localStorage.booksObjects = JSON.stringify(Books.booksList);
  });
  deleteButton.innerText = 'Remove Book';
  deleteButton.classList.add('btn', 'btn-outline-danger');
  buttonDiv.appendChild(deleteButton);
  container.appendChild(buttonDiv);

  booksWrapper.appendChild(container);
}

function addBooks() {
  const title = searchID('bookName').value;
  const author = searchID('bookAuthor').value;
  const id = Date.now();
  const object = new Book(title, author, id);
  Books.addNewBook(object);
  showBook(object);
  localStorage.booksObjects = JSON.stringify(Books.booksList);
}
const targets = [];

function updateSection(target) {
  const element = searchID(target);
  if (element.id === 'addBook') {
    element.classList.add('d-flex');
  }
  element.classList.remove('d-none');

  const notSelected = [];
  targets.forEach((elem) => {
    if (elem.id !== target) {
      notSelected.push(elem);
    }
  });
  notSelected.forEach((current) => {
    current.classList.remove('d-flex');
    current.classList.add('d-none');
  });
}

function eventHandlers() {
  const nav = searchID('nav-items');
  Array.prototype.forEach.call(nav.children, (child) => {
    const a = child.children[0];
    targets.push(searchID(a.dataset.target));
    a.addEventListener('click', () => {
      updateSection(a.dataset.target);
    });
  });
}

window.onload = () => {
  const { DateTime } = luxon;
  document.getElementById('dateDisplay').innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
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
  eventHandlers();
};