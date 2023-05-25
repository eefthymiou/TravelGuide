
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


function setValues(){
    const id = 1;
    console.log(id);

    // id = 1
    if (id == 1){
        // set a value to name
        addTitle("Παραλία Πορί")

        // set a value to description
        addDescription("Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων.")

        // set an image (path, alt, title)
        addImage("../images/beaches.jpg", "Παραλία", "Παραλία Πορί");

        // default Ιnformation is added
        addInfoF("Απέχει περίπου 3,5 χλμ. από το χωριό και είναι πολυσύχναστη.");
        addInfoF("Βρίσκεται στην ανατολική πλευρά του νησιού, είναι σε σχήμα πετάλου και την προτιμούν όταν πνέουν νότιοι και δυτικοί άνεμοι.")
        // add map
        addMap("Παραλία Πορί Κουφονήσι")

        // default reviews
        addReviewF("spamaro", "Αυτή η παραλία είναι υπέροχη",5,true);

        // go to the top of the page
        window.scrollTo(0, 0);
    }

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

        // go to the top of the page
        window.scrollTo(0, 0);
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
        // for 100 times
        for (var i = 0; i < 50; i++) {
            addReviewF("spamaro", "Πολύ καλή τοποθεσία, καθαρό και άνετο δωμάτιο, πολύ καλή εξυπηρέτηση και πολύ καλή τιμή. Θα το συνιστούσα ανεπιφύλακτα.",5,true);
        }
    }
    else if (id == 4){
        // set value to the title
        addTitle("Μετακίνηση με καΐκι: Mavros G. Boat Tours")

        // add description
        addDescription("Στο νησί υπάρχουν καΐκια ή αλλιώς λάντζες που κάνουν το γύρω του νησιού και μπορείτε να επισκεφτείτε τις παραλίες του. Υπάρχουν τακτικά, καθημερινά δρομολόγια από τη Χώρα όπως επίσης με καΐκι μπορείτε να επισκεφτείτε και το Κάτω Κουφονήσι.")

        addImage("../images/transportation/mavros_boat.png","καΐκι","καΐκι")
        addImage("../images/transportation/marvos_boats_schedule.png","πρόγραμμα δρομολογίων","πρόγραμμα δρομολογίων")

        addMap("Mavros G. Boat Tours koufonisia")
    }
    else if (id==5){
        addTitle("Αρμύρα και Πιοτό")
        addDescription("Ελληνική και Μεσογειακή κουζίνα και θαλασσινά")

        addInfoF("ΕΥΡΟΣ ΤΙΜΩΝ: 5 € - 30 €")
        addInfoF("Κατάλληλο για χορτοφάγους, Επιλογές βίγκαν, Πιάτα χωρίς γλουτένη")
        addInfoF("Ώρες λειτουργίας: Καθημερινά 5:00 μ.μ. - 12:00 π.μ.")
        addInfoF("Τηλέφωνο: +30 22850 71200")

        addImage("../images/food/armira.png","Αρμύρα και Πιοτό","Αρμύρα και Πιοτό")
        addImage("../images/food/food1.png","μερίδα1","μερίδα1")
        addMap("armira kai pito Koufonisia")

        addReviewF("user1", "Εξαιρετικό φαγητό, όμορφος χώρος και πολύ ευγενικό και εξυπηρετικό προσωπικό! Προσιτές τιμές, σε πλήρη αναλογία με την ποσότητα και την ποιότητα που προσφέρουν!",5,true);
    }
    else if (id === "add"){
          editButton.click()
          return true
    }
    else {
        // return to page1 
        console.log("page not found")
        window.location.href = "../page1/page1.html";
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

function setOneImageActive() {
    try{
        const divImages = document.getElementsByClassName("carousel-item");
        divImages[0].classList.add("active");
    }
    catch (error){
        // pass
    }

}


function main(){
    setOneImageActive();
    removeStarButtonDefaultAction()
    disableTextarea()
    autoIncrimentTextarea()
    nonEditMode()
}

main()