if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const indexRoute = require('./routes/index')
const authorRoute = require('./routes/authors')
const bookRoute = require('./routes/books')
const Author = require('./models/author')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

// const { required } = require('nodemon/lib/config');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() =>console.log('you are connected to database'))
app.use('/',indexRoute)
app.use('/authors',authorRoute)
app.use('/books',bookRoute)

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('server has started')
})








// password:kSttYRAN36PJmF46