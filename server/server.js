const bodyParser = require("body-parser");
const express = require("express");
const model = require("./model.js");
const cors = require("cors");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// List all coins
app.get("/coins", (request, response) => {
    model.Coin.find().then(function(coins) {
        response.json(coins);
    });
});

// Create a coin
app.post("/coins", (request, response) => {
    console.log(request.url);
    console.log("BODY:", request.body);
    
    let coin = new model.Coin({
        date: request.body.date,
        type: request.body.type,
        condition: request.body.condition,
        mint_mark: request.body.mint_mark,
        material: request.body.material
    });

    coin.save().then(function() {
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

// Delete a coin
app.delete("/coins/:id", (request, response) => {
    model.Coin.findOne({ _id: request.params.id }).then(function (coin) {
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

// Edit a coin
app.put("/coins/:id", (request, response) => {
    model.Coin.findOne({ _id: request.params.id }).then(function (coin) {
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

app.listen(8080, () => {
    console.log("Listening...")
});