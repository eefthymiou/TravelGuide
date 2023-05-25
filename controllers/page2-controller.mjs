import * as model from '../model/mongodb/mongodb.mjs';
import fs from 'fs';

import { Page2Element} from '../public/scripts/page2Element.js';
import { ReviewElement } from '../public/scripts/reviewElement.js';
import { imageElement } from '../public/scripts/imageElement.js';
import { isAsyncFunction } from 'util/types';

const admin = true;
const user = false;


async function getAvgRating(reviews) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i]; 
        sum += Math.max.apply(null, review.score);
    }
    const avgRating = (sum / reviews.length).toFixed(1);;

    return avgRating;
}

async function getPage2Data(id){
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
    page2Element.map = "https://maps.google.com/maps?q=ΠαραλίαΠορίΚουφονήσια&t=&z=13&ie=UTF8&iwloc=&output=embed";

    const review1 = new ReviewElement(0,"john",5,"Πολύ ωραία παραλία! Την συστήνω ανεπιφύλακτα!");

    page2Element.reviews = [review1];

    // calculate the average rating
    const avgRating = await getAvgRating(page2Element.reviews);

    // images paths
    const image1 =  new imageElement(1,"../images/beaches.jpg","Παραλία Πορί","Παραλία Πορί");
    const image2 =  new imageElement(2,"../images/acc.jpg","Παραλία Πορί","Παραλία Πορί");
    const images = [image1,image2]

    page2Element.images = images;
    page2Element.avgRating = avgRating;
    
    return page2Element;
}


export async function createPage2(req, res) {
    const id = req.query.id;

    // if (await model.hasDoneRegistration(req.session.username)) {
    //     if (await model.isAdmin(req.session.username)) {
    //         const admin = true;
    //         const user = false;
    //     }
    //     else {
    //         const admin = false;
    //         const user = true;
    //     }

    // }

    
    const element = await model.findPage2ElementById(id);
    console.log(element);
    const avgRating = await getAvgRating(element.reviews);
 

    try {
        res.render('page2', {
            username:req.session.username,
            title: element.title,
            description: element.main_text,
            info: element.texts, 
            map: element.map, 
            reviews: element.reviews,
            avgRating: avgRating,
            numOfReviews: element.reviews.length,
            images: element.images,
            admin: admin,
            user: user,
            style: 'page2.css'});
    }   
    catch (error) {
        res.send(error);
    }
};

async function updatePage2ForAdmin(req,res) {
    const page2Element = new Page2Element(
        req.body.id,
        req.body.title,
        req.body.description,
    );

    try {
        if (typeof req.body.info == "string") {
            page2Element.info = [req.body.info];
        }
        else {
            page2Element.info = req.body.info;
        }
    }
    catch (error) {
        page2Element.info = [];
    }
    
    try {
        page2Element.map = req.body.map;
    }
    catch (error) {
        page2Element.map = "";
    }

    // images 
    try {
        const image = new imageElement(
            req.body.imagesAlt,
            req.body.imagesTitle,
        );
        page2Element.images.push(image);
    }
    catch (error) {
        console.log("none images");
    }
    
    try {
        const { images } = req.files;
    
        const image = images;
        const path = 'public/images/' + image.name;
    
        try {
            fs.accessSync(path);
            console.log('File already exists:', image.name);
        } catch (error) {
            console.log('File does not exist:', image.name);
            image.mv(path);
            console.log('File uploaded:', image.name);
        }
    }
    catch (error) {
        console.log("none image");
    }
}

async function updatePage2ForUser(req,res) {
    
}


export async function updatePage2(req,res) {
    console.log(req.body);
    // update data
    if (admin){
        await updatePage2ForAdmin(req,res);
    }
    else if (user) {
        await updatePage2ForUser(req,res);
    }

    // get the new data of page2 from database
    const page2Element = new Page2Element(1);
    const avgRating = 0;
    // render page
    
    try {
        res.render('page2', {
            username:req.session.username,
            id : req.query.id,
            title: page2Element.title,
            description: page2Element.description, 
            info: page2Element.info, 
            map: page2Element.map, 
            reviews: page2Element.reviews,
            avgRating: avgRating,
            numOfReviews: page2Element.reviews.length,
            images: page2Element.images,
            admin: admin,
            user: user,
            style: 'page2.css'});
    }
    catch (error) {
        res.send(error);
    }
}
