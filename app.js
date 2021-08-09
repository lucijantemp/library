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
const btnHamburger = document.querySelector("#btn-hamburger")
    const slice1 = document.querySelector(".slice-1")
    const slice2 = document.querySelector(".slice-2")
    const slice3 = document.querySelector(".slice-3")

// else
const booksContainer = document.querySelector(".books-container")
const message = document.querySelector(".inp-message") // will be used to tell user when input is invalid
const sidebar = document.querySelector("aside")



// BUTTONS

// btn clear
btnClear.addEventListener("click", () => {
    resetInputs()
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
        resetInputs()
    }

})

// btn mobile navbar (btnHamburger)
btnHamburger.addEventListener("click", () => {
    booksContainer.classList.toggle("not-active")
    sidebar.classList.toggle("aside-active")
    // make animation on btnHamburger slices
    slice1.classList.toggle("slice-1-active")
    slice2.classList.toggle("slice-2-active")
    slice3.classList.toggle("slice-3-active")
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
let authorSize = "1.8rem"
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
    let errorColor = "#ff0000" // red

    // 1. check if title is valid (input will be tested on different regexes to see if font size needs to be adjusted)
    let regexBig = /^([\w]{1,6}\s){0,4}[\w]{1,6}$/ // 2rem
    let regexMid = /^([\w]{1,9}\s){0,5}[\w]{1,9}$/ // 1.6rem
    let regexSmall = /^([\w]{1,15}\s){0,9}[\w]{1,15}$/ // 1.2rem

    let string1 = inputTitle.value
    if (string1.match(regexBig) && string1.match(regexBig)[0] == string1) {
        titleSize = "2rem"
    } else if (string1.match(regexMid) && string1.match(regexMid)[0] == string1) {
        titleSize = "1.6rem"
    } else if (string1.match(regexSmall) && string1.match(regexSmall)[0] == string1) {
        titleSize = "1.2rem"
    } else {
        message.innerHTML = "Title input is invalid"
        inputTitle.style.color = `${errorColor}`
        return false
    }

    // 2. check if author name is valid
    let regexName = /^([a-zA-Z]{1,15}\.?\s){0,4}[a-zA-Z]{1,15}\.?$/ // name can have 5 words max with 15 chars max for each word

    let string2 = inputAuthor.value
    if (!(string2.match(regexName) && string2.match(regexName)[0] == string2)) {
        message.innerHTML = "Author input is invalid"
        inputAuthor.style.color = `${errorColor}`
        return false
    }

    // 3. check if total pages is a valid number greater than 0 and less than 100k
    let regex = /^(0|[1-9]\d{0,4})$/
    let number1 = inputPagesTotal.value
    if (!(number1.match(regex) && number1.match(regex)[0] == number1)) {
        message.innerHTML = "Total pages input is invalid"
        inputPagesTotal.style.color = `${errorColor}`
        return false
    }

    // 4. check if read pages is a valid number greater than 0 and less than total pages
    let number2 = inputPagesRead.value
    if ( !((number2.match(regex) && number2.match(regex)[0] == number2) && (parseInt(number2) >= 0) && (parseInt(number2) <= parseInt(number1))) ) {
        message.innerHTML = "Read pages input is invalid"
        inputPagesRead.style.color = `${errorColor}`
        return false
    }

    return true
}

function resetInputs() {
    allInputs.forEach(input => {
        input.value = ""
        input.style.color = "#000000" // reset colors to default
        message.innerHTML = "" // delete message if there is any
    })
}