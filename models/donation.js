const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Donation', {
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
    donor: { type: String, required: true },
    charityId: { type: Schema.Types.ObjectId, ref: 'Charity' }
});