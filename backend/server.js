const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')
// connetc express
const app = express()


// connetc mongodb
const dbURL = 'mongodb+srv://sigar:sigar@cluster0.ysa06ei.mongodb.net/auth?retryWrites=true&w=majority'
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(3001, () => {
            console.log('server connected, port on 3001')
        })

    })
    .catch((error) => {
        console.log('db error')
    })
// middleware
app.use(bodyparser.json())
app.use(cors())

// routes
// user registiration post req
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'user created' })
    } catch (error) {
        res.status(500).json({ error: 'user dont created' })
    }
})
// user registiration get req
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ error: 'unable get users' })
    }
})

// get login
app.post('/login', async (req, res) => {
    try {
        // check password and username
        const { username, password } = req.body
        // check username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: 'invalid password or user name' })
        }
        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'envalid credentials' })
        }
        
        // security state make secure to personal info
        const SECRET_KEY='secretkey'
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'login succesful' })
    } catch (error) {
        res.status(500).json({ error: 'login error' })
    }
})

// POST CREATE
// GET READ
// PUT UPDATE
// DEL DELETE