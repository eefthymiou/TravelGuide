// PAGE1 NAVBAR ---> PAGE1
const pori = {"name":"Πορί", "description":"Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων",
"image": "../images/pori.png"};

const italida = {"name":"Ιταλίδα", "description":"Το όνομα “Ιταλίδα”, προέκυψε λόγω της ιδιοκτήτριας της περιοχής πάνω από την παραλία. Αλλιώς, η Πλατιά Πούντα που είναι και το πραγματικό της όνομα είναι μία από τις πολυσύχναστες παραλίες του νησιού αμμώδης με γαλαζοπράσινα, κρυστάλλινα νερά.Απέχει 1.800 μέτρα περίπου από το χωριό και φτάνετε με καραβάκι ή με πεζοπορία 30 περίπου λεπτών.",
"image": "../images/italida.jpg"};

const beaches = [pori, italida];

const title = document.querySelector("p.title");
title.textContent = localStorage.getItem("selectedOption");
updatePage();

const dropdown = document.querySelector(".dropdown-menu");
dropdown.addEventListener("click", function(event) {
  const selectedOption = event.target.getAttribute("data-value");
  localStorage.setItem("selectedOption", selectedOption);
  updatePage();
});

function updatePage(){
  if(localStorage.getItem("selectedOption") === "beaches") {
    title.textContent = "Παραλίες";
    for (let beach of beaches) {
      createCard(beach);
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
  const cardGroup = document.querySelector("div.card-group");
  const card = document.createElement("div");
  
  card.classList.add("card");
  //card.setAttribute("data-value", "name");
  card.style.width = "200px";
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = item.image;
  cardImage.alt = item.name;
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");
  cardFooter.textContent = item.description;

  card.appendChild(cardImage);
  card.appendChild(cardFooter);
  cardGroup.appendChild(card);
}
