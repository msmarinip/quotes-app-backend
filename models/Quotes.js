const { Schema, model } = require("mongoose");

const QuotesSchema = Schema({
    quote: {
        type: String,
        require: [ true, 'La frase es obligatoria.']
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        require: false
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        require: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        require: false
    },
    language: {
        type: String,
        require: true,
        default: 'Español',
        enum: ['Español', 'English']
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    keyWords: {
        type: [ Schema.Types.String ],
        ref: 'KeyWord'
    }


});



QuotesSchema.method.toJSON = function () {
    const { _v, _id, ...quotes } = this.toObject();
    quotes.id = _id;

    return quotes;
}

module.exports = model('Quotes', QuotesSchema) 