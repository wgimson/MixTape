var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MixTapeSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String,
    playlist: String
})

MixTapeSchema.plugin(mongoosePaginate)
const MixTape = mongoose.model('MixTape', MixTapeSchema)

module.exports = MixTape;