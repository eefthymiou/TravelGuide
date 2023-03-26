let edit = false;

function autoIncrimentTextarea(){
    let elements = document.getElementsByTagName("textarea");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.height = "auto";
        elements[i].style.height = (elements[i].scrollHeight) + "px";
        // hide scrollbars
        elements[i].style.overflow = "hidden";
    }
}


function enableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = false;
        elements[i].style.overflow = "auto";
    }
}
  
function disableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = true;
        // not resizable
        elements[i].style.resize = "none";
    }
}


previewButton.addEventListener("click", function() {
    const fileInput = document.getElementById("inputGroupFile");
    const divImages = document.getElementById("imagesContainer");
    const previewImage = document.createElement("img");
    previewImage.className = "img-fluid";

    // Prevent the default action
    event.preventDefault();

    let file = fileInput.files[0];
    let fileType = file.type.toLowerCase();
    if (fileType.indexOf("image/") == 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image file.");
    }

    // add image to div
    divImages.appendChild(previewImage);
});


addReview.addEventListener("click", function() {
    const container = document.getElementById("reviewContainer");
    // Prevent the default action
    event.preventDefault();

    // Check if user has already written a review

    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.className = "card mb-3 shadow p-3";

    // create div for row
    const newRow = document.createElement("div");
    newRow.className = "row g-0";

    // create div for col-md-3
    const newCol1 = document.createElement("div");
    newCol1.className = "col-md-3";

    // create div for col-md-3 d-flex align-items-center h-100
    const newCol2 = document.createElement("div");
    newCol2.className = "d-flex align-items-center h-100";

    // create p element for user name
    const newP = document.createElement("p");
    newP.className = "card-text md-3 mx-auto";
    newP.innerText = "Όνομα Χρήστη";

    // create div for col-md-8
    const newCol3 = document.createElement("div");
    newCol3.className = "col-md-8";

    // create div for card-body
    const newCardBody = document.createElement("div");
    newCardBody.className = "card-body";

    // create h5 element for rating
    const newH5 = document.createElement("h5");
    newH5.className = "card-title";
    newH5.innerText = "Βαθμολογία";

    // create p element for review
    const newP2 = document.createElement("p");
    newP2.className = "card-text";
    newP2.innerText = "Η παραλία αυτή είναι εξαιρετική.";

    // create p element for date
    const newP3 = document.createElement("p");
    newP3.className = "card-text";

    // create small element for date
    const newSmall = document.createElement("small");
    newSmall.className = "text-body-secondary";
    newSmall.innerText = "Ημερομηνία Δημιοσίευσης 28/02/2020";

    // append elements
    newP3.appendChild(newSmall);
    newCol2.appendChild(newP);
    newCol1.appendChild(newCol2);
    newCardBody.appendChild(newH5);
    newCardBody.appendChild(newP2);
    newCardBody.appendChild(newP3);
    newCol3.appendChild(newCardBody);
    newRow.appendChild(newCol1);
    newRow.appendChild(newCol3);
    newDiv.appendChild(newRow);
    container.appendChild(newDiv);

    // Create a new div element
    const newRowButtons = document.createElement("div");
    newRowButtons.className = "gap-2 d-flex justify-content-start";

    // Create a new button element
    const newSaveButton = document.createElement("button");
    newSaveButton.className = "btn btn-success mb-3";
    newSaveButton.innerText = "Υποβολή";

    // Create a new button element
    const newEditButton = document.createElement("button");
    newEditButton.className = "btn btn-warning mb-3";
    newEditButton.innerText = "Επεξεργασία";

    // Create a new button element
    const newDeleteButton = document.createElement("button");
    newDeleteButton.className = "btn btn-danger mb-3";
    newDeleteButton.innerText = "Διαγραφή";

    // Append the button to the div
    newRowButtons.appendChild(newSaveButton);
    newRowButtons.appendChild(newEditButton);
    newRowButtons.appendChild(newDeleteButton);

    // Append the div to the container
    container.appendChild(newRowButtons);
});


addInfo.addEventListener("click", function() {
    const container = document.getElementById("container");

    // Prevent the default action
    event.preventDefault();

    // Check if any of the existing textarea elements are empty
    let textareas = container.querySelectorAll("textarea");
    for (let i = 0; i < textareas.length; i++) {
        if (textareas[i].value.trim() === "") {
            alert("Please fill in all text areas before adding a new one.");
            return; // Exit the function without creating a new div
        }
    }

    // Create a new div element
    const newRow = document.createElement("div");
    newRow.className = "mb-3";

    // Create a new textarea element
    const newTextarea = document.createElement("textarea");
    newTextarea.className = "form-control adminInput mb-3";
    newTextarea.placeholder = "Πρόσθεσε επιπλέον πληροφορίες. Π.χ. Πρόσβαση, Ιστορια.";

    // Create a new delete button element
    const newDeleteButton = document.createElement("button");
    newDeleteButton.className = "btn btn-danger adminAction";
    newDeleteButton.innerText = "Διαγραφή";

    newDeleteButton.addEventListener("click", function() {
        // Prevent the default action
        event.preventDefault();

        // Remove the div from the container
        container.removeChild(newRow);
    });
    // Add the textarea, delete button, newLinBreak to the div
    newRow.appendChild(newTextarea);
    newRow.appendChild(newDeleteButton);
    
    // Add the div, delete button, and line break to the container
    container.appendChild(newRow);

    // Call the autoIncrimentTextarea function
    autoIncrimentTextarea()
});


function hideAdminAction() {
    let elements = document.getElementsByClassName("adminAction");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

function hideAllAdminAction() {
    let elements = document.getElementsByClassName("adminActionAlwaysOn");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

function showAdminAction() {
    const elements = document.getElementsByClassName("adminAction");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "";
    }
}


editButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // Change the edit variable to true
    if (!edit){
        enableTextarea()
        showAdminAction()
    }
    else {
        disableTextarea()
        hideAdminAction()
        autoIncrimentTextarea()
    }

    edit = !edit;
});


function hideUserAction(){
    let elements = document.getElementsByClassName("userInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

function admin_page() {
    disableTextarea()
    hideAdminAction()
    hideUserAction()
    disableTextarea()
}

function user_page(){
    disableTextarea()
    hideAdminAction()
    hideAllAdminAction()
}

function both(){
    autoIncrimentTextarea()
}


function main(){
    // function both is called for all users
    both()

    // then check if the user is an admin or not
    const admin = true ;
    if (admin){
        // if the user is an admin, call the admin_page function
        admin_page()
    }
    else{
        // if the user is not an admin, call the user_page function
        user_page()
    }
}

main()

