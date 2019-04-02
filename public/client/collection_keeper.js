// Coins
var getCoins = function () {
    return fetch("https://collection-keeper-jhirschi.herokuapp.com/coins", {
        credentials: "include"
    });
}

var createCoins = function (coin) {
    var data = `date=${encodeURIComponent(coin.date)}`;
    data += `&type=${encodeURIComponent(coin.type)}`;
    data += `&condition=${encodeURIComponent(coin.condition)}`;
    data += `&mint_mark=${encodeURIComponent(coin.mint_mark)}`;
    data += `&material=${encodeURIComponent(coin.material)}`;

    return fetch("https://collection-keeper-jhirschi.herokuapp.com/coins", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var deleteCoins = function (coin) {
    if(confirm("Are you sure you want to delete this coin?")) {
        return fetch("https://collection-keeper-jhirschi.herokuapp.com/coins/" + coin._id, {
            method: "DELETE",
            header: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
        });
    }
};

var editCoins = function (coin) {
    var data = `date=${encodeURIComponent(coin.date)}`;
    data += `&type=${encodeURIComponent(coin.type)}`;
    data += `&condition=${encodeURIComponent(coin.condition)}`;
    data += `&mint_mark=${encodeURIComponent(coin.mint_mark)}`;
    data += `&material=${encodeURIComponent(coin.material)}`;
    return fetch("https://collection-keeper-jhirschi.herokuapp.com/coins/" + coin.coin_id, {
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
    return fetch("https://collection-keeper-jhirschi.herokuapp.com/session", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include"
    });
};

var createSession = function (email, plainPassword) {
    var data = `email=${encodeURIComponent(email)}`;
    data += `&plainPassword=${encodeURIComponent(plainPassword)}`;

    return fetch("https://collection-keeper-jhirschi.herokuapp.com/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: data
    });
};

var deleteSession = function() {
    return fetch("https://collection-keeper-jhirschi.herokuapp.com/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
    });
};

// Users

var createUsers = function (user) {
    var data = `firstName=${encodeURIComponent(user.firstName)}`;
    data += `&lastName=${encodeURIComponent(user.lastName)}`;
    data += `&email=${encodeURIComponent(user.email)}`;
    data += `&password=${encodeURIComponent(user.password)}`;

    return fetch("https://collection-keeper-jhirschi.herokuapp.com/users", {
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
        showAccountShopCoinsBody: false,
        showMyCollectionsWishListBody: false,
        showAddCoinToWishListForm: false,
        showEditCoinFromWishListForm: false,
        showNavShop: false,
        showNavMyCollections: false,
        showGetMoneyBody: false,

        // coins
        date: "" ,
        type: "",
        condition: "",
        mint_mark: "",
        material: "",
        coin_id: "",
        coins: [],

        // users
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
            this.showAccountShopCoinsBody = false;
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
                    this.showAccountBody = true;
                    this.showNavBar = true;
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
        },
        displayAboutBody: function() {
            this.hideAllForms();
            this.showAboutBody = true;
        },
        displayAccountShopCoinsBody: function() {
            this.hideAllForms();
            this.showAccountShopCoinsBody = true;
            this.showNavBar = true;
        },
        displayMyCollectionsWishListBody: function() {
            this.hideAllForms();
            this.showMyCollectionsWishListBody = true;
            this.showNavBar = true;
            this.loadCoins();
        },
        displayAddCoinToWishListForm: function() {
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

        // Other Methods
        displayNavShop: function() {
            this.showNavShop = !this.showNavShop;
        },
        displayNavMyCollections: function() {
            this.showNavMyCollections = !this.showNavMyCollections;
        },
        addCollectorCash: function() {
            this.collector_cash += Number(this.add_collector_cash);
            this.add_collector_cash = "";
        },
        changeSignInStatus: function() {
            getSession().then(response => {
                if(response.status == 200) {
                    this.sign_in_status = "Logout";
                } else {
                    this.sign_in_status = "Sign in";
                }
            });
        },

        // Create/Delete/Edit coins

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
            console.log(this.errors);
        },
        addCoinToWishList: function() {
            this.validateCoin();
            if(this.errors.length > 0) {
                return;
            }
            createCoins({
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
            deleteCoins(coin).then(response => {
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
            editCoins({
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
            getCoins().then(response => {
                response.json().then(coins => {
                    this.coins = coins;
                });
            });
        },
        created: function() {
            this.loadCoins();
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
                } else {
                    console.log("Problem signing in.")
                    this.errors.push("Email or password was incorrect");
                }
            });;

            this.signInEmail = "";
            this.signInPassword = "";
        },
        logout: function() {
            if(this.sign_in_status == "Sign in") {
                return;
            } else {
                deleteSession().then(function(request, response) {
                    if(response.status == 200) {
                        displaySignInBody();
                    } else {
                        return;
                    }
                });
            }
        }
    }
});

