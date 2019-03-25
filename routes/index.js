var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Todo List'
  });
});

router.get('/newlist', (req, res, next) => {
  res.render('newlist', {
    title: 'Make a new list'
  });
});

router.get('/newitem', (req, res, next) => {
  res.render('newitem', {
    title: 'Make a new item'
  });
});

module.exports = router;