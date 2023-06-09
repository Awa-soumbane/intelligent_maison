const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    prenom: { type: String, required:true },
    nom: { type: String, required:true },
    email: { type: String, unique: true, required:true },
    role: { type: String, required:true },
    mot_pass: { type: String, required:true },
    etat: { type: Boolean, required:false },
    rfid: { type: String, required:false },
    
}, {timestamps: true},
{
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Compte déjà existant !' });

module.exports = mongoose.model('users', userSchema)
