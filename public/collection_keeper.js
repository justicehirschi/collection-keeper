// https://collection-keeper-jhirschi.herokuapp.com/

// My Coins
var getCoins = function () {
    return fetch("http://localhost:8080/coins", {
        method: "GET",
        credentials: "include"
    });
}

var createCoins = function (coin) {
    var data = `date=${encodeURIComponent(coin.date)}`;
    data += `&type=${encodeURIComponent(coin.type)}`;
    data += `&condition=${encodeURIComponent(coin.condition)}`;
    data += `&mint_mark=${encodeURIComponent(coin.mint_mark)}`;
    data += `&material=${encodeURIComponent(coin.material)}`;

    return fetch("http://localhost:8080/coins", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var deleteCoins = function (coin) {
    if (confirm("Are you sure you want to delete this coin?")) {
        return fetch("http://localhost:8080/coins/" + coin._id, {
            method: "DELETE",
            header: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
        });
    }
};

// Wish List Coins
var getWishListCoins = function () {
    return fetch("http://localhost:8080/wish_list_coins", {
        method: "GET",
        credentials: "include"
    });
}

var createWishListCoins = function (coin) {
    var data = `date=${encodeURIComponent(coin.date)}`;
    data += `&type=${encodeURIComponent(coin.type)}`;
    data += `&condition=${encodeURIComponent(coin.condition)}`;
    data += `&mint_mark=${encodeURIComponent(coin.mint_mark)}`;
    data += `&material=${encodeURIComponent(coin.material)}`;

    return fetch("http://localhost:8080/wish_list_coins", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var deleteWishListCoins = function (coin) {
    if(confirm("Are you sure you want to delete this coin?")) {
        return fetch("http://localhost:8080/wish_list_coins/" + coin._id, {
            method: "DELETE",
            header: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
        });
    }
};

var editWishListCoins = function (coin) {
    var data = `date=${encodeURIComponent(coin.date)}`;
    data += `&type=${encodeURIComponent(coin.type)}`;
    data += `&condition=${encodeURIComponent(coin.condition)}`;
    data += `&mint_mark=${encodeURIComponent(coin.mint_mark)}`;
    data += `&material=${encodeURIComponent(coin.material)}`;
    return fetch("http://localhost:8080/wish_list_coins/" + coin.coin_id, {
        method: "PUT",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

// Session

var getSession = function() {
    return fetch("http://localhost:8080/session", {
        method: "GET",
        credentials: "include"
    });
};

var createSession = function (email, plainPassword) {
    var data = `email=${encodeURIComponent(email)}`;
    data += `&plainPassword=${encodeURIComponent(plainPassword)}`;

    return fetch("http://localhost:8080/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var deleteSession = function() {
    return fetch("http://localhost:8080/logout", {
        method: "DELETE",
        credentials: "include"
    });
};

// Users

var getUserName = function() {
    return fetch("http://localhost:8080/users/name", {
        method: "GET",
        credentials: "include",
   });
};

var getUserEmail = function () {
    return fetch("http://localhost:8080/users/email", {
        method: "GET",
        credentials: "include",
    });
};

var createUsers = function (user) {
    var data = `firstName=${encodeURIComponent(user.firstName)}`;
    data += `&lastName=${encodeURIComponent(user.lastName)}`;
    data += `&email=${encodeURIComponent(user.email)}`;
    data += `&password=${encodeURIComponent(user.password)}`;

    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var app = new Vue({
    el: "#app",
    data: {
        // Forms
        showHomeBody: true,
        showSignInBody: false,
        showSignUpBody: false,
        showAccountCreated: false,
        showAccountBody: false,

        showAboutBody: false,
        showNavBar: false,

        showAccountShopBuyBody: false,
        showAccountShopSellBody: false,
        showAccountShopTradeBody: false,

        showMyCollectionsCoinsBody: false,
        showDetailsForm: false,
        backToMyCoins: false,

        showMyCollectionsWishListBody: false,
        showAddCoinToWishListForm: false,
        showEditCoinFromWishListForm: false,
        showGetMoneyBody: false,

        // coins
        date: "" ,
        type: "",
        condition: "",
        mint_mark: "",
        material: "",
        coin_id: "",
        my_coins: [],
        wish_list_coins: [],

        details_date: "",
        details_type: "",
        details_condition: "",
        details_mint_mark: "",
        details_material: "",

        // users
        signedInEmail: "",
        signedInName: "",

        signInEmail: "",
        signInPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        user_id: "",
        users: [],
        sign_in_status: "Sign in",

        // errors
        errors: [],
        collector_cash: 0,
        add_collector_cash: ""
    },
    methods: {
        // Form Methods
        hideAllForms: function () {
            this.showHomeBody = false;
            this.showSignInBody = false;
            this.showSignUpBody = false;
            this.showAccountCreated = false;
            this.showAccountBody = false;
            this.showAboutBody = false;
            this.showNavBar = false;
            this.showAccountShopBuyBody = false;
            this.showAccountShopSellBody = false;
            this.showAccountShopTradeBody = false;
            this.showMyCollectionsCoinsBody = false;
            this.showDetailsForm = false;
            this.showMyCollectionsWishListBody = false;
            this.showAddCoinToWishListForm = false;
            this.showEditCoinFromWishListForm = false;
            this.showNavShop = false;
            this.showNavMyCollections = false;
            this.showGetMoneyBody = false;
            this.errors = [];
        },
        displayHomeBody: function() {
            this.hideAllForms();
            this.showHomeBody = true;
        },
        displaySignInBody: function() {
            this.hideAllForms();
            getSession().then(response => {
                if(response.status == 200) {
                    this.displayAccountBody();
                    this.sign_in_status = "Logout";
                } else {
                    this.showSignInBody = true;
                }
            });
        },
        displaySignUpBody: function() {
            this.hideAllForms();
            this.showSignUpBody = true;
        },
        displayAccountBody: function() {
            this.hideAllForms()
            this.showAccountBody = true;
            this.showNavBar = true;
            getSession().then(response => {
                if(response.status == 200) {
                    getUserName().then(response => {
                        if (response.status == 200) {
                            response.json().then(username => {
                                this.signedInName = username;
                            });
                        }
                    });
                    getUserEmail().then(response => {
                        if (response.status == 200) {
                            response.json().then(userEmail => {
                                this.signedInEmail = userEmail;
                            });
                        }
                    });;
                }
            });
        },
        displayAboutBody: function() {
            this.hideAllForms();
            this.showAboutBody = true;
        },
        displayAccountShopBuyBody: function() {
            this.hideAllForms();
            this.showAccountShopBuyBody = true;
            this.showNavBar = true;
        },
        displayAccountShopSellBody: function() {
            this.hideAllForms();
            this.showAccountShopSellBody = true;
            this.showNavBar = true;
        },
        displayAccountShopTradeBody: function() {
            this.hideAllForms();
            this.showAccountShopTradeBody = true;
            this.showNavBar = true;
        },

        // My coins
        displayMyCollectionsCoinsBody: function() {
            this.hideAllForms();
            this.showMyCollectionsCoinsBody = true;
            this.showNavBar = true;
            this.backToMyCoins = true;
            this.loadCoins();
        },
        displayCoinDetails: function(coin) {
            this.hideAllForms();
            this.details_date = coin.date;
            this.details_type = coin.type;
            this.details_condition = coin.condition;
            this.details_mint_mark = coin.mint_mark;
            this.details_material = coin.material;
            this.showDetailsForm = true;
        },

        // Wish List
        displayMyCollectionsWishListBody: function() {
            this.hideAllForms();
            this.showMyCollectionsWishListBody = true;
            this.showNavBar = true;
            this.backToMyCoins = false;
            this.loadCoins();
        },
        displayAddCoinToWishListForm: function() {
            this.date = "";
            this.type = "";
            this.condition = "";
            this.mint_mark = "";
            this.material = "";
            this.hideAllForms();
            this.showAddCoinToWishListForm = true;
            this.showNavBar = true;
        },
        displayEditCoinFromWishListForm: function(coin) {
            this.hideAllForms();
            this.coin_id = coin._id;
            this.date = coin.date;
            this.type = coin.type;
            this.condition = coin.condition;
            this.mint_mark = coin.mint_mark;
            this.material = coin.material;
            this.showEditCoinFromWishListForm = true;
            this.showNavBar = true;
        },
        
        displayGetMoneyBody: function() {
            this.hideAllForms();
            this.showGetMoneyBody = true;
            this.showNavBar = true;
        },
        closeDetails: function() {
            if(this.backToMyCoins) {
                this.displayMyCollectionsCoinsBody();
            } else {
                this.displayMyCollectionsWishListBody();
            }
        },

        // Other Methods
        addCollectorCash: function() {
            this.collector_cash += Number(this.add_collector_cash);
            this.add_collector_cash = "";
        },

        checkLoginStatus: function() {
            getSession().then(response => {
                if(response.status == 200) {
                    this.sign_in_status = "Logout";
                } else {
                    this.sign_in_status = "Sign in";
                }
            });
        },

        // Create/Delete/Edit coins

        deleteCoinFromMyCoins: function (coin) {
            deleteCoins(coin).then(response => {
                if (response.status == 200) {
                    console.log("Coin Deleted!")
                } else {
                    console.log("Error deleting coin.")
                }
                this.loadCoins();
            });
            this.displayMyCollectionsCoinsBody();
        },

        collectDailyCoin: function() {
            var typeList = ["penny", "nickel", "dime", "quarter",
                "half penny", "2 cent", "3 cent", "20 cent", 
                "50 cent", "gold dollar", "eagle", "double eagle"
            ];
            var conditionList = ["fair", "about good", "good",
                "very good", "fine", "very fine", "extremely fine",
                "mint", "proof"
            ];
            var mintList = ["C", "CC", "D", "O", "P", "S", "W"];
            var materialList = ["copper", "zinc", "nickel", "steel", 
                "silver", "gold", "platinum", "diamond"
            ];

            // Random Type Math
            var randomNumber100 = Math.floor(Math.random() * 101);
            if(randomNumber100 > 75) {
                var randomTypeIndex = Math.floor((Math.random() * 8) + 4);
            } else {
                var randomTypeIndex = Math.floor(Math.random() * 4);
            }

            // Random Condition Math
            var secondRandomNumber100 = Math.floor(Math.random() * 101);
            if(secondRandomNumber100 > 75) {
                var randomConditionIndex = Math.floor((Math.random() * 4) + 5);
            } else {
                var randomConditionIndex = Math.floor(Math.random() * 5);
            }

            // Random Material Math
            var thirdRandomNumber100 = Math.floor(Math.random() * 101);
            if (thirdRandomNumber100 > 90) {
                var randomMaterialIndex = Math.floor((Math.random() * 4) + 4);
            } else {
                var randomMaterialIndex = Math.floor(Math.random() * 4);
            }

            var randomDate = Math.floor((Math.random() * 228) + 1793);
            var randomType = typeList[randomTypeIndex];
            var randomCondition = conditionList[randomConditionIndex];
            var randomMint = mintList[Math.floor(Math.random() * 7)];
            var randomMaterial = materialList[randomMaterialIndex];
            createCoins({
                date: randomDate,
                type: randomType,
                condition: randomCondition,
                mint_mark: randomMint,
                material: randomMaterial
            }).then(response => {
                if (response.status == 201) {
                    console.log("Coin Created!")
                } else {
                    console.log("Error creating coin.")
                }
                this.loadCoins();
            });
            this.displayMyCollectionsCoinsBody();
        },

        // Add Coins to Wish List
        validateCoin: function() {
            this.errors = [];
            if(this.date == "") {
                this.errors.push("You must add a date");
            } 
            if(this.type == "") {
                this.errors.push("You must add a type");
            }
            if(this.condition == "") {
                this.errors.push("You must add a condition");
            }
            if(this.mint_mark == "") {
                this.errors.push("You must add a mint mark");
            }
            if(this.material == "") {
                this.errors.push("You must add a material");
            }
        },

        addCoinToWishList: function() {
            this.validateCoin();
            if(this.errors.length > 0) {
                return;
            }
            createWishListCoins({
                date: this.date,
                type: this.type,
                condition: this.condition,
                mint_mark: this.mint_mark,
                material: this.material
            }).then(response => {
                if(response.status == 201) {
                    console.log("Coin Created!")
                } else {
                    console.log("Error creating coin.")
                }
                this.loadCoins();
            });
            this.date = "";
            this.type = "";
            this.condition = "";
            this.mint_mark = "";
            this.material = "";
            this.displayMyCollectionsWishListBody();
        },

        deleteCoinFromWishList: function(coin) {
            deleteWishListCoins(coin).then(response => {
                if(response.status == 200) {
                    console.log("Coin Deleted!")
                } else {
                    console.log("Error deleting coin.")
                }
                this.loadCoins();
            });
            this.displayMyCollectionsWishListBody();
        },

        editCoinFromWishList: function() {
            this.validateCoin();
            if(this.errors.length > 0) {
                return;
            }
            editWishListCoins({
                coin_id: this.coin_id,
                date: this.date,
                type: this.type,
                condition: this.condition,
                mint_mark: this.mint_mark,
                material: this.material
            }).then(response => {
                if(response.status == 200) {
                    console.log("Coin Edited!")
                } else {
                    console.log("Error editing coin.")
                }
                this.loadCoins();
            });
            this.date = "";
            this.type = "";
            this.condition = "";
            this.mint_mark = "";
            this.material = "";
            this.displayMyCollectionsWishListBody();
        },

        loadCoins: function() {
            getWishListCoins().then(response => {
                response.json().then(coins => {
                    this.wish_list_coins = coins;
                });
            });

            getCoins().then(response => {
                response.json().then(coins => {
                    this.my_coins = coins;
                });
            });
        },

        // Users
        validateUser: function() {
            this.errors = [];
            if(this.firstName == "") {
                this.errors.push("You must add a first name");
            } 
            if(this.lastName == "") {
                this.errors.push("You must add a last name");
            }
            if(this.email == "") {
                this.errors.push("You must add an email");
            }
            if(this.password == "") {
                this.errors.push("You must add a password");
            }
            console.log(this.errors);
        },

        addUser: function() {
            this.validateUser();
            if(this.errors.length > 0) {
                return;
            }
            createUsers({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            }).then(response => {
                if(response.status == 201) {
                    console.log("User Created!")
                    this.displaySignInBody();
                    this.showAccountCreated = true;
                } else if(response.status == 422) {
                    console.log("Email already in use.")
                    this.errors = [];
                    this.errors.push("That email is already in use.");
                }
            });
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
        },

        signIn: function() {
            this.errors = [];
            if(this.signInEmail == "") {
                this.errors.push("You must add an email");
            }
            if(this.signInPassword == "") {
                this.errors.push("You must add a password");
            }
            createSession(this.signInEmail, this.signInPassword).then(response => {
                if(response.status == 201) {
                    console.log("Logged In!")
                    this.displayAccountBody();
                    this.sign_in_status = "Logout";
                } else {
                    if(this.errors.length  == 0) {
                        this.errors.push("Email or password was incorrect");
                    }
                    console.log("Problem signing in.");
                }
            });;
        },

        logout: function() {
            deleteSession().then(response => {
                this.displaySignInBody();
            });

            this.signInEmail = "";
            this.signInPassword = "";
            this.sign_in_status = "Sign in";
        }
    },

    computed: {
        // Get Total Coins
        totalCoins: function () {
            return this.my_coins.length;
        }
    },

    created: function () {
        // Called when the vue app loads
        this.checkLoginStatus();
    }
});