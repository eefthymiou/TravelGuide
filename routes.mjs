import express from 'express';

const page1Controller = await import('./controllers/page1-controller.mjs');
const page2Controller = await import('./controllers/page2-controller.mjs');


const router = express.Router();

router.get('/mainpage', async (req, res) => {
    res.render('mainpage', {style: 'mainpage.css'});
 });

router.get('/page1', page1Controller.createPage1);
router.get('/page2', page2Controller.createPage2);

export { router };


