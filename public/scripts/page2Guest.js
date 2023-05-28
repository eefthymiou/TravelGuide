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