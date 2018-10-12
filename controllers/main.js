const Charity = require('../models/charity');

module.exports = function (app) {

    require('./charities')(app);
    require('./donations')(app);

    app.get('/', (req, res) => {
        Charity.find({}).then(charities => {
            for (let charity of charities) {
                charity.description = charity.description.slice(0, 100) + "..."
            }
            res.render('home', { charities: charities });
        }).catch(console.error)
    });
    
}