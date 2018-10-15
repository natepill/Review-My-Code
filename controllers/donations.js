//reviews.js
const Comment = require('../models/comment');
const Donation = require('../models/donation');

module.exports = function(app) {
    // INDEX - OUR FIRST MONGODB QUERY WITH A MONGOOSE MODEL
    app.get('/', (req, res) => {
        Donation.find()
            .then(donations => {
                res.render('donations-index', {
                    donations: donations
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

    // NEW
    app.get('/donations/new', (req, res) => {
        res.render('donations-new', {});
    })

    // CREATE - USING FORM DATA TO CREATE AREVIEW
    app.post('/donations', (req, res) => {
        Donation.create(req.body).then((donation) => {
            console.log(donation)
            res.redirect(`/donations/${donation._id}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // app.post('/reviews/:id', (req, res) => {
    //     res.send("Nope")
    // })

    // SHOW
    app.get('/donations/:id', (req, res) => {
      // find review
      Donation.findById(req.params.id).then(donation => {
        // fetch its comments
        Comment.find({ donationId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('donations-show', { donation: donation, comments: comments })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });

    // EDIT
    app.get('/donations/:id/edit', function(req, res) {
        Donation.findById(req.params.id, function(err, donation) {
            res.render('donations-edit', {donation: donation});
        })
    })

    // UPDATE
    app.put('/donations/:id', function(req, res) {
        Donation.findByIdAndUpdate(req.params.id, req.body)
            .then(donation => {
                res.redirect(`/donations/${donation._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/donations/:id', function(req, res) {
        console.log("DELETE donation")
        Donation.findByIdAndRemove(req.params.id).then((donation) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })



}
