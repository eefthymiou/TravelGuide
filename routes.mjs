import express from 'express';
import bodyParser from 'body-parser';

const page1Controller = await import('./controllers/page1-controller.mjs');
const page2Controller = await import('./controllers/page2-controller.mjs');
const authController = await import('./controllers/authentication-controller.mjs');

const router = express.Router();

router.get('/mainpage', async (req, res) => {
    res.render('mainpage', {username:req.session.username, style: 'mainpage.css'});
 });

router.get('/page1', page1Controller.createPage1);
router.get('/page2', page2Controller.createPage2);
router.post('/page2',bodyParser.urlencoded({ extended: false }), page2Controller.updatePage2);

router.post('/mainpage', authController.authentication);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/mainpage');
}); 

export { router };


