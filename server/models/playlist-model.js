const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        published: { type: Boolean, required: false },
        likes: {type: Number, required: false},
        dislikes: {type: Number, required: false},
        plays: {type: Number, required: false},
        comments: {type: [{user: String, comment: String}],default:[], required: false},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
