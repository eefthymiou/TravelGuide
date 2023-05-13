import express from 'express';

const router = express.Router();

router.get('/mainpage', async (req, res) => {
    
    res.render('mainpage', {style: 'mainpage.css'});
 });


router.route('/page1').get(async (req, res) => {
    res.render('page1', {style: 'page1.css'});
});

 export { router };