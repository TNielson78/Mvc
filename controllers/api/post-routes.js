const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {

const { title, body } = req.body;
const { user_id } = req.session;
const newPost = await Post.create({
  title,
  body,
  user_id,

});
res.json(newPost);
});
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;