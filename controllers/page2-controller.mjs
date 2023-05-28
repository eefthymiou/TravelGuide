import * as model from '../model/mongodb/mongodb.mjs';
import fs from 'fs';
import path from 'path';

// const admin = true;
// const user = false;

function getAvgRating(reviews) {
    let sum = 0;
    if (reviews.length === 0) {
        return "-";
    }
    else {
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i]; 
            sum += review.score;
        }
        const avgRating = (sum / reviews.length).toFixed(1);;
    
        return avgRating;
    }
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



async function createPage2ForAdmin(res,req){
    try {
        const category = res.query.category;
        const locationId = await model.createLocation(category);
        return locationId;
    }   
    catch (error){
        console.log(error);
    }

}

export async function deleteImage(req,res) {
    const id = req.query.id;
    const category = req.query.category;
    const imageId = req.query.imageId;

    try {
        let src = await model.deleteImage(id, imageId);
        let basePath = 'public/images/' + req.query.category + '/';
        let filename = src.split('/').pop();
        const filePath = path.join(basePath, filename); 
        try {
            fs.accessSync(filePath);
            console.log('File exists:', filename);

            // Delete the file
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully:', filename);
            }
            });
        }
        catch (error) {
            console.log('File does not exist:', filename);
        }
        res.redirect('/page2?id=' + id + '&category=' + category);
    }
    catch (error){
        console.log(error);
    }
}

export async function deletePage2(req,res){
    const id = req.query.id;
    const category = req.query.category;
    try {
        const srcs = await model.deleteLocation(id);
        let basePath = 'public/images/' + req.query.category + '/';
        let filename;

        for (let i = 0; i < srcs.length; i++) {
        filename = srcs[i].split('/').pop();
        const filePath = path.join(basePath, filename);

        try {
            fs.accessSync(filePath);
            console.log('File exists:', filename);

            // Delete the file
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully:', filename);
            }
            });
        } catch (error) {
            console.log('File does not exist:', filename);
        }
        }
        res.redirect('/page1?category=' + category);
    }
    catch (error){
        console.log(error);
    }
}

export async function createPage2(req, res) {
    let id = req.query.id;
    let admin = false;
    let user = false;

    try {
        if (await model.hasDoneRegistration(req.session.user)) {
            if (await model.isAdmin(req.session.user)) {
                admin = true;
                user = false;
            }
            else {
                admin = false;
                user = true;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    
    if (id === "add"){
        id = await createPage2ForAdmin(req,res);
        console.log(id);
    }
    let element = await model.findPage2ElementById(id);
    element = await fixElementForHbs(element);
    
    // console.log(element);

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

    let admin = false;
    let user = false;

    try {
        if (await model.hasDoneRegistration(req.session.user)) {
            if (await model.isAdmin(req.session.user)) {
                admin = true;
                user = false;
            }
            else {
                admin = false;
                user = true;
            }
        }
    }
    catch (error) {
        console.log(error);
    }

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
