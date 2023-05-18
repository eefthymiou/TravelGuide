// import * as model from `./model/${process.env.MODEL}/${process.env.MODEL}.mjs`;
import * as model from '../model/mongodb/mongodb.mjs';

import { Page2Element} from '../public/scripts/page2Element.js';
import { ReviewElement } from '../public/scripts/reviewElement.js';


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
    ];
    page2Element.location = "Παραλία Πορί";

    const review1 = new ReviewElement(0,0,5,"Πολύ ωραία παραλία! Την συστήνω ανεπιφύλακτα!");
    const review2 = new ReviewElement(1,1,4,"Πολύ ωραία παραλία! Την συστήνω ανεπιφύλακτα!");
    
    page2Element.reviews = [review1,review2];

    

    try {
        res.render('page2', {
            title: page2Element.title,
            description: page2Element.description, 
            info: page2Element.info, 
            location: page2Element.location, 
            reviews: page2Element.reviews,
            style: 'page2.css'});
    }
    catch (error) {
        res.send(error);
    }
};

export async function createPage2Element(req,res) {
    const id = null;
    const category = req.body.category;
    const newPage2Element = new Page2Element(id, category);
    try {
        // add the new Page2Element to the database
        const lastInsertedId = await model.insertPage2Element(newPage2Element);
        // render the page2 view
    }
    catch (error) {
        res.send(error);
    }
}

export async function updatePage2Element(req,res) {
    const id = req.body.id;
    const category = req.body.category;
    const info = req.body.info;
    const images = req.body.images;
    const map = req.body.map;

    try {
        // find the Page2Element with the given id
        const page2Element = await model.findPage2ElementById(id);
        // update the Page2Element
        page2Element.category = category;
        page2Element.info = info;
        page2Element.images = images;
        page2Element.map = map;
        // update the Page2Element in the database
        await model.updatePage2Element(page2Element);
        // render the page2 view
        res.render('page2', {style: 'page2.css'}); 
    }
    catch (error) {
        res.send(error);
    }
}