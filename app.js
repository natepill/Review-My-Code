// import reviews from 'reviews';
// import comments from 'comments';

var exphbs = require('express-handlebars')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const express = require('express')
const methodOverride = require('method-override')

const app = express()

const Comment = require('./models/comment')
const Review = require('./models/review')

const reviews = require('./controllers/reviews')
const comments = require('./controllers/comments')

const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');



// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const port = process.env.PORT || 3000;





// HANDLEBARS HELPERS
Handlebars.registerHelper("select", function(value, options) {
    return options.fn(this)
        .split('\n')
        .map(function(v) {
            var t = 'value="' + value + '"'
            return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
        })
        .join('\n')
});


var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');



app.use(methodOverride('_method'))

reviews(app)
comments(app)




app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(port, () => {
    console.log(`App listening on the port ${port}!`)
})
