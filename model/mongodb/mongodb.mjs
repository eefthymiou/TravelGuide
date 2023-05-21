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


// Schema for the user collection
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    admin: Boolean,
});
// Model for the user collection
const User = mongoose.model('user', userSchema);



// ------------------------QUERIES-------------------------
// --------------------------------------------------------

export let getLocations = async (category) => {
    let locations = await Location.find({category:category}, {_id:1, title:1, main_text:1, image_src:1, image_alt:1, image_title:1}).lean();
    return locations;
}

export let emailExists = async (email) => {
    let user = await User.findOne({email:email}).lean();
    if(user){
        return true;
    }
    return false;
}

export let userExists = async (email, password) => {
    let userId = await User.findOne({email:email, password:password}, {_id:1}).lean();
    return userId;
}

export let addUser = async (username, email, password) => {
    let user = new User({username:username, email:email, password:password, admin:false});
    await user.save();
    let userId = await User.findOne({email:email, password:password}, {_id:1}).lean();
    return userId;
}

export let getUsername = async (userId) => {
    let username = await User.findOne({_id:userId}, {_id:0, username:1}).lean();
    return username.username;
}

