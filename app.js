// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) { /* add book to list - method inside prototype object of UI*/
    const list = document.querySelector('#book-list');
    
    // create tr element
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearFields = function() {  /* clear fields - method inside prototype object of UI*/
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, color) {   
    const div = document.createElement('div');  /* create a div element */
    div.className = `alert ${color}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);  /* insert alert msg before form in container */

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteBook = function(target) { /* delete book */
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);  /* instantiate Book() constructor */
    const ui = new UI() /* instantiate UI() constructor */

    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error'); // error alert
    } else {
        ui.addBookToList(book); /* add book to list */
        ui.showAlert('Book Added!', 'success');             // success alert
        ui.clearFields(); /* clear fields */
    }

});

// Event Listeners for add book - event delegation
document.getElementById('book-list').addEventListener('click', function(e) {
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target); /* delete book */
    ui.showAlert('Book Removed!', 'success'); // success alert
});




