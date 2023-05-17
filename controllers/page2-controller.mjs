import Page2Element from '../models/page2-element.mjs';
import * as model from `./model/${process.env.MODEL}/${process.env.MODEL}.mjs`;
// import * as model from '../model/mongodb/mongodb.mjs';

export async function createPage2(req, res) {
    // console.log(req.query)
    let id = req.query.id;
    try {
        res.render('page2', {style: 'page2.css'});
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
