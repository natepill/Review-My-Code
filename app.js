// import reviews from 'reviews';
// import comments from 'comments';

var exphbs = require('express-handlebars')
const express = require('express')
const methodOverride = require('method-override')

const app = express()

const Comment = require('./models/comment')
const Review = require('./models/review')

const reviews = require('./controllers/reviews')
const comments = require('./controllers/comments')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.use(methodOverride('_method'))

reviews(app)
comments(app)




app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(port, () => {
    console.log(`App listening on the port ${port}!`)
})
