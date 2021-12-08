const { Schema, model } = require("mongoose");

const BookSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Author'
    }
})



BookSchema.methods.toJSON = function() {
    const { __v, _id, ...book  } = this.toObject();
    book.id = _id;
    return book;
}


module.exports = model('Book', BookSchema);

