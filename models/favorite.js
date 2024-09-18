const { Schema, model } = require('mongoose');

const favoritoSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',  
        required: true
    },
    favoriteId: {
        type: String,
        required: [true, 'El ID del favorito es obligatorio']
    },
    type: {
        type: String,  
        required: [true, 'El tipo de favorito es obligatorio']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

favoritoSchema.methods.toJSON = function() {
    const { __v, _id, ...favorite } = this.toObject();
    favorite.uid = _id;
    return favorite;
};

module.exports = model('Favorito', favoritoSchema);
