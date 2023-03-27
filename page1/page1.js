const dropdown = document.querySelector(".dropdown-menu");
const title = document.querySelector("p.title");

dropdown.addEventListener("click", function(event) {
  const selectedOption = event.target.getAttribute("data-value");
  title.textContent = selectedOption;
  console.log(selectedOption);
});

