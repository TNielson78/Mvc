const router = require('express').Router();

const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {

    const { title, body } = req.body;
    const { user_id } = req.session;
    const comment = await Comment.create({
      id,
      body,
      user_id,
    
    });
    res.json(comment);
    });



module.exports = router;