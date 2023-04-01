// PAGE1 NAVBAR ---> PAGE1

//beaches
const pori = {"id": 1, "name":"Πορί", "description":"Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων",
"image": "../images/pori.png"};

const italida = {"id": 12,"name":"Ιταλίδα", "description":"Το όνομα “Ιταλίδα”, προέκυψε λόγω της ιδιοκτήτριας της περιοχής πάνω από την παραλία. Αλλιώς, η Πλατιά Πούντα που είναι και το πραγματικό της όνομα είναι μία από τις πολυσύχναστες παραλίες του νησιού αμμώδης με γαλαζοπράσινα, κρυστάλλινα νερά.Απέχει 1.800 μέτρα περίπου από το χωριό και φτάνετε με καραβάκι ή με πεζοπορία 30 περίπου λεπτών.",
"image": "../images/italida.jpg"};

const beaches = [pori, italida, pori, italida];

//sights
const profHlias = {"id": 2, "name":"Εκκλησία του Προφήτη Ηλία", "description":"Στην περιοχή του Προφήτη Ηλία υπήρχαν ίχνη εκκλησίας της πρωτοβυζαντινής περιόδου.",
 "image":"../images/sights/profitis_hlias.png"};

const sights = {profHlias};

//accomm
const petrosRooms = {"id": 3, "name":"Petros Rooms", "description":"Το κυκλαδίτικου στυλ Petros Rooms βρίσκεται στο Πάνω Κουφονήσι, σε απόσταση 100μ. από την παραλία Πόρτα, και προσφέρει πρόσφατα ανακαινισμένα δωμάτια με μινιμαλιστική διακόσμηση. Διαθέτει δωρεάν Wi-Fi και επιπλωμένο μπαλκόνι με θέα στο Αιγαίο Πέλαγος. Παρέχει επίσης σνακ μπαρ και δωρεάν υπηρεσία μεταφοράς από/προς το λιμάνι.",
 "image":"../images/accommodation/petros_rooms.png"};

const accomm = {petrosRooms};

//transport
const mavros = {"id": 4, "name": "Mavros G. Boat Tours", "description":"Στο νησί υπάρχουν καΐκια ή αλλιώς λάντζες που κάνουν το γύρω του νησιού και μπορείτε να επισκεφτείτε τις παραλίες του. Υπάρχουν τακτικά, καθημερινά δρομολόγια από τη Χώρα όπως επίσης με καΐκι μπορείτε να επισκεφτείτε και το Κάτω Κουφονήσι.",
  "image":"../images/transportation/mavros_boat.png"};

const transport = {mavros};

//food
const armira = {"id": 5, "name": "Αρμύρα και Πιοτό", "description":"Ελληνική και Μεσογειακή κουζίνα και θαλασσινά", "image":"../images/food/armira.png"};

const food = {armira};



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
    for (let i in sights) {
      createCard(sights[i]);
    }
  }
  if(localStorage.getItem("selectedOption") === "accomm") {
    title.textContent = "Διαμονή";
    for (let i in accomm) {
      createCard(accomm[i]);
    }
  }
  if(localStorage.getItem("selectedOption") === "transport") {
    title.textContent = "Μετακινήσεις";
    for (let i in transport) {
      createCard(transport[i]);
    }
  }
  if(localStorage.getItem("selectedOption") === "food") {
    title.textContent = "Φαγητό";
    for (let i in food) {
      createCard(food[i]);
    }
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

  cardDescription.classList.add("card-description");
  cardDescription.textContent = item.description;

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

  // PAGE1 CARDS ---> PAGE2 
  card.addEventListener('click', () => {
    selectedPlace = card.getAttribute('data-value');
    localStorage.setItem("selectedPlace", selectedPlace);
  });
}


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}