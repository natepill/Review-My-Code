const express = require ('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" }
]

// INDEX
app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})


// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Hello World!' });
// })

app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})




app.listen(3000, () => {
    console.log("App listening on the port 3000!")
})
