const { Schema, model } = require("mongoose");

const KeyWordsSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})



KeyWordsSchema.methods.toJSON = function() {
    const { __v, _id, ...keyWords  } = this.toObject();
    keyWords.id = _id;
    return keyWords;
}


module.exports = model('KeyWords', KeyWordsSchema);

