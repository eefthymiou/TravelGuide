// get the element with class deleteImageButton
const deleteImageButton = document.getElementsByClassName("deleteImageButton");
// add event listener to all the elements with class deleteImageButton
for (let i = 0; i < deleteImageButton.length; i++) {
    deleteImageButton[i].addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();

        // get the id of deletetImageButton
        const id = event.target.id;
        // remove the deleteImageButton from the id
        const imageId = id.replace("deleteImageButton", "");
        
        // ge the element with id image
        const imageDiv = document.getElementById("image" + imageId);
        console.log(imageDiv);

        // remove from the dom the imageDiv
        imageDiv.remove();

        // set as active another image
        const imagesContainer = document.getElementById("imagesContainer");
        // get the elelements inside the imagesContainer
        const images = imagesContainer.children;
        // get the first image
        const firstImage = images[0];
        // set the first image as active
        firstImage.classList.add("active");

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

    // Call the autoIncrimentTextarea function
    autoIncrimentTextarea()
}

addInfo.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();
    // Call the addInofrmation function
    addInfoF()
    // Call the autoIncrimentTextarea function
    autoIncrimentTextarea()
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


function getNewImageId(){
    // get the imagesContainer
    const imagesContainer = document.getElementById("imagesContainer");
    // get the children of imagesContainer
    const images = imagesContainer.children;
    // get the last image
    const lastImage = images[images.length - 1];
    // get the id of the last image
    const lastImageId = lastImage.id;
    // get the id of the new image
    const newImageId = parseInt(lastImageId.replace("image", "")) + 1;
    return newImageId;
}

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

                
saveButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    document.getElementById("myForm").submit();
}
);

deleteButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // get the id of the location
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
