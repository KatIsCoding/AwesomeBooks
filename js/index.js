var books = [];

function searchID(id) {
    return document.getElementById(id);
}




function showBook(object) {
    var name = object["bookTitle"]
    var author = object["bookAuthor"]

    var booksWrapper = searchID("booksSection")

    var container = document.createElement("div")
    container.classList.add("bookContainer")
    container.id = name

    var bookName = document.createElement("h3")
    bookName.innerText = name
    container.appendChild(bookName)

    var bookAuthor = document.createElement("h4")
    bookAuthor.innerText = author
    container.appendChild(bookAuthor)

    var deleteButton = document.createElement("button")
    deleteButton.addEventListener("click", () => {
        container.remove();
        var filtered = books.filter( (element) => {
            return element["bookTitle"] !== name;
        });
        books = filtered;
        localStorage["booksObjects"] = JSON.stringify(books)
    })
    deleteButton.innerText = "Delete"
    container.appendChild(deleteButton)

    booksWrapper.appendChild(container)
}



function addBooks() {
    var title = searchID("bookName").value
    var author = searchID("bookAuthor").value
    let object = {
        bookTitle: title,
        bookAuthor: author
    }
    books.push(object);
    showBook(object);
    localStorage["booksObjects"] = JSON.stringify(books)
}




window.onload = () => {
    var btn = searchID("addBookButton")
    btn.addEventListener("click", () => {
        addBooks()
    })
    if (localStorage["booksObjects"] !== undefined){
        JSON.parse(localStorage["booksObjects"]).forEach(element => {
            showBook(element)
        });
    }
}