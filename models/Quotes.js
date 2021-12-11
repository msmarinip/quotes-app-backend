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
        default: 'es',
        enum: ['es', 'en']
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isShared: {
        type: Boolean,
        default: false
    },
    keyWords: {
        type: Array,
        require: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});


QuotesSchema.index({  keyWords: 'text', quote: 'text' }, { default_language: "spanish" });



QuotesSchema.method.toJSON = function () {
    const { _v, _id, ...quotes } = this.toObject();
    quotes.id = _id;

    return quotes;
}

const Quotes =  model('Quotes', QuotesSchema) ;
Quotes.syncIndexes();

module.exports = model('Quotes', QuotesSchema) 