const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// Define the schema
const metaDataAuditorSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    audiNo: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the model
const MetaDataAuditor = mongoose.model('MetaDataAuditor', metaDataAuditorSchema);

module.exports = MetaDataAuditor;
