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
const booksContainer = document.querySelector(".books-container")


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
    // add title and author
    let bookTitle = document.createElement("h1")
    let bookAuthor = document.createElement("h2")
    bookTitle.innerHTML = inputTitle.value
    bookAuthor.innerHTML = inputAuthor.value
    book.appendChild(bookTitle)
    book.appendChild(bookAuthor)
    // add pages and del/edit option
    let optionsContainer = document.createElement("div")
    optionsContainer.classList.add("options-container")
    let optionEditContainer = document.createElement("div")
    optionEditContainer.classList.add("options-edit-container")
    let optionDelete = document.createElement("button")
    optionDelete.classList.add("option-delete")
    let optionEditDisplay = document.createElement("div")
    optionEditDisplay.classList.add("edit-display")
    let optionEditPlus = document.createElement("button")
    optionEditPlus.classList.add("edit-pages")
    optionEditPlus.classList.add("plus")
    let optionEditMinus = document.createElement("button")
    optionEditMinus.classList.add("edit-pages")
    optionEditMinus.classList.add("minus")
    book.appendChild(optionsContainer)
    optionsContainer.appendChild(optionEditContainer)
    optionsContainer.appendChild(optionDelete)
    optionEditContainer.appendChild(optionEditDisplay)
    optionEditContainer.appendChild(optionEditPlus)
    optionEditContainer.appendChild(optionEditMinus)
    optionEditDisplay.innerHTML = `<span class="span-pages-read">${inputPagesRead.value}</span>/<span class="span-pages-total">${inputPagesTotal.value}</span>`
    optionEditMinus.innerHTML = "-"
    optionEditPlus.innerHTML = "+"
    optionDelete.innerHTML = "delete"
    updateEventListeners()
    // 3.update info
    updateInfo()
})



// FUNCTIONS

// loops through all books and sets information about books and pages on sidebar
function updateInfo() {
    // count total books
    totalBooks.innerHTML = document.querySelectorAll(".book").length
    // count read pages
    let pagesReadTemp = 0
    document.querySelectorAll(".span-pages-read").forEach(i => pagesReadTemp = pagesReadTemp + parseInt(i.innerHTML))
    pagesRead.innerHTML = pagesReadTemp
    // count total pages
    let pagesTotalTemp = 0
    document.querySelectorAll(".span-pages-total").forEach(i => pagesTotalTemp = pagesTotalTemp + parseInt(i.innerHTML))
    totalPages.innerHTML = pagesTotalTemp
    // count read books
    let readBooksCount = 0
    document.querySelectorAll(".book").forEach(book => {
        let left = book.querySelector(".span-pages-read").innerHTML
        let right = book.querySelector(".span-pages-total").innerHTML
        if (left == right) {
            readBooksCount += 1
        }
    })
    booksRead.innerHTML = readBooksCount
}

function updateEventListeners() {
    // delete btn 
    let btnsDelete = document.querySelectorAll(".option-delete")
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove()
            updateInfo()
        })
    })
    // +/- btns
    // first select all +/- btn than convert it to array so I can call reverse() because I need only last 2 elem to update event listener
    let btnsIncDec = Array.from(document.querySelectorAll(".edit-pages")).reverse()
    btnsIncDec.slice(0, 2).forEach(btn => {
        console.log(btn.getEventListeners)
        btn.addEventListener("click", () => {
            let pagesReadSpan = btn.parentElement.querySelector(".span-pages-read")
            switch (btn.innerHTML) {
                case "+":
                    pagesReadSpan.innerHTML = parseInt(pagesReadSpan.innerHTML) + 1
                    break
                case "-":
                    pagesReadSpan.innerHTML = parseInt(pagesReadSpan.innerHTML) - 1
                    break
            }
            updateInfo()
        })
    })
}