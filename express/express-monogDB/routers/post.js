const express = require('express');
const PostEntity = require('../models/post');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const getRes = await PostEntity.find();
    res.json(getRes);
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post('/', async (req, res) => {
  // console.log('req', req.body);
  const entity = new PostEntity({
    title: req.body.title,
  });
  try {
    const saveRes = await entity.save();
    console.log('saveRes', saveRes);
    res.json(saveRes);
  } catch (error) {
    res.json({ msg: error });
  }
});

module.exports = router;
