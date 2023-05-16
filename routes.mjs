import express from 'express';
import page1 from './controllers/page1.mjs';
import page2 from './controllers/page2.mjs';

const router = express.Router();

router.get('/mainpage', async (req, res) => {
    res.render('mainpage', {style: 'mainpage.css'});
 });


router.get('/page1', page1.createPage1);
router.get('/page2', page2.createPage2);


export { router };


