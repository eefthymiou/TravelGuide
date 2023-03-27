// MAINPAGE NAVBAR ---> PAGE1
const dropdown = document.querySelector(".dropdown-menu");
dropdown.addEventListener("click", function(event) {
  const selectedOption = event.target.getAttribute("data-value");
  localStorage.setItem("selectedOption", selectedOption);
});


// MAINPAGE CARDS ---> PAGE1
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    selectedOption = card.getAttribute('data-value');
    localStorage.setItem("selectedOption", selectedOption);
  });
});