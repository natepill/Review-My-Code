
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function(app) {

    ////// Create comment ///////
    app.post('/reviews/comments', (req, res) => {
        //res.send('reviews comment');
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

        // DELETE
    app.delete('/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })






}
