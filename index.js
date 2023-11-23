const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const validateController = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectAuthenticationMiddleware = require('./middleware/authMiddleware')
const logoutController = require('./controllers/logout')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb+srv://sajjadUser:test@cluster0.gtjwlri.mongodb.net/PROJECT0?retryWrites=true&w=majority',{useNewUrlParser: true})
const app = new express()
global.loggedIn = null;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store',validateController)
app.use(expressSession({
    secret:'cookie is here'
}))

app.use('*', (req,res,next) =>{
loggedIn = req.session.userId;
next()
})
app.listen(3500, () => {
    console.log('App listening on port 3500')
})
app.get('/', homePageController)
app.post('/posts/store',authMiddleware,storePostController)
app.get('/post/new',authMiddleware,newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectAuthenticationMiddleware,newUserController)
app.post('/user/register',redirectAuthenticationMiddleware,storeUserController)
app.get('/auth/login',redirectAuthenticationMiddleware,loginController)
app.post('/user/login',redirectAuthenticationMiddleware,loginUserController)
app.get('')