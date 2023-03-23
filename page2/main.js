function autoIncrimentTextarea(){
    let elements = document.getElementsByTagName("textarea");
    for (let i = 0; i < elements.length; i++){
        elements[i].addEventListener("input", function() {
            elements[i].style.height = "auto";
            elements[i].style.height = (elements[i].scrollHeight) + "px";
        });
    }
}

function enableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = false;
    }
}
  
function disableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = true;
    }
}


function previewPhoto() {
    let fileInput = document.getElementById("inputGroupFile");
    let previewButton = document.getElementById("previewButton");
    let previewImage = document.getElementById("previewImage");

    previewButton.addEventListener("click", function() {
        let fileInput = document.getElementById("inputGroupFile");
        let previewButton = document.getElementById("previewButton");
        let previewImage = document.getElementById("previewImage");

        let file = fileInput.files[0];
        let fileType = file.type.toLowerCase();
        if (fileType.indexOf("image/") == 0) {
            let reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
          }
    });

}

addButton.addEventListener("click", function() {
    let addButton = document.getElementById("addButton");
    let container = document.getElementById("container");


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
    var newRow = document.createElement("div");
    newRow.className = "row mb-3";

    // Create a new textarea element
    var newTextarea = document.createElement("textarea");
    newTextarea.className = "form-control adminInput mb-3";
    newTextarea.placeholder = "Πρόσθεσε επιπλέον πληροφορίες. Π.χ. Πρόσβαση, Ιστορια.";

    // Create a new delete button element
    var newDeleteButton = document.createElement("button");
    newDeleteButton.className = "btn btn-danger adminAction";
    newDeleteButton.innerText = "Delete";

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
    let elements = document.getElementsByClassName("adminAction");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "";
    }
}

function editButtonClicked(callback) {
    let editButton = document.getElementById("editButton");
    editButton.addEventListener("click", function() {
        // Prevent the default action
        event.preventDefault();

        // Change the edit variable to true
        edit = !edit;
        
        // Call the callback function with the edit variable
        callback(edit);
    });
}

function admin_page() {
    disableTextarea()
    hideAdminAction()
    edit = false

    editButtonClicked(function(edit) {
        if (!edit){
            disableTextarea()
            hideAdminAction()
        }
        else {
            enableTextarea()
            previewPhoto()
            showAdminAction()
        }
    });
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
    const admin = true;
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

