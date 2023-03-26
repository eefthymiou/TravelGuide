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

function enablePhotoButtons(){
    const elements = document.getElementsByClassName("photoButton");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = false;
    }
}

function disablePhotoButtons(){
    const elements = document.getElementsByClassName("photoButton");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = true;
    }
}


previewButton.addEventListener("click", function() {
    const fileInput = document.getElementById("inputGroupFile");
    const divImages = document.getElementById("imagesContainer");
    

    const image = document.createElement("img");
    image.className = "img-fluid mb-3";
   
    // Prevent the default action
    event.preventDefault();

    let file = fileInput.files[0];
    let fileType = file.type.toLowerCase();
    if (fileType.indexOf("image/") == 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);

        const divImage = document.createElement("div");
        
        // create a div for edit and delete buttons
        const divButtons = document.createElement("div");
        divButtons.className = "gap-2 d-flex justify-content-center adminAction";


        // create button for delete
        const deleteButton = document.createElement("button");
        deleteButton.className = "mb-3 btn btn-danger adminAction";
        deleteButton.innerText = "Διαγραφή Φωτογραφίας";

        deleteButton.addEventListener("click", function() {
            divImage.remove();
        });

        // create button for edit   
        const editButton = document.createElement("button");
        editButton.className = "mb-3 btn btn-warning adminAction";
        editButton.innerText = "Επεξεργασία Φωτογραφίας";
        // connect edit button with modal
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#editModal");
        
        const modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "editModal";
        modal.tabIndex = "-1";
        modal.getAttribute("keyboard", "false");
        
        // create a modal dialog
        const modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";

        // create a modal content
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        // create a modal header
        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";

        // create a modal title
        const modalTitle = document.createElement("h5");
        modalTitle.className = "modal-title";
        modalTitle.id = "editModalLabel";
        modalTitle.innerText = "Επεξεργασία Φωτογραφίας";

        // create a button for closing the modal
        const closeButton = document.createElement("button");
        closeButton.className = "btn-close";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        closeButton.addEventListener("click", function() {
            const modal = document.getElementById('editModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
        });

        // create a modal body
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";

        // create a modal footer
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        
        // create a button for saving the changes
        const saveButton = document.createElement("button");
        saveButton.className = "btn btn-primary";
        saveButton.innerText = "Αποθήκευση";

        // create a form for the modal
        const modalForm = document.createElement("form");
        modalForm.className = "row g-3";

        // create a div for the title input
        const titleDiv = document.createElement("div");
        titleDiv.className = "col-md-12";

        // create a label for the title input
        const titleLabel = document.createElement("label");
        titleLabel.className = "form-label";
        titleLabel.innerText = "Τίτλος Φωτογραφίας";

        // create a input for the title
        const titleInput = document.createElement("input");
        titleInput.className = "form-control";
        titleInput.type = "text";
        titleInput.id = "titleInput";
        titleInput.placeholder = "Τίτλος Φωτογραφίας";

        // create a div for the alt input
        const altDiv = document.createElement("div");
        altDiv.className = "col-md-12";
        
        // create a label for the alt input
        const altLabel = document.createElement("label");
        altLabel.className = "form-label";
        altLabel.innerText = "Περιγραφή Φωτογραφίας";

        // create a input for the alt
        const altInput = document.createElement("input");
        altInput.className = "form-control";
        altInput.type = "text";
        altInput.id = "altInput";
        altInput.placeholder = "Περιγραφή Φωτογραφίας";

        // add elements to modalForm
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);
        altDiv.appendChild(altLabel);
        altDiv.appendChild(altInput);
        modalForm.appendChild(titleDiv);
        modalForm.appendChild(altDiv);

        // add elements to modalHeader
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // add elements to modalBody
        modalBody.appendChild(modalForm);

        // add elements to modalFooter
        modalFooter.appendChild(saveButton);

        // add elements to modalContent
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        // add elements to modalDialog
        modalDialog.appendChild(modalContent);

        // add elements to modal
        modal.appendChild(modalDialog);

        // add modal to body
        document.body.appendChild(modal);

        editButton.addEventListener("click", function() {
            // create a modal
            // in this modal the user will be able to edit the image
            // user will be able to set a title of the image
            // user will be able to set a alt text of the image
            
            // prevent the default action
            event.preventDefault();

            const modal = document.getElementById('editModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.show();
        });

        

        // append buttons to divButtons
        divButtons.appendChild(editButton);
        divButtons.appendChild(deleteButton);

        // append elements
        divImage.appendChild(image);
        divImage.appendChild(divButtons);
        
        

        // add divImage to divImages
        divImages.appendChild(divImage);

        

    } else {
        alert("Please select an image file.");
    }

    
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

function showAdminAction() {
    const elements = document.getElementsByClassName("adminAction");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "";
    }
}

function nonEditMode(){
    // hide save button
    saveButton.style.display = "none";

    // hide delete button
    deleteButton.style.display = "none";

    // unhide edit button
    editButton.style.display = "";

    // disable buttons for photos
    disablePhotoButtons()

    // disable the textareas
    disableTextarea()
    
    // hide admin action
    hideAdminAction()
}



function editMode(){
    // unhide save button
    saveButton.style.display = "";

    // unhide delete button
    deleteButton.style.display = "";

    // hide edit button
    editButton.style.display = "none";

    // enable buttons for photos 
    enablePhotoButtons()

    // enable the textareas
    enableTextarea()

    // show admin action
    showAdminAction()
}


saveButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // check if edit variable is true
    if (edit){
        // store the values of the textareas in db

        // disable the textareas
        disableTextarea()
        
        hideAdminAction()
        autoIncrimentTextarea()

        // change mode to non edit mode
        nonEditMode()

        // change the edit variable to false
        edit = !edit;
    }
});



editButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // is edit variable is false enable the textareas
    if (!edit){
        // change mode to edit mode
        editMode()
    }

    edit = !edit;
});

deleteButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // create a confirmation box
    const confirmation = confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις το αντικείμενο;");
    if (confirmation){
        // delete the object from db
    }
    
});

function hideUserAction(){
    let elements = document.getElementsByClassName("userInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}


function hideEditButton(){
    editButton.style.display = "none";
}

function admin_page() {
    hideUserAction()
}

function user_page() {
    hideAdminAction()
    hideEditButton()
}


function both(){
    autoIncrimentTextarea()
    disableTextarea()
    nonEditMode()
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

