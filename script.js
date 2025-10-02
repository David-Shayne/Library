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
		"Fascism: A general guide",
		"Carl Marx",
		"A book about the most notorious form of governmental control on this planet: fascism",
		false,
	],
	myLibrary
);

console.log(myLibrary);
