

// require('dotenv').config();

const express = require('express')
// require ('.env'). config ();
const dotenv = require('dotenv')
const source = process.env.DATABASE_URL;
if(process.env.NODE_ENV !== 'production'){
    dotenv.config({path:__dirname+'/.env'});
    // require('dotenv').config()
}
const app = express();
const expressLayouts = require('express-ejs-layouts')
const indexRoute = require('./routes/index')

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose');
// const { options } = require('./routes/index');
mongoose.connect(source, { useNewUrlParser: true})
console.log(source)
// mongoose.connect("mongodb://localhost/mybrary", { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() =>console.log('you are connected to database'))
app.use('/',indexRoute)

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('server has started')
})