const express = require('express');
const router = express.Router();
const LogModel = require('../models/log.model');

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await LogModel.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logs by userId
router.get('/:userId', async (req, res) => {
  try {
    const logs = await LogModel.find({ user: req.params.userId });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a log
router.post('/', async (req, res) => {
  const log = new LogModel(req.body);
  try {
    const saved = await log.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a log
router.patch('/:id', async (req, res) => {
  try {
    const updated = await LogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Log not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a log
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await LogModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
