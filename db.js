let { MY_POKEMON_BASE_DBSTRING } = process.env;

const Mongoose = require('mongoose');
      Mongoose.connect(MY_POKEMON_BASE_DBSTRING);
const Schema = Mongoose.Schema;

const Pokemon = new Schema({
    specie: { type: String, required: true },
    nick  : String,
    level: Number,
    
    ability: { type: String, required: true },
    item   : String,
    gender : String,
    
    nature : String,
    happiness: Number,
    
    shiny  : Boolean,
    
    moves  : { type: [String], required: true },
    ivs    : { HP: Number, Atk: Number, Def: Number, SpA: Number, SpD: Number, Spe: Number },
    evs    : { HP: Number, Atk: Number, Def: Number, SpA: Number, SpD: Number, Spe: Number }
});

const Team = new Schema({
    name: { type: String, required: true },
    author: String,
    pass: String,
    version: { type: Number, default: 1 },
    pokemon: { type: [Pokemon], required: true },
    notes: {
        threats: [String],
        strengths: [String]
    }
});

exports.Pokemon = Mongoose.model('Pokemon', Pokemon);
exports.Team = Mongoose.model('Team', Team);