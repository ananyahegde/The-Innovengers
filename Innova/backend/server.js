require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const posts = [
    {
        username: 'Olivia',
        title: 'post 1'
    },
    {
        username: 'Jim',
        title: 'post 2'
    }
]
app.get("/posts", authenticateToken, (req, res) => {
    
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user 
        next()
    })  
}

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')
const credentialsRouter = require('./routes/credentials')
const consentsRouter = require('./routes/consents')
const logsRouter = require('./routes/logs')

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/credentials', credentialsRouter)
app.use('/consents', consentsRouter)
app.use('/logs', logsRouter)

app.listen(3000, () => console.log('Server Started'))





