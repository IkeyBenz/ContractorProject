const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charities', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 5000;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(function(req, res, next) {
    if (req.query._method) {
        req.method = req.query._method;
    }
    next();
});

require('./controllers/main')(app);


app.listen(port, console.log("Listening on " + port));