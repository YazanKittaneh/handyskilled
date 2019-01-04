const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET homeowner page. */
router.get('/homeowner', function(req, res, next) {
  res.render('homeowner');
});

module.exports = router;