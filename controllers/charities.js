const Charity = require('../models/charity');
const Donation = require('../models/donation');

module.exports = function (app) {

    app.get('/charities/new', (req, res) => {
        res.render('charity-form');
    });

    app.post('/charities/new', (req, res) => {
        Charity.create(req.body).then(result => {
            res.redirect('/');
        }).catch(console.error);
    });

    
    app.get('/charities/:id', (req, res) => {
        Charity.findById(req.params.id).populate('donations')
        .then(charity => { 
            res.render('charity-show', { charity: charity, charityId: req.params.charityId });
        });
    });

    app.get('/charities/:charityId/update', (req, res) => {
        Charity.findOne({_id: req.params.charityId}).then(charity => {
            res.render('charity-form', { charity: charity });
        }).catch(console.error);
    });

    app.put('/charities/:charityId/update', (req, res) => {
        Charity.findOneAndUpdate({ _id: req.params.charityId }, { $set: req.body })
        .then(charity => {
            res.redirect(`/charities/${charity._id}`);
        }).catch(console.error);
    });

    app.delete('/charities/:charityId/delete', (req, res) => {
        Charity.findOneAndDelete({ _id: req.params.charityId }).then(charity => {
            res.redirect('/');
        });
    });
    
}