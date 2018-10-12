const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Charity', {
    name: { type: String, required: true },
    description: { type: String, required: false },
    founder: { type: String, required: false },
    totalDonations: { type: Number, default: 0 },
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
});