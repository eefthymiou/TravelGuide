import express from 'express';
import createPage from './controllers/page1.mjs';

const router = express.Router();

router.get('/mainpage', async (req, res) => {
    
    res.render('mainpage', {style: 'mainpage.css'});
 });


router.get('/page1', createPage.createPage1);

export { router };