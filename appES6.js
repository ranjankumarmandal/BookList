class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = ''; 
    }

    showAlert(message, color) {
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

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store { /* local storage */
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBook() {
        const books = Store.getBooks();
        books.forEach((book) => {
            const ui = new UI();
            ui.addBookToList(book);
        });
    }

    static remvoeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event event
document.addEventListener('DOMContentLoaded', Store.displayBook);

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);  /* instantiate Book() constructor - this is object of our inputed value*/
    const ui = new UI() /* instantiate UI() constructor */

    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error'); // error alert
    } else {
        ui.addBookToList(book); /* add book to list */
        Store.addBook(book); /* add to localStorage */
        ui.showAlert('Book Added!', 'success');             // success alert
        ui.clearFields(); /* clear fields */
    }

});

// Event Listeners for remove book - event delegation
document.getElementById('book-list').addEventListener('click', function(e) {
    e.preventDefault();

    const ui = new UI();
    ui.deleteBook(e.target); /* delete book */
    Store.remvoeBook(e.target.parentElement.previousElementSibling.textContent) /* remove from localStorage */
    ui.showAlert('Book Removed!', 'success'); // success alert
});