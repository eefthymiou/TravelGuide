// PAGE1 NAVBAR ---> PAGE1

const title = document.querySelector("p.title");

title.textContent = localStorage.getItem("selectedOption");

const dropdown = document.querySelector(".dropdown-menu");
dropdown.addEventListener("click", function(event) {
  const selectedOption = event.target.getAttribute("data-value");
  localStorage.setItem("selectedOption", selectedOption);
  title.textContent = localStorage.getItem("selectedOption");
});

