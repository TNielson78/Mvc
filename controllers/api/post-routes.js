const router = require('express').Router();

router.post('/', async (req, res) => {res.json({message: "New post created!"});

});




module.exports = router;