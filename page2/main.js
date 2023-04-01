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

function addImage(pathImage,alt,title){
    const fileInput = document.getElementById("inputGroupFile");
    const divImages = document.getElementById("imagesContainer");
    

    const image = document.createElement("img");
    image.className = "img-fluid mb-3 image";
    

    image.id = "image";
   
    if (pathImage == undefined){
        let file = fileInput.files[0];
        let fileType = file.type.toLowerCase();
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
    }
    else{
        // For the case of adding an image with js
        image.src = pathImage;
        if (title != "") {
            image.title = title;
        }
        if (alt != "") {
            image.alt = alt;
        }
    }

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

    // create a modal for editing the image
    const modal = document.createElement("div");
    modal.className = "modal fade";
    const modalId = `editModal-${Date.now()}`;
    modal.id = modalId;
    modal.tabIndex = "-1";
    modal.setAttribute("aria-labelledby", "editModalLabel");
    modal.setAttribute("aria-hidden", "true");

    const editButton = document.createElement("button");
    editButton.className = "mb-3 btn btn-warning adminAction";
    editButton.innerText = "Επεξεργασία Φωτογραφίας";
    editButton.setAttribute("data-bs-target", `#${modalId}`);
    

    editButton.addEventListener("click", function(event) {
        // prevent the default action
        event.preventDefault();
    
        // find the id of the button
        let id = event.target.getAttribute("data-bs-target");
 
        // remove the first charachet from the id
        id = id.substring(1);

        // get the modal
        const modal = document.getElementById(id);
        
        // show the modal if it exists
        if (modal != null) {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
        else{
            console.log("modal is null")
        }

    });
    
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
    closeButton.addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();

        const modal = event.target.closest(".modal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
    });

    // create a modal body
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    // create a modal footer
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    
    // create a button for modal save
    const modalSaveButton = document.createElement("button");
    modalSaveButton.className = "btn btn-primary";
    modalSaveButton.innerText = "Αποθήκευση";

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
    titleInput.value = image.title;

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
    altInput.value = image.alt;



    // add event listener for saving the changes
    modalSaveButton.addEventListener("click", function() {
        // prevent the default action
        event.preventDefault();
        
        // get the values from the inputs
        const title = document.getElementById("titleInput").value;
        const alt = document.getElementById("altInput").value;

        // set the values to the image
        image.title = title;
        image.alt = alt;

        // the button is inside the modal
        // so we need to find the modal
        const modal = event.target.closest(".modal");
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
    });

    // add elements to modalForm
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);
    altDiv.appendChild(altLabel);
    altDiv.appendChild(altInput);
    modalForm.appendChild(titleDiv);
    modalForm.appendChild(altDiv);

    // add elements to modalBody
    modalBody.appendChild(modalForm);

    // add elements to modalHeader
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // add elements to modalFooter
    modalFooter.appendChild(modalSaveButton);

    // add elements to modalContent
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // add elements to modalDialog
    modalDialog.appendChild(modalContent);

    // add elements to modal
    modal.appendChild(modalDialog);
    
    // append buttons to divButtons
    divButtons.appendChild(editButton);
    divButtons.appendChild(deleteButton);

    // append elements
    divImage.appendChild(image);
    divImage.appendChild(divButtons);
    divImage.appendChild(modal);

    // add divImage to divImages
    divImages.appendChild(divImage);
}


previewButton.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    addImage()
});
    
function addTitle(title){
    // find the element with id title
    const titleElement = document.getElementById("title");
    // add the title to the element
    titleElement.value = title;
}

function addDescription(description){
    // find the element with id description
    const descriptionElement = document.getElementById("description");
    // add the description to the element
    descriptionElement.value = description;
}

function addReviewF(userName,reviewText="",reviewRating=0,reviewDone=false) {
    const container = document.getElementById("reviewContainer");

    // Create a new div for the review (card)
    const newDiv = document.createElement("div");
    newDiv.className = "card m-2 ml-3 mr-3";

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
    newP.innerText = userName;

    // create div for col-md-8
    const newCol3 = document.createElement("div");
    newCol3.className = "col-md-8";

    // create div for card-body
    const newCardBody = document.createElement("div");
    newCardBody.className = "card-body";

    // create a input element for rating
    const inputRating = document.createElement("input");
    inputRating.className = "form-control mb-1";
    // the review can be rated from 1 to 5
    inputRating.type = "number";
    inputRating.min = "1";
    inputRating.max = "5";
    inputRating.step = "1";
    inputRating.id = "inputRating";
    inputRating.placeholder = "Βαθμολογία";
    inputRating.value = reviewRating;
    inputRating.disabled = false;

    // create input element for review
    const inputReviewText = document.createElement("input");
    inputReviewText.className = "form-control mb-1";
    inputReviewText.type = "text";
    inputReviewText.id = "inputReviewText";
    inputReviewText.placeholder = "Γράψτε το σχόλιό σας εδώ";
    inputReviewText.value = reviewText;
    inputReviewText.autocomplete = "off";

    inputReviewText.disabled = false;

    // create p element for date
    const newP3 = document.createElement("p");
    newP3.className = "card-text";

    // create small element for date
    const reviewDate = document.createElement("small");
    reviewDate.className = "text-body-secondary";
    reviewDate.textContent = "Ημερομηνία Δημοσίευσης: "
    const today2 = new Date();
    const daysDiff = Math.round((today2.getTime() - today2.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff === 0) {
        reviewDate.textContent += "Σήμερα";
    } else if (daysDiff === 1) {
        reviewDate.textContent += "Χθες";
    } else if (daysDiff === 2) {
        reviewDate.textContent += "Προχθές";
    } else {
        reviewDate.textContent += `${daysDiff} ημέρες πριν`;
    }

    // append elements
    newP3.appendChild(reviewDate);
    newCol2.appendChild(newP);
    newCol1.appendChild(newCol2);
    newCardBody.appendChild(inputRating);
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

    // eventListener for save button
    saveButton.addEventListener("click", function() {
        // Prevent the default action
        event.preventDefault();

        // Get the values of the input elements

        // Check if the user has entered a review

        // Check if the user has entered a rating

        // set the input elements to diasable
        inputRating.disabled = true;
        inputReviewText.disabled = true;

        // set white background
        inputRating.style.backgroundColor = "white";
        inputReviewText.style.backgroundColor = "white";

        // remove the border
        inputRating.style.border = "none";
        inputReviewText.style.border = "none";

        // remove thw save button
        rowButtons.removeChild(saveButton);
        // remove the cansel button
        rowButtons.removeChild(canselButton);
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

    // if review is done, press the save button
    if (reviewDone) {
        saveButton.click();
    }

}

addReview.addEventListener("click", function() {
    // Prevent the default action
    event.preventDefault();

    // get the username 
    username = "me"
    // Check if user has already written a review

    // Call the function to add a new review
    // reviewText,reviewRating,userName
    addReviewF(username);

    // go to the bottom of the list of reviews
    const container = document.getElementById("reviewContainer");
    // animate the scroll smoothly
    container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
    });

});

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
    newTextarea.className = "form-control adminInput mb-3";
    newTextarea.placeholder = "Πρόσθεσε επιπλέον πληροφορίες. Π.χ. Πρόσβαση, Ιστορια.";
    newTextarea.value = text;
    

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

function addMap(location){
    // get the map container
    const mapContainer = document.getElementById("map-container-google-1");

    // get the iframe from mapContainer
    const iframe = mapContainer.getElementsByTagName("iframe")[0];

    // set the src attribute of the iframe
    iframe.src = `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
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
    setValues()
    autoIncrimentTextarea()
    disableTextarea()
    nonEditMode()
}

function setValues(){
    id = localStorage.getItem("selectedPlace")
    console.log(id)
    id = 3
    // id == 1 is for beach: pori
    if (id == 1){
        // set a value to name
        addTitle("Παραλία Πορί")

        // set a value to description
        addDescription("Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων")

        // set an image (path, alt, title)
        addImage("../images/beaches.jpg", "Παραλία", "Παραλία Πορί");

        // default Ιnformation is added
        addInfoF("Απέχει περίπου 3,5 χλμ. από το χωριό και είναι πολυσύχναστη");
        addInfoF("Βρίσκεται στην ανατολική πλευρά του νησιού, είναι σε σχήμα πετάλου και την προτιμούν όταν πνέουν νότιοι και δυτικοί άνεμοι.")
        // add map
        addMap("Παραλία Πορί Κουφονήσι")

        // default reviews
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);
    }
    // id == 2 is for sight: profitis_hlias
    else if (id == 2){
        // set a value to title
        addTitle("Εκκλησία του Προφήτη Ηλία");

        // set a value to description
        addDescription("Στην περιοχή του Προφήτη Ηλία υπήρχαν ίχνη εκκλησίας της πρωτοβυζαντινής περιόδου.");

        // set an image (path, alt, title)
        addImage("../images/sights/profitis_hlias.png", "Εκκλησία του Προφήτη Ηλία", "Εκκλησία του Προφήτη Ηλία")

        addInfoF("Την περίοδο 1940 – 45 οι κάτοικοι του Κουφονησίου συγκέντρωσαν χρήματα για την αναστύλωση του ναού. Τα χρήματα δεν ήταν αρκετά. Δύο κάτοικοι του νησιού ανέλαβαν να τα επενδύσουν στα Δωδεκάνησα ώστε να ολοκληρωθεί το ποσό. Τα ίχνη τους όμως χάθηκαν και έτσι το περιστατικό χαρακτηρίστηκε ως κακός οιωνός για αυτούς που θέλουν την αναστήλωση του ναού.")
        addInfoF("Το 1972 οι παπά Στάθης, Γιάννης Ρουμελιώτης και Καίτη Ιωάννου αδερφή του τότε αγροτικού ιατρού αναλαμβάνουν τον καθαρισμό της περιοχής. Στην προσπάθειά τους ανακαλύπτουν 2 κίονες και ένα κομμάτι μάρμαρο, βυζαντινής εκκλησίας. Η πρώτη τους σκέψη ήταν να τα χρησιμοποιήσουν για την υπό τύπων ανέγερση της Αγίας Τράπεζας.")
        addInfoF("Την επόμενη χρονιά 1973 στις συνεχιζόμενες εργασίες συντήρησης ξεθάβουν πέτρες του βυζαντινού ναού και δημιουργούν ένα τοιχίο όπου στηρίζουν την εικόνα του Προφήτη Ηλία και το καντήλι του. Την ίδια χρονιά, το απόγευμα της ημέρας του Προφήτη Ηλία, 20 Ιουλίου, οι κάτοικοι του Κουφονησίου , πεζοπόροι, φθάνουν στον μισοφτιαγμένο ναό, όπου παρέθεσαν Εσπερινό και αρτοκλασία.")
        addInfoF("Το 1974 με απόφαση του πρωτοσύγκελου πάτερ Κορωνέλου, αναπληρωτή του μητροπολίτη Σαντορίνης Γαβριήλ, απαγορεύεται η λειτουργία στα ερείπια του προφήτη Ηλία, λόγω του ότι δεν είναι Ναός. Το οικόπεδο όπου βρίσκεται το εκκλησάκι είναι ιδιωτικό, αλλά η είσοδος ελεύθερη.")
        addInfoF("Σήμερα υπάρχουν τα ερείπια του ναού, με την εικόνα του προφήτη Ηλία, το καντήλι του, και την Αγία Τράπεζα εν λειτουργία με την φροντίδα των Πιστών.")
        addInfoF("Ανήμερα του Προφήτη Ηλία, 20 Ιουλίου, οι πιστοί συγκεντρώνονται στο εκκλησάκι, και παρατίθεται Εσπερινός. Προσφέρονται αναψυκτικά και νερό.")
       
        // add map
        addMap("Εκκλησία του Προφήτη Ηλία Κουφονήσια") 
    }   
    else if (id == 3){
        // set a value to the title
        addTitle("Petros Rooms");

        // set a value to description
        addDescription("Το κυκλαδίτικου στυλ Petros Rooms βρίσκεται στο Πάνω Κουφονήσι, σε απόσταση 100μ. από την παραλία Πόρτα, και προσφέρει πρόσφατα ανακαινισμένα δωμάτια με μινιμαλιστική διακόσμηση. Διαθέτει δωρεάν Wi-Fi και επιπλωμένο μπαλκόνι με θέα στο Αιγαίο Πέλαγος. Παρέχει επίσης σνακ μπαρ και δωρεάν υπηρεσία μεταφοράς από/προς το λιμάνι.");

        // set an image (path, alt, title)
        addImage("../images/accommodation/petros_rooms.png", "Petros Rooms", "Petros Rooms")

        // add info
        addInfoF("Όλα τα δωμάτια του Petros Rooms περιλαμβάνουν κλιματισμό, θυρίδα ασφαλείας και ψυγείο. Έχουν δάπεδο με πλακάκια και ιδιωτικό μπάνιο με ντους. Σε όλες τις μονάδες υπάρχει τηλεόραση.")
        addInfoF("Μπορείτε να απολαύσετε το πρωινό σας στο καφέ ή στην ηλιόλουστη βεράντα με θέα στη θάλασσα και αργότερα να δοκιμάσετε κοκτέιλ ή παραδοσιακό ρακόμελο. Κοντά στη ρεσεψιόν θα βρείτε lounge με καναπέδες και τηλεόραση.")
        addInfoF("Το κέντρο του Κουφονησίου απέχει 200μ. και διαθέτει μπαρ, καταστήματα και ταβέρνες που σερβίρουν φρέσκο ψάρι. Καθώς το νησί είναι πολύ μικρό, δεν θα χρειαστείτε αυτοκίνητο. Το προσωπικό του ξενοδοχείου μπορεί να μεριμνήσει για υπηρεσία ενοικίασης ποδηλάτων και ξεναγήσεις με καραβάκι στο Κάτω Κουφονήσι. Το κατάλυμα παρέχει δωρεάν ιδιωτικό χώρο στάθμευσης.")
        addInfoF("Το κυκλαδίτικου στυλ Petros Rooms βρίσκεται στο Πάνω Κουφονήσι, σε απόσταση 100μ. από την παραλία Πόρτα, και προσφέρει πρόσφατα ανακαινισμένα δωμάτια με μινιμαλιστική διακόσμηση.")
        addInfoF("Αυτό είναι το αγαπημένο μέρος των επισκεπτών μας στον προορισμό Κουφονήσια σύμφωνα με ανεξάρτητα σχόλια.")
        addInfoF("Η τοποθεσία αρέσει ιδιαίτερα σε ζευγάρια")

        // add map
        addMap("Petros Rooms Koufonisia")

        // add review
        addReviewF("spamaro", "Πολύ καλή τοποθεσία, καθαρό και άνετο δωμάτιο, πολύ καλή εξυπηρέτηση και πολύ καλή τιμή. Θα το συνιστούσα ανεπιφύλακτα.",5,true);
    }
    else {
        // return to page1 
        console.log("page not found")
        window.location.href = "../page1/page1.html";
    }
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

