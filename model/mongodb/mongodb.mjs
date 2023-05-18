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
const Location = mongoose.model('Location', locationSchema);


// εδώ θα μπουν τα quiries για την db


export let getLocations = async (category) => {
    let location = await Location.find().lean();
    console.log(location);
}