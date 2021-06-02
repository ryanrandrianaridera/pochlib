// const NO_RESULTS_MSG = "Aucun livre n'a été trouvé.";
const EMPTY_FIELDS_MSG = "Merci de remplir les deux champs proposés.";
const NO_BOOK_INFO = "Information manquante";
// const AVOID_DUPLICATES_MSG = "Vous ne pouvez ajouter deux fois le même livre !";

class Book {
  constructor(title, idISBN, idItem, author, description, image) {
    this.title = title;
    this.idISBN = idISBN;
    this.idItem = idItem;
    this.author = author;
    this.description = description;
    this.image = image;
  }

  createBookPresentation(parentElt) {
    const myBooks = JSON.parse(sessionStorage.getItem("myPochlist"));
    const alreadyExist = myBooks
      ? Object.keys(myBooks).includes(this.idItem)
      : false;

    const section = document.createElement("section");
    section.classList.add("result");
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("result__info");
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("result__img");

    const iconBkmrk = document.createElement("i");
    iconBkmrk.classList.add("fas");
    iconBkmrk.classList.add("fa-bookmark");
    iconBkmrk.style.display = alreadyExist ? "none" : "block";

    const iconTrash = document.createElement("i");
    iconTrash.classList.add("fas");
    iconTrash.classList.add("fa-trash");
    iconTrash.style.display = alreadyExist ? "block" : "none";

    const titleElt = document.createElement("h3");
    titleElt.classList.add("result__info--title");
    const idElt = document.createElement("h3");
    const idHiddenElt = document.createElement("div");
    idHiddenElt.style.display = "none";
    const authorElt = document.createElement("p");
    const descriptionElt = document.createElement("p");
    const imageElt = document.createElement("img");
    imageElt.src = this.image;
    titleElt.innerHTML = "Titre : " + this.title;
    idElt.innerHTML = "Id : " + this.idISBN;
    idHiddenElt.innerHTML = this.idItem;
    authorElt.innerHTML = "Auteur : " + this.author;
    descriptionElt.innerHTML = "Description : " + this.description;
    const bookInfoChildren = [
      iconBkmrk,
      iconTrash,
      titleElt,
      idElt,
      idHiddenElt,
      authorElt,
      descriptionElt,
    ];
    for (const child of bookInfoChildren) {
      bookInfo.appendChild(child);
    }
    imgWrapper.appendChild(imageElt);
    section.appendChild(bookInfo);
    section.appendChild(imgWrapper);
    parentElt.appendChild(section);

    iconBkmrk.addEventListener("click", (e) => {
      addBookInPochlist(this);
    });
    // iconTrash.addEventListener("click", (e) => {
    //   removeBookInPochlist(this);
    // });
  }
}

// add function to add book in pochlist

function addBookInPochlist(book) {
  let myBooks = JSON.parse(sessionStorage.getItem("myPochlist"));

  if (!myBooks) myBooks = {};

  myBooks[book.idItem] = book;
  sessionStorage.setItem("myPochlist", JSON.stringify(myBooks));
}

// function removeBookInPochlist{book}

// add function to insert new element with "myBooks" parent Div, and "hr" last target

function insertElement(elt) {
  const parentDiv = document.getElementById("myBooks");
  const target = document.getElementsByTagName("hr")[0];
  parentDiv.insertBefore(elt, target);
}

// function to create field

function createField(label, input) {
  const field = document.createElement("div");
  field.classList.add("form__field");
  field.appendChild(label);
  field.appendChild(input);
  return field;
}

// function to create form

function createForm() {
  const form = document.createElement("form");
  form.classList.add("form");

  const labelTitle = document.createElement("label");
  const labelTitleTxt = document.createTextNode("Titre du livre");
  labelTitle.setAttribute("for", "intitle");
  labelTitle.appendChild(labelTitleTxt);

  const title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("name", "intitle");
  title.setAttribute("id", "book-title");
  // title.setAttribute("required", "");
  // title.setAttribute("pattern", "[A-Za-z]+");

  const labelAuthor = document.createElement("label");
  const labelAuthorTxt = document.createTextNode("Auteur");
  labelAuthor.setAttribute("for", "inauthor");
  labelAuthor.appendChild(labelAuthorTxt);

  const author = document.createElement("input");
  author.setAttribute("type", "text");
  author.setAttribute("name", "inauthor");
  author.setAttribute("id", "author");
  // author.setAttribute("required", "");

  // const message = createWarningMessage("empty-fields-msg", EMPTY_FIELDS_MSG);

  const searchBtn = document.createElement("button");
  searchBtn.innerHTML = "Rechercher";
  searchBtn.classList.add("btn");
  searchBtn.onclick = (event) => {
    event.preventDefault();
    if (title.value == "" || author.value == "") {
      alert(EMPTY_FIELDS_MSG);
    } else {
      searchBook();
      //title.value = "Livre";
      title.focus();
      //author.value = "Auteur";
    }
  };

  const dropBtn = document.createElement("button");
  dropBtn.innerHTML = "Annuler";
  dropBtn.classList.add("btn", "btn--cancel");
  dropBtn.onclick = (event) => {
    event.preventDefault();
    cancelSearch(form);
    // message.style.display = "none";
  };

  form.appendChild(createField(labelTitle, title));
  form.appendChild(createField(labelAuthor, author));
  // form.appendChild(message);
  form.appendChild(searchBtn);
  form.appendChild(dropBtn);
  insertElement(form);
  form.style.display = "none";
}

// function to display form

function displayForm() {
  const btn = document.getElementById("addBook");
  const form = document.getElementsByClassName("form")[0];
  const title = document.getElementById("book-title");
  if (btn !== null && form !== null) {
    btn.style.display = "none";
    form.style.display = "block";
    title.focus();
  }
}

// function to add button to add a book
function addButton() {
  const addBookBtn = document.createElement("button");
  addBookBtn.innerHTML = "Ajouter un livre";
  addBookBtn.classList.add("btn", "btn--center");
  addBookBtn.id = "addBook";
  insertElement(addBookBtn);
  addBookBtn.onclick = displayForm;
}

// function to create message
// function createWarningMessage(msgId, msg) {
//   const message = document.createElement("div");
//   message.id = msgId;
//   message.classList.add("warning-msg");
//   message.innerHTML = msg;
//   message.style.display = "none";
//   return message;
// }

// function to add result container
function createResultsContainer() {
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "res-output";
  resultsContainer.classList.add("res-container");
  resultsContainer.style.display = "none";
  const resultsLine = document.createElement("hr");
  const resultsTitle = document.createElement("h2");
  resultsTitle.innerHTML = "Résultats de recherche";
  // const warningMsg = createWarningMessage("no-results-msg", NO_RESULTS_MSG);
  const resultsGrid = document.createElement("div");
  resultsGrid.classList.add("res-grid");
  resultsGrid.id = "list-grid";
  resultsContainer.appendChild(resultsLine);
  resultsContainer.appendChild(resultsTitle);
  // resultsContainer.appendChild(warningMsg);
  resultsContainer.appendChild(resultsGrid);
  insertElement(resultsContainer);
}

// function to add pochlist container
function createPochlistContainer() {
  const pochlistContainer = document.getElementById("content");
  const pochlistGrid = document.createElement("div");
  pochlistGrid.classList.add("res-grid");
  pochlistGrid.id = "pochlist-grid";
  pochlistContainer.appendChild(pochlistGrid);
}

// function to search book with XMLHttpRequest with API Google Book
function searchBook() {
  const resultsContainer = document.getElementById("res-output");
  const listOutput = document.getElementById("list-grid");
  // const message = document.getElementById("no-results-msg");
  let title = document.getElementById("book-title").value;
  let author = document.getElementById("author").value;
  let request = new XMLHttpRequest();
  const url =
    "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
    title +
    "+inauthor:" +
    author;
  console.log(url);
  while (listOutput.childNodes.length > 0) {
    cleanOutputList(listOutput);
  }
  request.open("GET", url);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);
      if (response.totalItems === 0) {
        resultsContainer.style.display = "none";
        alert(
          "Aucun livre n'a été trouvé, merci d'effectuer une nouvelle recherche"
        );
        // message.style.display = "block";
      } else {
        console.log("totalItems :" + response.totalItems);
        displayResults(response, listOutput);
        // message.style.display = "none";
        resultsContainer.style.display = "block";
      }
    } else if (this.status !== 200) {
      console.error(
        "Network request failed. Returned status of " + this.status
      );

      // if (response.items.length > 0) {
      //   response.items.forEach((book) => {
      //     // creation d'un livre
      //     createOneBook(book);
      //   }
      // }
    }
  };
}

function cleanOutputList(parentElt) {
  while (parentElt.lastChild) {
    parentElt.removeChild(parentElt.lastChild);
  }
}

// // function to create Book
// function createOneBook(book) {
//   console.log("createOneBook", book);
// }

function displayResults(data, list) {
  let item, title, id, idHidden, author, description, image;
  let books = [];
  // let index = 0;
  for (const [index, item] of data.items.entries()) {
    console.log("i", index);
    id = null;
    title = item.volumeInfo.title;
    idHidden = item.id;
    if (item.volumeInfo.industryIdentifiers) {
      for (let i = 0; i < item.volumeInfo.industryIdentifiers.length; i++) {
        if (item.volumeInfo.industryIdentifiers[i].type === "ISBN_13") {
          id = item.volumeInfo.industryIdentifiers[i].identifier;
        }
      }
      if (!id) {
        id = item.volumeInfo.industryIdentifiers[0].identifier;
      }
    } else {
      id = NO_BOOK_INFO;
    }
    author = item.volumeInfo.authors
      ? item.volumeInfo.authors[0]
      : NO_BOOK_INFO;
    if (item.volumeInfo.description) {
      description = item.volumeInfo.description;
      if (description.length > 200) {
        description = description.slice(0, 198);
        description = description.substring(0, description.lastIndexOf(" "));
        if (!description.endsWith(".")) {
          description += "...";
        }
      }
    } else {
      description = NO_BOOK_INFO;
    }

    image =
      item.volumeInfo?.imageLinks?.thumbnail || "./assets/img/unavailable.png";

    books[index] = new Book(title, id, idHidden, author, description, image);
    books[index].createBookPresentation(list);
    console.log(books[index]);
    // index++;
  }
}
// function display pochlist

function displayPochlist() {
  const parentDiv = document.getElementById("pochlist-grid");
  const myBooks = JSON.parse(sessionStorage.getItem("myPochlist"));

  if (myBooks) {
    for (const idBook in myBooks) {
      const book = new Book(
        myBooks[idBook].title,
        myBooks[idBook].idISBN,
        myBooks[idBook].idItem,
        myBooks[idBook].author,
        myBooks[idBook].description,
        myBooks[idBook].image
      );
      book.createBookPresentation(parentDiv);
    }
  }
}

//function cancel search
function cancelSearch(form) {
  const parentElt = document.getElementById("list-grid");
  const btn = document.getElementById("addBook");
  const resContainer = document.getElementById("res-output");
  const inputs = form.querySelectorAll("input");
  if (parentElt) {
    cleanOutputList(parentElt);
  }
  form.style.display = "none";
  btn.style.display = "block";
  resContainer.style.display = "none";
  for (const input of inputs) {
    if (input) {
      input.value = "";
    }
  }
}

function onload() {
  addButton();
  createForm();
  createResultsContainer();
  createPochlistContainer();
  displayPochlist();
}

window.addEventListener("load", onload);
