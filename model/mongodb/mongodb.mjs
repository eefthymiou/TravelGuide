'use strict';

import mongoose from 'mongoose'

try {
    // mongoose.connect -> establishes a connection to a MongoDB 
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}

// assigns the connection object returned by mongoose.connection to the db constant
// the db object represents the connection to the MongoDB database.
const db = mongoose.connection;

// db.on sets up an event listener for the 'error' event on the database connection
db.on('error', console.error.bind(console, 'connection error:'));

// db.once event listener for the 'open' event on the database connection
db.once('open', function () {
    console.log("Successfull connection");
});



// Schema for the location collection
const locationSchema = new mongoose.Schema({
    category: String,
    title: String,
    main_text: String,
    texts : [String],
    image_src: String,
    image_alt: String,
    image_title: String,
    map: String,
    reviews_ids: [String]
});

// Model for the location collection
const Location = mongoose.model('location', locationSchema);


// εδώ θα μπουν τα quiries για την db


export let getLocations = async (category) => {
    // new Location({
    //     category: "beaches",
    //     title: "Ιταλίδα",
    //     main_text: "Το όνομα “Ιταλίδα”, προέκυψε λόγω της ιδιοκτήτριας της περιοχής πάνω από την παραλία. Αλλιώς, η Πλατιά Πούντα που είναι και το πραγματικό της όνομα είναι μία από τις πολυσύχναστες παραλίες του νησιού αμμώδης με γαλαζοπράσινα, κρυστάλλινα νερά.Απέχει 1.800 μέτρα περίπου από το χωριό και φτάνετε με καραβάκι ή με πεζοπορία 30 περίπου λεπτών.",
    //     texts: [],
    //     image_src: "../images/italida.jpg",
    //     image_alt: "Παραλία Ιταλίδα",
    //     image_title: "Παραλία Ιταλίδα",
    //     map: "",
    //     reviews_ids: []
    //   }).save();
    let locations = await Location.find({category:category}, {_id:1, title:1, main_text:1, image_src:1, image_alt:1, image_title:1}).lean();
    return locations;
}