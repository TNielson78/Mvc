const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }

});
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        const post = postData.get({ plain: true });
        console.log(post);
        res.render('post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [Post],
        });
        console.log(userData);
        const user = userData.get({ plain: true });
        // res.json(user);
        res.render('profile', {
          user,
          logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }



});


module.exports = router;