const express = require('express');
const router = express.Router();
router
  .route('/')
  .get((req, res) => {
    res.send('About me');
  })
  .post((req, res) => {
    res.send('Added something');
  })
  .put((req, res) => {
    res.send('Update about me');
  });

module.exports = router;
