
const Donation = require('../models/donation');
const Comment = require('../models/comment');

module.exports = function(app) {

    ////// Create comment ///////
    app.post('/donations/comments', (req, res) => {
        //res.send('reviews comment');
        Comment.create(req.body).then(comment => {
            res.redirect(`/donations/${comment.donationId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

        // DELETE
    app.delete('/donations/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/donations/${comment.donationId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })






}
