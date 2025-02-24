const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Secret = require('../models/Secret');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

router.post('/', async (req, res) => {
  const { secret, redeemLeft, password } = req.body;
  const hash = crypto.createHash('sha256').update(secret).digest('hex');
  const newSecret = new Secret({ hash, secret, redeemLeft, password, createdAt: new Date() });

  try {
    await newSecret.save();
    res.status(201).send({ hash });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:hash', async (req, res) => {
  const { hash } = req.params;
  const { password } = req.query;

  try {
    const secret = await Secret.findOneAndUpdate(
      { hash, redeemLeft: { $gt: 0 } },
      { $inc: { redeemLeft: -1 } },
      { new: true }
    );
    
    if (!secret) {
      return res.status(404).send('Secret not found or has been redeemed');
    }

    if (secret.password && !(await secret.comparePassword(password))) {
      return res.status(403).send('Incorrect password');
    }
    
    res.send({
      secret: secret.decryptSecret(),
      redeemLeft: secret.redeemLeft,
      createdAt: secret.createdAt
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const secrets = await Secret.find({});
    res.send(secrets);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
