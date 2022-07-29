import express from 'express'
import multer from 'multer'
import cors from 'cors'
import mongoose from 'mongoose'
import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import { UserController, PostController } from './controllers/index.js'

mongoose.connect('mongodb+srv://TrueAlexander:Parol1001@cluster0.27lgncl.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err))

const app = express()

//add images 

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })


app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


// Authorization

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

// upload images
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

///CRUD of Posts

app.get('/posts', PostController.getAll)
app.get('/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)


app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})