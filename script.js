const myLibrary = [];

//Book function constructor
function Book(title, author, description, isRead) {
	this.title = title;
	this.author = author;
	this.description = description;
	this.isRead = isRead;

	//Create a unique ID for the book object
	this.id = crypto.randomUUID();
}

function addBookToLibrary(bookParamsArray, library) {
	//Create a new book using constructor Book
	let book = new Book(...bookParamsArray);

	//Add book to library
	library.push(book);
}

addBookToLibrary(
	[
		"LOTR",
		"Jean Luc",
		"A Magnificent book about fantastic races that fight for good against the evil orcs.",
		false,
	],
	myLibrary
);

addBookToLibrary(
	[
		"Fascism",
		"Carl Marx",
		"A book about the most notorious form of governmental control on this planet: fascism",
		true,
	],
	myLibrary
);

//////////////////
////////////////
///////////

let booksContainerEle = document.getElementById("books-container");

//Utility function to make DRY elements
function createElement(type, className, textContent) {
	let element = document.createElement(type);
	element.className = className;
	textContent ? (element.textContent = textContent) : null;

	return element;
}

//Takes in a book oject and creates an node
function createBookCardElement(book) {
	let bookCardEle = createElement("div", "book-card");
	bookCardEle.id = book.id;
	let cardHeaderEle = createElement("div", "card-header");
	let titleEle = createElement("p", "title", `${book.title} - `);
	let authorEle = createElement("span", "author", book.author);

	titleEle.append(authorEle);
	let isReadEle = createElement("p", "is-read-display", book.isRead ? "Read" : "Not Read");
	isReadEle.setAttribute("read", book.isRead);

	cardHeaderEle.append(titleEle, isReadEle);

	let descHeaderContainerEle = createElement("div");

	let descEle = createElement("p", "desc", book.description);
	descHeaderContainerEle.append(cardHeaderEle, descEle);

	let actionBtnsEle = createElement("div", "action-btns");
	let deleteBtn = createElement("button", "delete-btn", "Delete");
	deleteBtn.setAttribute("book-id", book.id);
	let toggleReadBtn = createElement("button", "toggle-read-btn", "Toggle Read");
	toggleReadBtn.setAttribute("book-id", book.id);

	actionBtnsEle.append(deleteBtn, toggleReadBtn);

	bookCardEle.append(descHeaderContainerEle, actionBtnsEle);
	return bookCardEle;
}

//Removes the book object from the library
function deleteBook(id, library) {
	let bookIndex = library.findIndex((book) => book.id === id);
	library.splice(bookIndex, 1);
}

//Deletes all card elements, then re-creates them and adds them with updates database
function updateBookElements(library) {
	let currentBookCards = document.querySelectorAll(".book-card");
	currentBookCards.forEach((card) => {
		card.remove();
	});

	library.forEach((book) => {
		booksContainerEle.append(createBookCardElement(book));
	});
}

function toggleIsRead(id, library) {
	let bookIndex = library.findIndex((book) => book.id === id);
	library[bookIndex].isRead = !library[bookIndex].isRead;

	updateBookElements(library);
}

//Delete button functionality
booksContainerEle.addEventListener("click", (e) => {
	if (e.target.className === "delete-btn") {
		//Remove the book from the library and update
		let id = e.target.getAttribute("book-id");
		deleteBook(id, myLibrary);
		updateBookElements(myLibrary);
	}
});

//Toggle read functionality
booksContainerEle.addEventListener("click", (e) => {
	if (e.target.className === "toggle-read-btn") {
		toggleIsRead(e.target.getAttribute("book-id"), myLibrary);
	}
});

window.addEventListener("load", () => {
	updateBookElements(myLibrary);
});
