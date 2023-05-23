// import * as model from `./model/${process.env.MODEL}/${process.env.MODEL}.mjs`;
import { get } from 'mongoose';
import * as model from '../model/mongodb/mongodb.mjs';
import multer from 'multer';
import path from 'path';

import { Page2Element} from '../public/scripts/page2Element.js';
import { ReviewElement } from '../public/scripts/reviewElement.js';
import { imageElement } from '../public/scripts/imageElement.js';

async function getAvgRating(reviews) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i]; 
        sum += Math.max.apply(null, review.score);
    }
    const avgRating = (sum / reviews.length).toFixed(1);;

    return avgRating;
}

// Configure storage and file naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images'); // Specify the destination folder where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Set the filename of the uploaded file
    }
  });
  
// Create the multer middleware
const upload = multer({ storage: storage });


export async function createPage2(req, res) {
    const id = req.query.id;

    // find the data from the database for the given id
    // const page2Element = await model.findPage2ElementById(id);
    const page2Element = new Page2Element(0,"beach");
    page2Element.title = "Παραλία Πορί";
    page2Element.description = "Η παραλία Πορί έχει μια απίστευτη ομορφιά που καθηλώνει τον επισκέπτη. Αποτελείται από λευκή άμμο με σμαραγδένια νερά και είναι τεράστια σε μήκος. Θεωρείται μια από τις κορυφαίες παραλίες των Κυκλάδων.";
    page2Element.info = [
        "info1",
        "info2",
        "info3"
    ];
    page2Element.location = "https://maps.google.com/maps?q=ΠαραλίαΠορίΚουφονήσια&t=&z=13&ie=UTF8&iwloc=&output=embed";

    const review1 = new ReviewElement(0,"john",5,"Πολύ ωραία παραλία! Την συστήνω ανεπιφύλακτα!");

    page2Element.reviews = [review1];

    // calculate the average rating
    const avgRating = await getAvgRating(page2Element.reviews);

    const admin = true;

    // images paths
    const image1 =  new imageElement(1,"../images/beaches.jpg","Παραλία Πορί","Παραλία Πορί",true);
    const image2 =  new imageElement(2,"../images/acc.jpg","Παραλία Πορί","Παραλία Πορί",false);
    const images = [image1,image2]

    page2Element.images = images;

    try {
        res.render('page2', {
            username:req.session.username,
            id : req.query.id,
            title: page2Element.title,
            description: page2Element.description, 
            info: page2Element.info, 
            location: page2Element.location, 
            reviews: page2Element.reviews,
            avgRating: avgRating,
            numOfReviews: page2Element.reviews.length,
            images: page2Element.images,
            admin: admin,
            style: 'page2.css'});
    }
    catch (error) {
        res.send(error);
    }
};


export async function updatePage2(req,res) {
    console.log(req.body);
    
    const page2Element = new Page2Element(
        req.body.id,
        req.body.title,
        req.body.description,
    );
    
    if (typeof req.body.info == "string") {
        page2Element.info = [req.body.info];
    }
    else {
        page2Element.info = req.body.info;
    }

    page2Element.location = req.body.location;
    
    // for element i of scoreReviews, scoreReviews[i] is an array of scores
    const scoreReviews = [];
    const textReviews = [];
    const userReviews = [];
    const idReviews = [];

    for (let i = 0; i < req.body.numOfReviews; i++) {
        if (req.body.numOfReviews == 1) {
            scoreReviews.push(req.body.reviewsScore);
            textReviews.push(req.body.reviewsText);
            userReviews.push(req.body.reviewsUserId);
            idReviews.push(req.body.reviewsId);
        }
        else {
            scoreReviews.push(req.body.reviewsScore[i]);
            textReviews.push(req.body.reviewsText[i]);
            userReviews.push(req.body.reviewsUserId[i]);
            idReviews.push(req.body.reviewsId[i]);
        }
    }

    // crete a new review element for each review
    const reviews = [];

    for (let i = 0; i < req.body.numOfReviews; i++) {
        // calculate the max of scoreReviews[i]
        let score = 0;
        for (let j = 0; j < scoreReviews[i].length; j++) {
            if (scoreReviews[i][j] > score) {
                score = scoreReviews[i][j];
            }
        }
        const review = new ReviewElement(
            idReviews[i],
            userReviews[i],
            score,
            textReviews[i]
        );
        reviews.push(review);
    }
    page2Element.reviews = reviews;
    const avgRating = await getAvgRating(page2Element.reviews);


    // images 
    if (typeof req.body.imagesPath == "string"){
        const image = new imageElement(
            req.body.imagesId,
            req.body.imagesPath,
            req.body.imagesAlt,
            req.body.imagesTitle,
            req.body.imagesActive
        );
        page2Element.images.push(image);
    }
    else {
        for (let i = 0; i < req.body.imagesPath.length; i++) {
            const image = new imageElement(
                req.body.imagesId[i],
                req.body.imagesPath[i],
                req.body.imagesTitle[i],
                req.body.imagesAlt[i],
                req.body.imagesActive[i]
            );
            page2Element.images.push(image);
        }
    }

    upload.single('image')(req,res,function(err) {
        if (err) {
            console.log(err);
        }
        if (req.file){
            console.log(req.file);
        }
        else {
            // No file was uploaded
            console.log('No file uploaded.');
        }
    });
    
    const admin = true;
    
    
    
    try {
        res.render('page2', {
            username:req.session.username,
            id : req.query.id,
            title: page2Element.title,
            description: page2Element.description, 
            info: page2Element.info, 
            location: page2Element.location, 
            reviews: page2Element.reviews,
            avgRating: avgRating,
            numOfReviews: page2Element.reviews.length,
            images: page2Element.images,
            admin: admin,
            style: 'page2.css'});
    }
    catch (error) {
        res.send(error);
    }
}
