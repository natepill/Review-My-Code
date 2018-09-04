// const express = require ('express')
// const app = express()
var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')

const app = express()


app.use(methodOverride('_method'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" },
//   { title: "Nathan's Adventure!"}
// ]

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})


// INDEX
app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

//CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', {review: review})
  }).catch((err) =>{
      console.log(err.message);
  })
})

// EDIT
app.get('reviews/:id/edit', function (req, res){
    Review.findById(req.params.id, function(err, review){
        res.render('reviews-edit', {review: review});
    })
})




app.listen(3000, () => {
    console.log("App listening on the port 3000!")
})
