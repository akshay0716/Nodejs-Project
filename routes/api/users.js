const express = require('express');
const router = express.Router();


// @routes Get api/users/test
// @desc   Tets users route
//@access  public route

router.get('/test', (req, res) => {
  res.json({
    msg: 'User Works'
  });
})

module.exports = router;