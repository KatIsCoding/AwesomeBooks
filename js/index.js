var books = [];

function addBooks(title, author) {
    
    let object = {
        bookTitle: title,
        bookAuthor: author
    }

    books.push(object);
}

function deleteBooks() {

    var bookToDelete = document.getElementById('bookSection');
    var children = bookToDelete.children;
    children.forEach( this.filter());

}