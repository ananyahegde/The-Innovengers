const express = require('express');
const router = express.Router();
const ConsentModel = require('../models/consent.model');

// Get all consents
router.get('/', async (req, res) => {
  try {
    const consents = await ConsentModel.find();
    res.json(consents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get consents by userId
router.get('/:userId', async (req, res) => {
  try {
    const consents = await ConsentModel.find({ user: req.params.userId });
    res.json(consents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a consent
router.post('/', async (req, res) => {
  const consent = new ConsentModel(req.body);
  try {
    const saved = await consent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a consent
router.patch('/:id', async (req, res) => {
  try {
    const updated = await ConsentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Consent not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a consent
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ConsentModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Consent not found' });
    res.json({ message: 'Consent deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
