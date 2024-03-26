const router = require('express').Router();

const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {

    const { body,post_id } = req.body;
    const { user_id } = req.session;
    console.log(req.body);
    console.log(user_id);
    const comment = await Comment.create({
      
      body,
      post_id,
      user_id,
    
    });
    res.json(comment);
    });



module.exports = router;