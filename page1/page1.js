// const dropdown = document.querySelector(".dropdown-menu");
// const title = document.querySelector("p.title");

// dropdown.addEventListener("click", function(event) {
//   const selectedOption = event.target.getAttribute("value");
//   title.textContent = selectedOption;
//   console.log(selectedOption);
// });

var selectedValue = localStorage.getItem("selectedValue");
const title = document.querySelector("p.title");
title.textContent = selectedOption;