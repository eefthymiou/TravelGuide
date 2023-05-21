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

        // save the changes to the database
    });
}



       




