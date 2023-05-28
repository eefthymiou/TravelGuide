'use strict';

import mongoose from 'mongoose'

const bcrypt = await import('bcrypt');
const saltRounds = 10;


try {
    // mongoose.connect -> establishes a connection to a MongoDB 
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}

try {
    // assigns the connection object returned by mongoose.connection to the db constant
    // the db object represents the connection to the MongoDB database.
    const db = mongoose.connection;

    // db.on sets up an event listener for the 'error' event on the database connection
    db.on('error', console.error.bind(console, 'connection error:'));

    // db.once event listener for the 'open' event on the database connection
    db.once('open', function () {
        console.log("Successfull connection");
    });
}
catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}




// Schema for the location collection
const locationSchema = new mongoose.Schema({
    category: String,
    title: String,
    main_text: String,
    texts : [String],
    images : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    map: String,
    reviews_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Model for the location collection
const Location = mongoose.model('location', locationSchema);

// Schema for the image collection
const imageSchema = new mongoose.Schema({
    src: String,
    alt: String,
    title: String,
});
// Model for the image collection
const Image = mongoose.model('image', imageSchema);
    
// Schema for the user collection
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    admin: Boolean,
});
// Model for the user collection
const User = mongoose.model('user', userSchema);

// Schema for the review collection
const reviewSchema = new mongoose.Schema({
    date: String,
    score: Number,
    text: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
// Model for the review collection
const Review = mongoose.model('review', reviewSchema);



// ------------------------QUERIES-------------------------
// --------------------------------------------------------

export let getLocations = async (category) => {
    let locations = await Location.find({category:category}, {_id:1, title:1, main_text:1, images:1, category:1}).lean();
    //find 1st image of each location
    for(let i=0; i<locations.length; i++){
        let image = await Image.findOne({_id:locations[i].images[0]}, {_id:0, src:1, alt:1, title:1}).lean();
        if (image == null) {
            image = {src: "../images/default.jpg", alt: "No image available", title: "No image available"};
        }
        locations[i].image_src = image.src;
        locations[i].image_alt = image.alt;
        locations[i].image_title = image.title;
    }
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
    let user = await User.findOne({email:email}, {_id:1, password:1}).lean();
    let result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (result) {
        return user._id;
    }
    return null;
}


export let addUser = async (username, email, password) => {
  try {
    // Hash the password
    const hashed = await bcrypt.hash(password, saltRounds);

    let user = new User({ username: username, email: email, password: hashed, admin: false });
    await user.save();
    return user._id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export let getUsername = async (userId) => {
    let username = await User.findOne({_id:userId}, {_id:0, username:1}).lean();
    return username.username;
}

export let isAdmin = async (userId) => {
    let admin = await User.findOne({_id:userId}, {_id:0, admin:1}).lean();
    return admin.admin;
}

export let hasDoneRegistration = async (userId) => {
    // if exist return true
    const status = await User.findOne({_id:userId}, {_id:1}).lean();
    if(status){
        return true;
    }
    return false;
}



// ------------------------PAGE2-------------------------
// --------------------------------------------------------

export let findPage2ElementById = async (locationId) => {
    console.log(locationId);
    let location = await Location.findOne({_id:locationId}, {_id:1, category:1, title:1, main_text:1, texts:1, images:1, map:1, reviews_ids:1 }).lean();
    console.log(location);
    try {
        const numOfImages = await Image.countDocuments({_id: {$in: location.images}});
        // for each image_id in locations find the image
        let images = [];
        for (let i=0; i<numOfImages; i++){
            const image = await Image.findOne({_id:{$in:location.images[i]}}, {_id:1, src:1, alt:1, title:1}).lean();
            images.push(image);
        }
        location.images = images;
        }
    catch (error) {
        location.images = [];
    }
    
    try {
        const numOfReviews = await Review.countDocuments({_id: {$in: location.reviews_ids}});
        // for each review_id in locations find the review
        let reviews_ids = [];
        for (let i=0; i<numOfReviews; i++){
            const review = await Review.findOne({_id:{$in:location.reviews_ids[i]}}, {_id:1, date:1, score:1, text:1, user_id:1}).lean();
            reviews_ids.push(review);
        }
        location.reviews_ids = reviews_ids;
        location.numOfReviews = numOfReviews;
    }
    catch (error){
        location.reviews_ids = [];
        location.numOfReviews = 0;
    }

    return location;
}

export let createLocation = async (category) => {
    let location = new Location({
        category:category, 
        title:"", 
        main_text:" ", 
        texts:[], 
        images:[], 
        map:"https://maps.google.com/maps?q=Κουφονήσια&t=&z=13&ie=UTF8&iwloc=&output=embed", 
        reviews_ids:[]
    });
    await location.save();
    return location._id;
}

export let addReview = async (locationId, userId, score, text ,date) => {
    // find the user from the database with userId
    const user = await User.findOne({_id:userId}, {_id:1}).lean();
    if(!user){
        throw Error('Δεν υπάρχει χρήστης με αυτό το id.');
    }
    // create the review
    let review = new Review({date: date, score:score, text:text, user_id:user._id});
    // save the review
    await review.save();

    // find the location
    let location = await Location.findOne({_id:locationId}, {_id:0, reviews_ids:1}).lean();
    // add the review id to the location
    location.reviews_ids.push(review._id);
    // update the location
    await Location.updateOne({_id:locationId}, {reviews_ids:location.reviews_ids});

}

export let saveChangesLocation = async (locationId, title, main_text, texts, map) => {
    // update the location
    await Location.updateOne({_id:locationId}, {title:title, main_text:main_text, texts:texts, map:map});

}

export let addImage = async (locationId, src, alt, title) => {
    // create image
    let image = new Image({src:src, alt:alt, title:title});
    // save image
    await image.save();
    // find the location
    let location = await Location.findOne({_id:locationId}, {_id:0, images:1}).lean();
    // add the image id to the location
    location.images.push(image._id);
    // update the location
    await Location.updateOne({_id:locationId}, {images:location.images});
}

export let deleteLocation = async (locationId) => {
    // find the location
    let location = await Location.findOne({_id:locationId}, {_id:0, images:1, reviews_ids:1}).lean();
    
    // delete the images
    // get the num of images
    let srcs = [];
    let image;
    try {
        const numOfImages = await Image.countDocuments({_id: {$in: location.images}});
        for(let i=0; i<numOfImages; i++){
            // find the image
            image = await Image.findOne({_id:location.images[i]}, {_id:0, src:1}).lean();
            // add the src to the array
            srcs.push(image.src);
            await Image.deleteOne({_id:location.images[i]});
        }
    }
    catch (error){
        // pass
    }

    try {
        // delete the reviews
        const numOfReviews = await Review.countDocuments({_id: {$in: location.reviews_ids}});
        for(let i=0; i<numOfReviews; i++){
            await Review.deleteOne({_id:location.reviews_ids[i]});
        }
        // delete the location
        await Location.deleteOne({_id:locationId});
    }
    catch (error){
        // pas
    }
    return srcs;
}

export let deleteImage = async (locationId, imageId) => {
    // find the image and delete it
    const image = await Image.findOne({_id:imageId}, {_id:0, src:1}).lean();
    await Image.deleteOne({_id:imageId});
    // find the location
    let location = await Location.findOne({_id:locationId}, {_id:0, images:1}).lean();
    // delete the image id from the location
    location.images = location.images.filter(id => id != imageId);
    // update the location
    await Location.updateOne({_id:locationId}, {images:location.images});
    return image.src;
}