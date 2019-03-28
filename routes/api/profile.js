const express = require('express');
const router = express.Router();

// @routes Get api/profile/test
// @desc   Tets profile route
//@access  public route

router.get('/test', (req, res) => {
  res.json({
    msg: 'Profile Works'
  });
})

module.exports = router;