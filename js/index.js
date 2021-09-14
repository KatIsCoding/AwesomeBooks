let books = [];

function searchID(id) {
  return document.getElementById(id);
}

class Book{
  constructor(title, author){
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
    const filtered = books.filter((element) => element.bookTitle !== name);
    books = filtered;
    localStorage.booksObjects = JSON.stringify(books);
  });
  deleteButton.innerText = 'Delete';
  container.appendChild(deleteButton);

  booksWrapper.appendChild(container);
}

function addBooks() {
  const title = searchID('bookName').value;
  const author = searchID('bookAuthor').value;
  const object = new Book(title, author)
  books.push(object);
  showBook(object);
  localStorage.booksObjects = JSON.stringify(books);
}

window.onload = () => {
  const btn = searchID('addBookButton');
  btn.addEventListener('click', () => {
    addBooks();
  });
  if (localStorage.booksObjects !== undefined) {
    books = JSON.parse(localStorage.booksObjects);
    JSON.parse(localStorage.booksObjects).forEach((element) => {
      showBook(element);
    });
  }
};