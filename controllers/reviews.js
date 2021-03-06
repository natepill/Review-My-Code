//reviews.js
const Comment = require('../models/comment');
const Review = require('../models/review');


module.exports = function(app) {

//TODO: FINISH HOMEPAGE
// Navbar buttons(Languages (drop down), Design, Architecture, Algorithms/Data structures, Trending, Upload)
// Upload button is a show route GET method to a "form page"
// Each of the buttons are show routes to /{{category-tag/posts}}
// Carousel of articles w/ images of tech literature
// About & How to


    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('home-page', {
                    reviews: reviews
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

    // NEW
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {});``
    })



    // CREATE - USING FORM DATA TO CREATE AREVIEW

    //TODO POST TO /REVIEWS/:Category
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review)
            res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })


    app.get('/category/:category', (req, res) => {
        Review.find({category: req.params.category}).then(reviews =>{

            res.render('reviews-index', {reviews: reviews})

        }).catch(console.error)
    })

    // app.post('/reviews/:id', (req, res) => {
    //     res.send("Nope")
    // })

    // SHOW
    app.get('/reviews/:id', (req, res) => {
      // find review
      Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('reviews-show', { review: review, comments: comments })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });

    // EDIT
    app.get('/reviews/:id/edit', function(req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    })

    // UPDATE
    app.put('/reviews/:id', function(req, res) {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/reviews/:id', function(req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/category/${review.category}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })



}
