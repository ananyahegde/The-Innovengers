const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model') // renamed to UserModel

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Create a new user
router.post('/', async (req, res) => {
  const user = new UserModel({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    credentialId: req.body.credentialId,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.user.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user
  try {
    user = await UserModel.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router
