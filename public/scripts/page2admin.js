

// get the element with class deleteImageButton
const deleteImageButton = document.getElementsByClassName("deleteImageButton");
// add event listener to all the elements with class deleteImageButton
for (let i = 0; i < deleteImageButton.length; i++) {
    deleteImageButton[i].addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();

        // get the id of the delete button
        let imageId = deleteImageButton[i].id;

        const form = document.getElementById("myForm");
        const id = form.getAttribute("data-id");
        const category = form.getAttribute("data-category");

        form.method = "POST";
        form.action = `/page2/deleteImage?id=${id}&category=${category}&imageId=${imageId}`;
        form.submit();
    });
}

function addInfoF(text=""){
    const container = document.getElementById("container");

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
    newTextarea.className = "form-control adminInput mb-3 editMode";
    newTextarea.placeholder = "Πρόσθεσε επιπλέον πληροφορίες. Π.χ. Πρόσβαση, Ιστορια.";
    newTextarea.value = text;
    newTextarea.name = "info";
    
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


}

addInfo.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();
    // Call the addInofrmation function
    addInfoF()
});


function addMap(map){
    // get the map container
    const mapContainer = document.getElementById("map-container-google-1");

    // get the iframe from mapContainer
    const iframe = mapContainer.getElementsByTagName("iframe")[0];

    // set the src attribute of the iframe
    iframe.src = `https://maps.google.com/maps?q=${map}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    // change the location of the map for the database
    const mapLocation = document.getElementById("mapLocation");
    mapLocation.value = `https://maps.google.com/maps?q=${map}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}


searchButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // Get the value of the search input
    const searchInput = document.getElementById("searchLocation").value;

    // Check if the search input is empty
    if (searchInput.trim() === "") {
        alert("Please enter a search term.");
        return;
    }
    addMap(searchInput);
});

// find all the infoDeleteButtons
const infoDeleteButtons = document.getElementsByClassName("infoDeleteButton");
// add event listener to all the infoDeleteButtons
for (let i = 0; i < infoDeleteButtons.length; i++) {

    infoDeleteButtons[i].addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();

        // get the div parent of the infoDeleteButton
        const infoDiv = event.target.parentElement;

        // remove the parent from the dom
        infoDiv.remove();
    });
}

function addImage() {
    const fileInput = document.getElementById("inputGroupFile");
    const divImages = document.getElementById("imagesContainer");

    // find all the images
    const images = divImages.children;
    // for each image remove the active class
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("active");
    }
    const divImage = document.createElement("div");
    divImage.classList.add("carousel-item", "active");

    const image = document.createElement("img");
    image.className = "d-block mb-3 mx-auto w-50 h-50 text-center";

    const file = fileInput.files[0];
    
    const fileType = file.type.toLowerCase();
    if (fileType.indexOf("image/") == 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image file.");
        return;
    }


    divImage.appendChild(image);


    const divImageInfo = document.createElement("div");
    divImageInfo.className = "ml-3 mr-3 mb-3 gap-2 adminAction";
    divImageInfo.style = "margin-left: 25%; margin-right: 25%;";

    const row1 = document.createElement("div");
    row1.className = "row mb-3";

    const col1 = document.createElement("div");
    col1.className = "col-auto";

    const labelTitle = document.createElement("label");
    labelTitle.className = "form-label";
    labelTitle.innerText = "Τίτλος:";
    col1.appendChild(labelTitle);

    const col2 = document.createElement("div");
    col2.className = "col";

    const inputTitle = document.createElement("input");
    inputTitle.className = "form-control adminInput editMode";
    inputTitle.type = "text";
    inputTitle.name = "imagesTitle";
    inputTitle.placeholder = "Τίτλος";
    col2.appendChild(inputTitle);

    row1.appendChild(col1);
    row1.appendChild(col2);

    const row2 = document.createElement("div");
    row2.className = "row auto";

    const col3 = document.createElement("div");
    col3.className = "col-auto";

    const labelAlt = document.createElement("label");
    labelAlt.className = "form-label";
    labelAlt.innerText = "Εναλλακτικό κείμενο:";
    col3.appendChild(labelAlt);

    const col4 = document.createElement("div");
    col4.className = "col";

    const inputAlt = document.createElement("input");
    inputAlt.className = "form-control adminInput editMode";
    inputAlt.type = "text";
    inputAlt.name = "imagesAlt";
    inputAlt.placeholder = "Εναλλακτικό κείμενο";
    col4.appendChild(inputAlt);

    row2.appendChild(col3);
    row2.appendChild(col4);

    divImageInfo.appendChild(row1);
    divImageInfo.appendChild(row2);
    divImage.appendChild(divImageInfo);

    const divButton= document.createElement("div");
    divButton.className = "mb-3 gap-2 d-flex justify-content-center adminAction";

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteImageButton mb-3 btn btn-danger adminAction";
    deleteButton.innerText = "Διαγραφή Φωτογραφίας";

    deleteButton.addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();

        // get the div parent of the deleteButton
        const imageDiv = event.target.parentElement.parentElement;

        // remove the parent from the dom
        imageDiv.remove();

        // find the input element for the file
        const fileInput = document.getElementById("inputGroupFile");
        // reset the value of the file input
        fileInput.value = "";

        // if there are image in the imagesContainer set the first as active
        if (divImages.children.length > 0) {
            divImages.children[0].classList.add("active");
        }
        
    });

    divButton.appendChild(deleteButton);
    divImage.appendChild(divButton);
    divImages.appendChild(divImage);
}

previewButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    console.log("previewButton clicked");
    addImage()
});


let edit = false;

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

function enableTextarea() {
    let elements = document.getElementsByClassName("adminInput");
    for (let i = 0; i < elements.length; i++){
        elements[i].disabled = false;
        // remove non edit mode class
        elements[i].classList.remove("nonEditMode");
        // add edit mode class
        elements[i].classList.add("editMode");
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

function editMode(){
    // unhide save button
    saveButton.style.display = "";

    // unhide delete button
    deleteButton.style.display = "";

    // hide edit button
    editButton.style.display = "none";

    // enable the textareas
    enableTextarea()

    // show admin action
    showAdminAction()
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

function setOneImageActive() {
    try{
        const divImages = document.getElementsByClassName("carousel-item");
        divImages[0].classList.add("active");
    }
    catch (error){
        // pass
    }

}

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



saveButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();
    autoIncrimentTextarea();
    const form = document.getElementById("myForm");
    const id = form.getAttribute("data-id");
    const category = form.getAttribute("data-category");
    form.action = `/page2/?id=${id}&category=${category}`;
    form.method = "POST";
    form.submit();
}
);

deleteButton.addEventListener("click", function() {
    event.preventDefault();
  
    const form = document.getElementById("myForm");
    const id = form.getAttribute("data-id");
    const category = form.getAttribute("data-category");


    form.method = "POST";
    form.action = `/page2/delete?id=${id}&category=${category}`;
    form.submit();
});


function main(){
    setOneImageActive();
    removeStarButtonDefaultAction()
    disableTextarea()
    autoIncrimentTextarea()
    nonEditMode()
}

main()

                

