const mongoose = require("mongoose");

mongoose.connect("mongodb://jhirschi:123456a@ds117545.mlab.com:17545/coinsdb", {useNewUrlParser: true});

// VALIDATION (https://mongoosejs.com/docs/validation.html)

const coinSchema = new mongoose.Schema({
    date: {
         type: Number,
         required: [true, "All coins must have a date."]
    },
    type: {
         type: String,
         required: [true, "All coins must have a type."]
    },
    condition: {
        type: String,
        required: [true, "All Coins must have a condition."]
    },
    mint_mark: {
        type: String,
        required: [true, "All Coins must have a mint mark."]
    },
    material: {
        type: String,
        required: [true, "All Coins must have a material."]
    }
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = {
    Coin: Coin
};