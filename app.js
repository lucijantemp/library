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



// BUTTONS

// btn clear
btnClear.addEventListener("click", () => {
    clearInputs()
})

// btn add
btnAdd.addEventListener("click", () => {
    // 1.check input
    if (inputValid()) {
        // 2.add book (make html, fill html, add book)
        makeBook()
        updateEventListeners()
        // 3.update info
        updateInfo()
        clearInputs()
    }

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
        btn.addEventListener("click", () => {
            let pagesReadSpan = btn.parentElement.querySelector(".span-pages-read")
            let pagesTotalSpan = btn.parentElement.querySelector(".span-pages-total")
            switch (btn.innerHTML) {
                case "+":
                    // check if number is max
                    if (!(parseInt(pagesReadSpan.innerHTML) == parseInt(pagesTotalSpan.innerHTML))) {
                    pagesReadSpan.innerHTML = parseInt(pagesReadSpan.innerHTML) + 1
                    }
                    break
                case "-":
                    // check if number is 0
                    if (!(parseInt(pagesReadSpan.innerHTML) == 0)) {
                    pagesReadSpan.innerHTML = parseInt(pagesReadSpan.innerHTML) - 1
                    }
                    break
            }
            updateInfo()
        })
    })
}

// these variables will change dynamically based on size of input (this is handled in inputValid() funciton)
let titleSize = "2rem"
let authorSize = "2rem"
function makeBook() {
    // book div foundation
    let book = document.createElement("div")
    book.classList.add("book")
    booksContainer.appendChild(book)
    // add title and author
    let bookTitle = document.createElement("h1")
    let bookAuthor = document.createElement("h2")
    bookTitle.innerHTML = inputTitle.value
    bookTitle.style.fontSize = titleSize
    bookAuthor.innerHTML = inputAuthor.value
    bookAuthor.style.fontSize = authorSize
    book.appendChild(bookTitle)
    book.appendChild(bookAuthor)
    // creating and adding all necesarry nodes
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
    optionDelete.innerHTML = "DELETE"
}

function inputValid() {
    // 1. check if title is valid (input will be tested on different regexes to see if font size needs to be adjusted)
    let regexBig = /^([\w]{1,6}\s){0,4}[\w]{1,6}$/ // 2rem
    let regexMid = /^([\w]{1,9}\s){0,5}[\w]{1,9}$/ // 1.6rem
    let regexSmall = /^([\w]{1,15}\s){0,9}[\w]{1,15}$/ // 1.2rem

    let string = inputTitle.value
    if (string.match(regexBig) && string.match(regexBig)[0] == string) {
        titleSize = "2rem"
    } else if (string.match(regexMid) && string.match(regexMid)[0] == string) {
        titleSize = "1.6rem"
    } else if (string.match(regexSmall) && string.match(regexSmall)[0] == string) {
        titleSize = "1.2rem"
    } else {
        console.log("title error")
        return false
    }

    // 2. check if author name is valid

    // 3. check if total pages is a valid number greater than 0 and less than 100k
    let regex = /^(0|[1-9]\d{0,4})$/
    let number1 = inputPagesTotal.value
    if (!(number1.match(regex)[0] == number1)) {
        console.log("total error")
        return false
    }

    // 4. check if read pages is a valid number greater than 0 and less than total pages
    let number2 = inputPagesRead.value
    if ( !((number2.match(regex)[0] == number2) && (parseInt(number2) >= 0) && (parseInt(number2) <= parseInt(number1))) ) {
        console.log("read error")
        return false
    }

    return true
}

function clearInputs() {
    allInputs.forEach(input => {
        input.value = ""
    })
}