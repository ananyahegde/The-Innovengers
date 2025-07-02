const express = require('express');
const router = express.Router();
const CredentialModel = require('../models/credential.model');

// Get all credentials
router.get('/', async (req, res) => {
  try {
    const credentials = await CredentialModel.find();
    res.json(credentials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one credential
router.get('/:id', getCredential, (req, res) => {
  res.json(res.credential);
});

// Create credential
router.post('/', async (req, res) => {
  const credential = new CredentialModel(req.body);
  try {
    const saved = await credential.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update credential
router.patch('/:id', getCredential, async (req, res) => {
  if (req.body.password != null) {
    res.credential.password = req.body.password;
  }
  try {
    const updated = await res.credential.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete credential
router.delete('/:id', getCredential, async (req, res) => {
  try {
    await res.credential.deleteOne();
    res.json({ message: 'Deleted Credential' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getCredential(req, res, next) {
  let credential;
  try {
    credential = await CredentialModel.findById(req.params.id);
    if (credential == null) {
      return res.status(404).json({ message: 'Cannot find credential' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.credential = credential;
  next();
}

module.exports = router;
