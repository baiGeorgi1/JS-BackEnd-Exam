const router = require('express').Router();
const electronicManager = require('../managers/electronicManager');
const { isAuth } = require('../middlewares/auth');


router.get('/', async (req, res) => {

    res.render('home',);
});
router.get('/catalog', async (req, res) => {
    const electronics = await electronicManager.getAll();
    res.render('catalog', { electronics });
});
router.get('/search', isAuth, async (req, res) => {
    const { name, type } = req.query;
    const found = await electronicManager.getAll(name, type);
    console.log(found);
    res.render('search', { found });
});
router.get('/404', (req, res) => {
    res.render('404');

});
module.exports = router;