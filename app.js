// import reviews from 'reviews';

var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')

const app = express()
const reviews = require('./controllers/reviews')

reviews(app)


app.use(methodOverride('_method'))


// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');





app.listen(3000, () => {
    console.log("App listening on the port 3000!")
})
