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

  const labelAuthor = document.createElement("label");
  const labelAuthorTxt = document.createTextNode("Auteur");
  labelAuthor.setAttribute("for", "inauthor");
  labelAuthor.appendChild(labelAuthorTxt);

  const author = document.createElement("input");
  author.setAttribute("type", "text");
  author.setAttribute("name", "inauthor");
  author.setAttribute("id", "author");

  const searchBtn = document.createElement("button");
  searchBtn.innerHTML = "Rechercher";
  searchBtn.classList.add("btn");
  searchBtn.onclick = (event) => {
    event.preventDefault();
    searchBook();
    title.value = "";
    title.focus();
    author.value = "";
  };

  const dropBtn = document.createElement("button");
  dropBtn.innerHTML = "Annuler";
  dropBtn.classList.add("btn", "btn--cancel");
  dropBtn.onclick = (event) => {
    event.preventDefault();
    cancelSearch(form);
  };

  form.appendChild(createField(labelTitle, title));
  form.appendChild(createField(labelAuthor, author));
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

// function to add result container
function createResultsContainer() {
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "res-output";
  resultsContainer.classList.add("res-container");
  resultsContainer.style.display = "none";
  const resultsLine = document.createElement("hr");
  const resultsTitle = document.createElement("h2");
  resultsTitle.innerHTML = "Résultats de recherche";
  const resultsGrid = document.createElement("div");
  resultsGrid.classList.add("res-grid");
  resultsGrid.id = "list-grid";
  resultsContainer.appendChild(resultsLine);
  resultsContainer.appendChild(resultsTitle);
  resultsContainer.appendChild(resultsGrid);
  insertElement(resultsContainer);
}

// function to search book with XMLHttpRequest with API Google Book
function searchBook() {
  let title = document.getElementById("book-title");
  let author = document.getElementById("author");

  request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);

      if (response.items.length > 0) {
        response.items.forEach((book) => {
          // creation d'un livre
          createOneBook(book);
        });
      }
    }
  };
  request.open(
    "GET",
    "https://www.googleapis.com/books/v1/volumes?q=" +
      title.value +
      "+inauthor:" +
      author.value
  );
  request.send();
}

// function to create Book
function createOneBook(book) {
  console.log("createOneBook", book);
}

//function cancel search
function cancelSearch(form) {
  const btn = document.getElementById("addBook");
  form.style.display = "none";
  btn.style.display = "block";
}

function onload() {
  createForm();
  addButton();
}

window.addEventListener("load", onload);
