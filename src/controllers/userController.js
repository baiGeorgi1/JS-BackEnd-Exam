
const router = require('express').Router();
const userManager = require('../managers/userManager'); //11.
const { TOKEN_KEY } = require('../constants');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/auth');

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userManager.login(email, password);
        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err) });
    }

});

router.get('/register', async (req, res) => {
    res.render('users/register');
});
router.post('/register', async (req, res) => {
    const { email, username, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({ email, username, password, repeatPassword });
        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/register', { email, error: getErrorMessage(err) });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);
    res.redirect('/');
});

module.exports = router;