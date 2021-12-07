const { Schema, model } = require("mongoose");

const GenreSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})



GenreSchema.methods.toJSON = function() {
    const { __v, _id, ...genre  } = this.toObject();
    genre.id = _id;
    return genre;
}


module.exports = model('Genre', GenreSchema);

