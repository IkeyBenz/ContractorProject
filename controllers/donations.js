const Donation = require('../models/donation');
const Charity = require('../models/charity');

module.exports = function (app) {

    app.get('/charities/:charityId/donations/new', (req, res) => {
        Charity.findById(req.params.charityId).then(charity => {
            res.render('donation-form', { charity: charity });
        }).catch(console.error);
    });

    app.post('/charities/:charityId/donations/new', (req, res) => {
        const donation = new Donation({ charityId: req.params.charityId, ...req.body });
        donation.save().then(donation => {
            Charity.findOneAndUpdate(req.params.charityId, {
                $inc: { totalDonations: donation.amount }
            }, (error, doc, result) => {
                if (error) {console.error(error.message)}
            });
            return Charity.findById(req.params.charityId)
        }).then(charity => {
            charity.donations.unshift(donation)
            charity.save()
        }).then(charity => {
            res.redirect('/charities/' + req.params.charityId);
        }).catch(console.error);
    });

    app.get('/charities/:charityId/donations/:donationId/update', (req, res) => {
        Donation.findById(req.params.donationId).then(donation => {
            Charity.findById(req.params.charityId).then(charity => {
                res.render('donation-form', { donation: donation, charity: charity });
            }).catch(console.error);
        }).catch(console.error);
    });

    app.put('/charities/:charityId/donations/:donationId/update', (req, res) => {
        let oga = Number(req.body.originalAmount), a = Number(req.body.amount);
        if (a != oga) {
            Charity.findOneAndUpdate({ _id: req.body.charityId },
                { $inc: { totalDonations: a - oga } }, (err, doc) => {
                    if (err) {console.error(err)}
                    console.log(doc);
                    console.log("This happened");
                });
        }
        delete req.body.originalAmount;

        Donation.findOneAndUpdate({ _id: req.params.donationId }, req.body).then(donation => {
            res.redirect(`/charities/${req.body.charityId}/`);
        });
    });

    app.delete('/charities/:charityId/donations/:dontationId/delete', (req, res) => {
        Donation.findOneAndDelete({ _id: req.params.donationId }).then(donation => {
            Charity.findOneAndUpdate({ _id: donation.charityId }, { $inc: { totalDonations: -donation.amount }});
        }).then(charity => {
            res.redirect(`/charities/${charity._id}/`);
        }).catch(console.error);
    });
    
}