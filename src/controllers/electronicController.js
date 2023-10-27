const router = require('express').Router();
const electronicManager = require('../managers/electronicManager');
const userManager = require('../managers/userManager');
const { auth, isAuth } = require('../middlewares/auth');

const { getErrorMessage } = require('../utils/errorHelper');


router.get('/add', auth, isAuth, (req, res) => {
    res.render('electronics/add');
});
router.post('/add', auth, isAuth, async (req, res) => {
    const { ...data } = req.body;
    try {
        await electronicManager.create({
            ...data,
            owner: req.user._id
        });

        res.redirect('/catalog');
    } catch (error) {
        res.render('electronics/add', { data, error: getErrorMessage(error), });
    }

});
router.get('/details/:electronicId', auth, async (req, res) => {
    const id = req.params.electronicId;
    try {
        const user = req.user?._id;
        const item = await electronicManager.getById(id);
        console.log(item);
        const result = item.buyingList?.find((e) => e._id.toString() == user);
        const isOwner = user == item.owner.toString();
        if (isOwner) {
            res.render('electronics/details', { item, isOwner });
        } else {
            const isBought = user == result?._id.toString();
            console.log(isBought);
            res.render('electronics/details', { item, isBought });
        }

    } catch (err) {
        const error = getErrorMessage(err);
        const electronic = await electronicManager.getById(id);
        res.render(`electronics/details`, { electronic, error });
    }
});

router.get('/edit/:electronicId', auth, isAuth, async (req, res) => {
    try {
        const item = await electronicManager.getById(req.params.electronicId);
        res.render('electronics/edit', { item });
    } catch (error) {
        res.render('electronics/edit', { error: getErrorMessage(err) });
    }

});
router.post('/edit/:electronicId', auth, isAuth, async (req, res) => {
    const { ...data } = req.body;
    const item = req.params.electronicId;
    try {

        await electronicManager.edit(item, data);
        res.redirect(`/electronics/details/${item}`);

    } catch (err) {
        const error = getErrorMessage(err);

        res.render(`electronics/edit`, { item, error: getErrorMessage(err), ...data });
    }
});
router.get('/delete/:electronicId', isAuth, async (req, res) => {
    const id = req.params.electronicId;
    const electronic = await electronicManager.getById(id);
    try {
        await electronicManager.deleteItem(id);
        res.redirect('/catalog');
    } catch (err) {
        res.render('electronics/details', { electronic, error: getErrorMessage(err) });
    }

});


router.get('/buy/:electronicId', auth, isAuth, async (req, res) => {
    const id = req.params.electronicId;
    const userId = req.user._id;
    try {
        const bought = await electronicManager.buy(id, userId);
        console.log(bought);
        res.redirect(`/electronics/details/${id}`, { bought });
    } catch (err) {
        console.error(getErrorMessage(err).message);
        res.redirect(`/electronics/details/${id}`);
    }

});

module.exports = router;