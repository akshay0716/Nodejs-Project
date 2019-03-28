const express = require('express');
const router = express.Router();


// @routes Get api/posts/test
// @desc   Tets posts route
//@access  public route

router.get('/test', (req, res) => {
  res.json({
    msg: 'posts Works'
  });
})

module.exports = router;