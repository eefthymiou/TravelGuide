import * as model from '../model/mongodb/mongodb.mjs';
import fs from 'fs';


import { Page2Element} from '../public/scripts/page2Element.js';
import { ReviewElement } from '../public/scripts/reviewElement.js';
import { imageElement } from '../public/scripts/imageElement.js';
import { isAsyncFunction } from 'util/types';

const admin = true;
const user = false;

function getAvgRating(reviews) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i]; 
        sum += review.score;
    }
    const avgRating = (sum / reviews.length).toFixed(1);;

    return avgRating;
}

function getArrayScore(score){
    let arrayScore = [];
    for (let i=1; i<=score; i++) {
        arrayScore.push(i);
    }
    for (let i=score+1; i<=5; i++) {
        arrayScore.push(0);
    }
    return arrayScore;
}

async function fixElementForHbs(element){
    let avgRating = 0;

    avgRating = getAvgRating(element.reviews_ids);
    for (let i=0; i<element.numOfReviews; i++) {
     
        const userId = element.reviews_ids[i].user_id;
        const username = await model.getUsername(userId);
        element.reviews_ids[i].username = username;
        // fix reviews score for hbs
        element.reviews_ids[i].score = getArrayScore(element.reviews_ids[i].score);
    }
    element.avgRating = avgRating;
    return element;
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
    const avgRating = getAvgRating(page2Element.reviews);

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

    
    let element = await model.findPage2ElementById(id);
    console.log(element);
    element = await fixElementForHbs(element);

    console.log(element);

    try {
        res.render('page2', {
            username:req.session.username,
            id: id,
            category: element.category,
            title: element.title,
            description: element.main_text,
            info: element.texts, 
            map: element.map, 
            reviews: element.reviews_ids,
            avgRating: element.avgRating,
            numOfReviews: element.reviews_ids.length,
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
    try {
        const id = req.query.id;
        const title = req.body.title;
        const main_text = req.body.description;
        const texts = req.body.info;
        const map = req.body.map;
        
        await model.saveChangesLocation(id,title,main_text,texts,map);
    }
    catch (error) {
        console.log(error);
    }
   

    try {
        const { images } = req.files;
    
        const image = images;
        console.log(req.query.category);
        const path = 'public/images/' + req.query.category + '/' + image.name;
        console.log(path);
        try {
            fs.accessSync(path);
            console.log('File already exists:', image.name);
        } catch (error) {
            console.log('File does not exist:', image.name);
            image.mv(path);
            console.log('File uploaded:', image.name);
            try {
                const src = "../images/" + req.query.category + "/" + image.name;
                console.log(req.body.imagesTitle);
                await model.addImage(req.query.id,src,req.body.imagesAlt,req.body.imagesTitle);
            }
            catch {
                console.log(error);
            }

        }
    }
    catch (error) {
        console.log("no image");
    }
}

async function updatePage2ForUser(req,res) {
    const id = req.query.id;
    try {
        const reviewScore = req.body.reviewsScore;
        const reviewText = req.body.reviewsText;
        const reviewDate = req.body.reviewsDate;
        const user_id = req.session.user;

        // append review to database
        try {
            await model.addReview(id,user_id,reviewScore,reviewText,reviewDate);
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error){
        console.log("none review");
    }
}


export async function updatePage2(req,res) {
    console.log("update page2");
    const id = req.query.id;
    console.log(id);
    console.log(req.body);

    if (admin){
        await updatePage2ForAdmin(req,res);
    }
    else if (user) {
        await updatePage2ForUser(req,res);
    }

    // get the updated element
    let element = await model.findPage2ElementById(id);
    // console.log(element);
    element = await fixElementForHbs(element);

    try {
        res.render('page2', {
            username:req.session.username,
            id: id,
            category: req.query.category,
            title: element.title,
            description: element.main_text,
            info: element.texts, 
            map: element.map, 
            reviews: element.reviews_ids,
            avgRating: element.avgRating,
            numOfReviews: element.reviews_ids.length,
            images: element.images,
            admin: admin,
            user: user,
            style: 'page2.css'});
    }   
    catch (error) {
        res.send(error);
    }
    
}
