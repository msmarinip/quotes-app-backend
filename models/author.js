const { Schema, model } = require('mongoose');

const AuthorSchema = Schema({
    name:{
        type: String,
        require: true, 
        unique: true
    },
    birth: {
        type: String,
        require: false
    },
    death: {
        type: String,
        require: false
    },
    bio: {
        type: String,
        require: false
    },
    isPublished: Boolean,
    default: false
});

AuthorSchema.methods.toJSON = function() {
    const { __v, _id, ...author  } = this.toObject();
    author.id = _id;
    return author;
}


module.exports = model('Author', AuthorSchema);

