const router = require('express').Router()



//import register model
const User = require('../models/user')

//for hashing pass : importing bcrypt
const bcrypt = require('bcrypt')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

//POST METHOD: registering new user
router.post('/user-register',  async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    //if exist then
    if (user)
      return res.status(409).json({
        message: 'User with given email is already exist',
      })

    //salt for hashing pass
    let salt = await bcrypt.genSalt(Number(process.env.SALT))

    //password hashing
    let hashedPassword = await bcrypt.hash(req.body.password, salt)

    //saving user data to database
    user = await new User({
      ...req.body,
      password: hashedPassword,
      image: req.file.path,
    })
    user
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'User register successfully',
        })
      })
      .catch((err) => {
        res.json(err)
      })
  } catch (error) {
    //if any error occur
    console.log(error)
    res.status(500).send({
      message: 'Internal Server Error',
    })
  }
})

// login post
router.post('/user-login', async (req, res) => {
  await User.findOne({ email: req.body.email }).then((userData) => {
    if (userData === null) {
      return res.json({ message: 'Invalid' })
    }
    const password = req.body.password
    bcrypt.compare(password, userData.password, (e, result) => {
      if (result === false) {
        return res.json({ message: 'Invalid password' })
      }
      console.log(userData)

      //for token generator
      userData.password = null
      const token = jwt.sign(
        { userId: userData._id, user: userData },
        process.env.JWTPRIVATEKEY,
      )

      console.log(token)

      res.json({ token: token, message: 'successfully login!' })
    })
  })
})

// for getting own user data
router.get('/user-data/:userId', async (req, res) => {
  await User.findOne({ _id: req.params.userId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

//for getting all doctors
router.get('/all-doctors', async (req, res) => {
  await User.find({ role: 'doctor' })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(401).json(err)
    })
})
//for getting all users
router.get('/all-users', async (req, res) => {
  await User.find({ role: 'user' })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(401).json(err)
    })
})

//GET METHOD: for getting single data
router.get('/get-single-doctor/:did', async (req, res) => {
  await User.findOne({ _id: req.params.did })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch(() => {
      res.status(409).json({
        message: 'Something is wrong',
      })
    })
})


//exporting register router
module.exports = router
