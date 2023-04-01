// PAGE1 NAVBAR ---> PAGE1
const pori = {"id": 1, "name":"Πορί", "description":"Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων",
"image": "../images/pori.png"};

const italida = {"id": 2,"name":"Ιταλίδα", "description":"Το όνομα “Ιταλίδα”, προέκυψε λόγω της ιδιοκτήτριας της περιοχής πάνω από την παραλία. Αλλιώς, η Πλατιά Πούντα που είναι και το πραγματικό της όνομα είναι μία από τις πολυσύχναστες παραλίες του νησιού αμμώδης με γαλαζοπράσινα, κρυστάλλινα νερά.Απέχει 1.800 μέτρα περίπου από το χωριό και φτάνετε με καραβάκι ή με πεζοπορία 30 περίπου λεπτών.",
"image": "../images/italida.jpg"};

const beaches = [pori, italida, pori, italida];

const title = document.querySelector("p.title");
updatePage();

const dropdown = document.querySelector(".dropdown-menu");
dropdown.addEventListener("click", function(event) {
  const selectedOption = event.target.getAttribute("data-value");
  localStorage.setItem("selectedOption", selectedOption);
  updatePage();
});

function updatePage(){
  //remove all cards
  const row = document.querySelector("div.row");
  removeAllChildNodes(row);

  if(localStorage.getItem("selectedOption") === "beaches") {
    title.textContent = "Παραλίες";
    for (let i in beaches) {
      createCard(beaches[i]);
    }
  }
  if(localStorage.getItem("selectedOption") === "sights") {
    title.textContent = "Αξιοθέατα";
  }
  if(localStorage.getItem("selectedOption") === "accomm") {
    title.textContent = "Διαμονή";
  }
  if(localStorage.getItem("selectedOption") === "transport") {
    title.textContent = "Μετακινήσεις";
  }
  if(localStorage.getItem("selectedOption") === "food") {
    title.textContent = "Φαγητό";
  }
}

function createCard(item){

  const row = document.querySelector("div.row");
  const column = document.createElement("div");
  column.classList.add("col");
  const card = document.createElement("a");
  
  card.classList.add("card");
  card.style.marginInline= "30px";
  card.href = "../page2/page2.html";
  card.setAttribute("data-value", item.id);

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = item.image;
  cardImage.alt = item.name;

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = item.name;

  const cardText = document.createElement("div");
  cardText.classList.add("card-text");
  

  const cardDescription = document.createElement("p");
  let text = item.description.split(" ");
  cardDescription.textContent = text.slice(0, 20).join(" ") + "...";

  const readMore = document.createElement("p");
  readMore.classList.add("read-more");
  readMore.textContent = "Διαβάστε περισσότερα";

  cardText.appendChild(cardDescription);
  cardText.appendChild(readMore);

  card.appendChild(cardImage);
  card.appendChild(cardTitle);
  card.appendChild(cardText);
  column.appendChild(card);
  row.appendChild(column);
}


// PAGE1 CARDS ---> PAGE2 
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    selectedPlace = card.getAttribute('data-value');
    localStorage.setItem("selectedPlace", selectedPlace);
  });
});


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}