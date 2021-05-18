const addBookBtn = document.createElement("div");
let titleH2 = document.querySelector('.h2');

// Add btn1 Ajouter un livre
addBookBtn.innerHTML = `<div class="addbook_div" id="addbook_id"><button onclick="addBook()" type="button" class="addbookbtn" id="btn1">Ajouter un livre</button></div>`;
titleH2.after(addBookBtn);
//console.log(addBookBtn);
let addBookD = document.getElementById("addbook_id");

addBookBtn.after(addBookD);

// function addBook() {
// //alert ("Hello");
// //addBookBtn.style.display = "none";
// addBookBtn.remove();
// }
function addBook(){
    addBookD.innerHTML = `<form class="form" id="SearchForm"><div id="searcharea"><label for="titleNameField">Titre du livre<br/></label><input class="search" id="titleNameField" type="search" name="titleNameField"><br/><label for="AuthorNameField">Auteur<br/></label><input class="search" id="AuthorNameField"type="search" name="AuthorNameField" ><br/><button type="button"  class="btn searchButton" onclick="search()">Rechercher</button></br><button type="button"  onclick="window.location.href='index.html';" class="btn cancelButton" id="cancelButton" >Annuler</button></div></form>`;
    
}

addBookBtn.addEventListener("click" , addBook);