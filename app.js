// SELECTS

// info
const totalBooks = document.querySelector("#total-books")
const booksRead = document.querySelector("#books-read")
const totalPages = document.querySelector("#total-pages")
const pagesRead = document.querySelector("#pages-read")

// inputs
const inputTitle = document.querySelector("#inp-title")
const inputAuthor = document.querySelector("#inp-author")
const inputPagesTotal = document.querySelector("#inp-pages-total")
const inputPagesRead = document.querySelector("#inp-pages-read")
const allInputs = document.querySelectorAll(".input")

// btns
const btnClear = document.querySelector("#btn-clear")
const btnAdd = document.querySelector("#btn-add")

// else
const booksContainer = document.querySelector("#books-container")


// BTNS

// btn clear
btnClear.addEventListener("click", () => {
    allInputs.forEach(input => {
        input.value = ""
    })
})

// btn add
btnAdd.addEventListener("click", () => {
    // 1.check input
    // 2.add book (make html, fill html, add book)
    let book = document.createElement("div")
    book.classList.add("book")
    booksContainer.appendChild(book)
    let bookTitle = document.createElement("h3")
    let bookAuthor = document.createElement("h4")
    // 3.update info
})



// FUNCTIONS

// loops through all books and sets information about books and pages on sidebar
function updateInfo() {

}