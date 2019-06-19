const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://jhirschi:123456a@ds117545.mlab.com:17545/coinsdb", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const wishListCoinSchema = new mongoose.Schema({
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
         type: String,
         required: [true, "All users must have a first name."]
    },
    lastName: {
         type: String,
         required: [true, "All users must have a last name."]
    },
    email: {
        type: String,
        required: [true, "All users must have an email."],
        unique: true
    },
    encryptedPassword: {
        type: String,
        required: [true, "All users must have a password."]
    }
});

userSchema.methods.setEncryptedPassword = function(plainPassword, callBackFunction) {
    bcrypt.hash(plainPassword, 10).then(hash => {
        this.encryptedPassword = hash;
        callBackFunction();
    });
};

userSchema.methods.verifyEncryptedPassword = function(plainPassword, callBackFunction) {
    bcrypt.compare(plainPassword, this.encryptedPassword).then(function (valid) {
        callBackFunction(valid);
    });
};

const WishListCoin = mongoose.model('WishListCoin', wishListCoinSchema);
const Coin = mongoose.model('Coin', coinSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    WishListCoin: WishListCoin,
    Coin: Coin,
    User: User
};