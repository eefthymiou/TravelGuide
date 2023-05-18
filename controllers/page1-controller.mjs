const model = await import('../model/mongodb/mongodb.mjs');

// //sights
// const profHlias = {"id": 2, "name":"Εκκλησία του Προφήτη Ηλία", "description":"Στην περιοχή του Προφήτη Ηλία υπήρχαν ίχνη εκκλησίας της πρωτοβυζαντινής περιόδου.",
//  "image":"../images/sights/profitis_hlias.png"};

// const sights = {profHlias};

// //accomm
// const petrosRooms = {"id": 3, "name":"Petros Rooms", "description":"Το κυκλαδίτικου στυλ Petros Rooms βρίσκεται στο Πάνω Κουφονήσι, σε απόσταση 100μ. από την παραλία Πόρτα, και προσφέρει πρόσφατα ανακαινισμένα δωμάτια με μινιμαλιστική διακόσμηση. Διαθέτει δωρεάν Wi-Fi και επιπλωμένο μπαλκόνι με θέα στο Αιγαίο Πέλαγος. Παρέχει επίσης σνακ μπαρ και δωρεάν υπηρεσία μεταφοράς από/προς το λιμάνι.",
//  "image":"../images/accommodation/petros_rooms.png"};

// const accomm = {petrosRooms};

// //transport
// const mavros = {"id": 4, "name": "Mavros G. Boat Tours", "description":"Στο νησί υπάρχουν καΐκια ή αλλιώς λάντζες που κάνουν το γύρω του νησιού και μπορείτε να επισκεφτείτε τις παραλίες του. Υπάρχουν τακτικά, καθημερινά δρομολόγια από τη Χώρα όπως επίσης με καΐκι μπορείτε να επισκεφτείτε και το Κάτω Κουφονήσι.",
//   "image":"../images/transportation/mavros_boat.png"};

// const transport = {mavros};

// //food
// const armira = {"id": 5, "name": "Αρμύρα και Πιοτό", "description":"Ελληνική και Μεσογειακή κουζίνα και θαλασσινά", "image":"../images/food/armira.png"};

// const food = {armira};

export async function createPage1(req, res){
    let category = req.query.category;
    let title;
    if (category === 'beaches') { title = 'Παραλίες';}  
    else if (category === 'sights') { title = 'Αξιοθέατα';}
    else if (category === 'accomm') { title = 'Διαμονή';}
    else if (category === 'transport') { title = 'Μετακινήσεις';}
    else if (category === 'food') { title = 'Φαγητό';}
    
    try {
      let locations = await model.getLocations(category);
      res.render('page1', { title: title, cards: locations, style: 'page1.css' });
    }
    catch (error) {
      res.send(error);
    }
};
