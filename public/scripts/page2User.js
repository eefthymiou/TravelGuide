function addReviewF() {
    const container = document.getElementById("reviewContainer");

    // Create a new div for the review (card)
    const newDiv = document.createElement("div");
    newDiv.className = "card m-2";

    // create div for row
    const newRow = document.createElement("div");
    newRow.className = "row";

    // create div for col-md-3
    const newCol1 = document.createElement("div");
    newCol1.className = "col-md-3";

    // create div for col-md-3 d-flex align-items-center h-100
    const newCol2 = document.createElement("div");
    newCol2.className = "d-flex align-items-center h-100";

    // create p element for user name
    const newP = document.createElement("p");
    newP.className = "card-text mx-auto";
    try {
        const userName = document.getElementById("username");
        newP.innerText = userName.innerText;
    }
    catch (error) {
        console.log(error);
    }

    // create div
    const newCol3 = document.createElement("div");
    newCol3.className = "col";

    // create div for card-body
    const newCardBody = document.createElement("div");
    newCardBody.className = "card-body";

    const ratingDiv = document.createElement("div");
    ratingDiv.className = "star_rating";
    ratingDiv.dataset.isRated = "false";    
    const allStars = [];

    for (let i = 1; i <= 5; i++) {
        const ratingButton = document.createElement("button");
        ratingButton.classList.add("star");
        ratingButton.dataset.rating = i;
        ratingButton.innerHTML = "&#9734;";
    
        ratingButton.addEventListener("click", function() {
            // prevent the default action
            event.preventDefault();
            
            ratingDiv.dataset.isRated = "true"; 
            ratingDiv.style.border = "none";
            ratingDiv.dataset.rating = this.dataset.rating;
            
            
            // set the stars which are before the selected star to be filled
            allStars.forEach((star) => {
                if (star.dataset.rating <= this.dataset.rating) {
                    star.innerHTML = "&#9733;";
                    star.style.color = "#1F4591";
                } else {
                    star.innerHTML = "&#9734;";
                    star.style.color = "grey";
                }
            });
        });

        ratingButton.addEventListener("mouseover", function() {
            if (ratingDiv.dataset.isRated == "true") return
            // prevent the default action
            event.preventDefault();

            allStars.forEach((star) => {
                if (star.dataset.rating <= this.dataset.rating) {
                    star.innerHTML = "&#9733;";
                    star.style.color = "#1F4591";
                } else {   
                    star.innerHTML = "&#9734;";
                    star.style.color = "grey";
                }
            });
        });

        ratingButton.addEventListener("mouseout", function() {
            if (ratingDiv.dataset.isRated == "true") return
            
            // prevent the default action
            event.preventDefault();

            allStars.forEach((star) => {
                star.innerHTML = "&#9734;";
            });
        });
        
    
        allStars.push(ratingButton);
        ratingDiv.appendChild(ratingButton);
    }


    // create input element for review
    const inputReviewText = document.createElement("textarea");
    inputReviewText.className = "form-control";
    inputReviewText.type = "text";
    inputReviewText.id = "inputReviewText";
    inputReviewText.placeholder = "Γράψτε το σχόλιό σας εδώ";
    inputReviewText.autocomplete = "off";
    inputReviewText.style.fontStyle = "italic";
    inputReviewText.disabled = false;
    inputReviewText.style.resize = "none";
    inputReviewText.name = "reviewText";

    // create p element for date
    const newP3 = document.createElement("p");
    newP3.className = "card-text";

    // create small element for date
    const reviewDate = document.createElement("small");
    reviewDate.className = "text-body-secondary";
    reviewDate.textContent = "Ημερομηνία Δημοσίευσης: " + new Date().toLocaleDateString();
    // hide the content of the reviewDate element
    reviewDate.style.display = "none";


    // append elements
    newP3.appendChild(reviewDate);
    newCol2.appendChild(newP);
    newCol1.appendChild(newCol2);
    newCardBody.appendChild(ratingDiv);
    newCardBody.appendChild(inputReviewText);
    newCardBody.appendChild(newP3);
    newCol3.appendChild(newCardBody);
    newRow.appendChild(newCol1);
    newRow.appendChild(newCol3);
    newDiv.appendChild(newRow);
    container.appendChild(newDiv);

    // Create a new div element
    const rowButtons = document.createElement("div");
    rowButtons.className = "gap-2 d-flex justify-content-center";

    // Create a new button element
    const saveButton = document.createElement("button");
    saveButton.className = "btn btn-success mb-3";
    saveButton.innerText = "Υποβολή";
    saveButton.type = "submit";

    // eventListener for save button
    saveButton.addEventListener("click", function() {
        // Prevent the default action
        event.preventDefault();
        
        // Check if the user has entered a rating
        if ( ratingDiv.dataset.isRated === "false" ) {
            ratingDiv.style.border = "1px solid red";
            return;
        }

        // Check if the user has entered a review
        if (inputReviewText.value === "") {
            // remove the inputReviewText element from the DOM
            inputReviewText.remove();
        }
        else {
            // set the input elements to diasabled
            inputReviewText.style.height = (inputReviewText.scrollHeight) + "px";
            inputReviewText.disabled = true;
            // append the final_review_text class to the inputReviewText element
            inputReviewText.classList.add("final_review_text");  
        }

    
        // block the rating buttons
        allStars.forEach((star) => {
            star.disabled = true;
        });
        
        // unhide the reviewDate element
        reviewDate.style.display = "block";

        // set white background
        inputReviewText.style.backgroundColor = "white";

        // remove the border
        inputReviewText.style.border = "none";

        // remove thw save button
        rowButtons.removeChild(saveButton);
        // remove the cansel button
        rowButtons.removeChild(canselButton);

        // create elements for the server side
        let reviewRating = ratingDiv.dataset.rating;
        const reviewsScore = document.createElement("input");
        reviewsScore.type = "hidden";
        reviewsScore.name = "reviewsScore";
        reviewsScore.value = reviewRating;

        const reviewsText = document.createElement("input");
        reviewsText.type = "hidden";
        reviewsText.name = "reviewsText";
        reviewsText.value = inputReviewText.value;
        
        const reviewsDate = document.createElement("input");
        reviewsDate.type = "hidden";
        reviewsDate.name = "reviewsDate";
        reviewsDate.value = reviewDate.textContent;

        // add element to the div 
        newDiv.appendChild(reviewsScore);
        newDiv.appendChild(reviewsText);
        newDiv.appendChild(reviewsDate);
        
        document.getElementById("myForm").submit();
    });

    

    // Create a new button element
    const canselButton = document.createElement("button");
    canselButton.className = "btn btn-danger mb-3";
    canselButton.innerText = "Ακύρωση";
    
    // Append the button to the div
    rowButtons.appendChild(saveButton);
    rowButtons.appendChild(canselButton);

    // eventListener for delete button
    canselButton.addEventListener("click", function() {
        // Prevent the default action
        event.preventDefault();

        // remove the div
        container.removeChild(newDiv);
        rowButtons.remove();
    });

    // Append the div to the container
    container.appendChild(rowButtons);
}

addReview.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();


    // Call the function to add a new review
    addReviewF();

    // go to the bottom of the list of reviews
    const container = document.getElementById("reviewContainer");
  
    // animate the scroll smoothly
    container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
    });

    // go to the bottom of the page 
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

});

function setOneImageActive() {
    try{
        const divImages = document.getElementsByClassName("carousel-item");
        divImages[0].classList.add("active");
    }
    catch (error){
        // pass
    }

}

function removeStarButtonDefaultAction(){
    // get button with class star
    const star = document.querySelectorAll(".star")
    // for all starts add event listener
    for (var i = 0; i < star.length; i++) {
        star[i].addEventListener("click", function() {
            // prevent default action
            event.preventDefault()
        })
    }
}

function disableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = true;
        // not resizable
        elements[i].style.resize = "none";
        // remove edit mode class
        elements[i].classList.remove("editMode");
        // add non edit mode class
        elements[i].classList.add("nonEditMode");
    }
}

function autoIncrimentTextarea(){
    let elements = document.getElementsByTagName("textarea");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.height = "auto";
        elements[i].style.height = (elements[i].scrollHeight) + "px";
        // hide scrollbars
        elements[i].style.overflow = "hidden";
        // justify text
        elements[i].style.textAlign = "justify";
        // italic style 
        elements[i].style.fontStyle = "italic";
    }
}

function nonEditMode(){
    try {
        // hide save button
        saveButton.style.display = "none";

        // hide delete button
        deleteButton.style.display = "none";

        // unhide edit button
        editButton.style.display = "";
    }
    catch (err){
        // do nothing
    }

    // disable the textareas
    disableTextarea()
    
    // hide admin action
    hideAdminAction()

}

function hideAdminAction() {
    let elements = document.getElementsByClassName("adminAction");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}


function main() {
    setOneImageActive();
    removeStarButtonDefaultAction()
    disableTextarea()
    autoIncrimentTextarea()
    nonEditMode()
}


main()