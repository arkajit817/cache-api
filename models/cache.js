const mongoose = require('mongoose');

const CacheSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    }
    
});
const Cache = module.exports = mongoose.model('Cache', CacheSchema);

