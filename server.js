const bodyParser = require("body-parser");
const express = require("express");
const model = require("./model.js");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: "null"})); // https://jhirschi123.github.io if on server
app.set("port", (process.env.PORT || 8080));
app.use(express.static("public"));

app.use(session({secret: "jfkds1234hjkfdsao913487aldj3u196z", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({
    usernameField: "email",
    passwordField: "plainPassword"
}, function(email, plainPassword, done) {
    model.User.findOne({email: email}).then(function(user) {
        if(!user) {
            // failed
            return done(null, false);
        }
        user.verifyEncryptedPassword(plainPassword, function(valid) {
            if(valid) {
                // successful
                return done(null, user);
            } else {
                // failed
                return done(null, false); 
            }
        });
    }, function(err) {
        // error finding user
        done(err);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    model.User.findOne({_id: id}).then(function(user) {
        done(null, user);
    }, function(err) {
        done(err);
    });
});

// SESSION

app.get("/session", function(request, response) {
    if(request.user) {
        // logged in
        response.sendStatus(200);
    } else {
        // not logged in
        response.sendStatus(401);
    }
});

app.post("/session", passport.authenticate("local"), function(request, response) {
    response.sendStatus(201);
});

app.delete("/logout", function(request, response) {
    if(request.user) {
        request.logout();
    }
    response.sendStatus(200);
});

// Get username

app.get("/users/name", (request, response) => {
    if (!request.user) {
        response.sendStatus(401);
        return;
    }
    response.json(request.user.firstName);
});

// Get user email

app.get("/users/email", (request, response) => {
    if (!request.user) {
        response.sendStatus(401);
        return;
    }
    response.json(request.user.email);
});

// Create a user

app.post("/users", (request, response) => {
    let user = new model.User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email
    });

    user.setEncryptedPassword(request.body.password, function() {
        user.save().then(function() {
            response.sendStatus(201);
        }, function(err) {
            if(err.errors) { 
                var messages = {};
                for(var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }

                console.log("Error Saving User.", messages);
                response.status(422).json(messages);
            } else if(err.code = 11000) {
                response.status(422).json({
                    email: "That email is already in use."
                });
            } else {
                console.log("Unexpected Error Saving User.")
                response.sendStatus(500);
            }
        });
    });
});

// List all coins
app.get("/coins", (request, response) => {
    if (!request.user) {
        response.sendStatus(401);
        return;
    }
    model.Coin.find({
        user: request.user._id
    }).then(function (coins) {
        response.json(coins);
    });
});

// Create a coin
app.post("/coins", (request, response) => {
    if (!request.user) {
        response.sendStatus(401);
        return;
    }

    let coin = new model.Coin({
        date: request.body.date,
        type: request.body.type,
        condition: request.body.condition,
        mint_mark: request.body.mint_mark,
        material: request.body.material,
        user: request.user._id
    });

    coin.save().then(function () {
        response.sendStatus(201);
    }, function (err) {
        if (err.errors) {
            var messages = {};
            for (var e in err.errors) {
                messages[e] = err.errors[e].message;
            }

            console.log("Error Saving Coin.", messages);
            response.status(422).json(messages);
        } else {
            console.log("Unexpected Error Saving Coin.")
            response.sendStatus(500);
        }
    });
});

// Delete a coin
app.delete("/coins/:id", (request, response) => {
    model.Coin.findOne({
        _id: request.params.id
    }).then(function (coin) {
        if (coin) {
            coin.delete().then(function () {
                console.log("Coin with id:", request.params.id, "deleted.")
                response.json(coin);
            });
        } else {
            response.sendStatus(404);
        }
    });
});

// List all wish list coins
app.get("/wish_list_coins", (request, response) => {
    if(!request.user) {
        response.sendStatus(401);
        return;
    }
    model.WishListCoin.find({user: request.user._id}).then(function(coins) {
        response.json(coins);
    });
});

// Create a wish list coin
app.post("/wish_list_coins", (request, response) => {
    if(!request.user) {
        response.sendStatus(401);
        return;
    }

    let wish_list_coin = new model.WishListCoin({
        date: request.body.date,
        type: request.body.type,
        condition: request.body.condition,
        mint_mark: request.body.mint_mark,
        material: request.body.material,
        user: request.user._id
    });

    wish_list_coin.save().then(function() {
        response.sendStatus(201);
    }, function(err) {
        if(err.errors) {
            var messages = {};
            for(var e in err.errors) {
                messages[e] = err.errors[e].message;
            }

            console.log("Error Saving Coin.", messages);
            response.status(422).json(messages);
        } else {
            console.log("Unexpected Error Saving Coin.")
            response.sendStatus(500);
        }
    });
});

// Delete a wish list coin
app.delete("/wish_list_coins/:id", (request, response) => {
    model.WishListCoin.findOne({ _id: request.params.id }).then(function (coin) {
        if (coin) {
            coin.delete().then(function () {
                console.log("Coin with id:", request.params.id, "deleted.")
                response.json(coin);
            });
        } else {
            response.sendStatus(404);
        }
    });
});

// Edit a wish list coin
app.put("/wish_list_coins/:id", (request, response) => {
    model.WishListCoin.findOne({ _id: request.params.id }).then(function (coin) {
        if (coin) {
            coin.date = request.body.date;
            coin.type = request.body.type;
            coin.condition = request.body.condition;
            coin.mint_mark = request.body.mint_mark;
            coin.material = request.body.material;
        
            coin.save().then(function () {
                console.log("Coin with id:", request.params.id, "edited.")
                response.sendStatus(200);
            });
        } else {
            response.sendStatus(404);
        }
    });
});

app.listen(app.get("port"),  function() {
    console.log("Listening...")
});