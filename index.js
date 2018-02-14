
var database = firebase.database().ref();
var myAccount = database.child(username).child("iceCreams");
myAccount.on('value', function (snapshot) {
    //resister
    if (snapshot.val() == null) {
        database.child(username).set({
            money: 100,
            iceCreams: 0,
            price: 0
        })
        document.getElementById("stats").innerHTML = "Login again to complete registration";
    }
    //login
    else {
        document.getElementById("myName").innerHTML = username + "'s<br>ACCOUNT";
        var moneyLeftToMe = database.child(username).child("money");
        moneyLeftToMe.on('value', function (snapshot) {
            document.getElementById("myMoney").innerHTML = "Money: " + snapshot.val();
        });
        var myIceCreams = database.child(username).child("iceCreams");
        myIceCreams.on('value', function (snapshot) {
            document.getElementById("myIceCreams").innerHTML = "Ice creams: " + snapshot.val();
        });
        var myPrice = database.child(username).child("price");
        myPrice.on('value', function (snapshot) {
            document.getElementById("myPrice").innerHTML = "Ice cream price: " + snapshot.val();
        });
    }
});


//shop search
function ShopSearch() {
    var shopPrice = database.child(document.getElementById("shopId").value).child("price");
    shopPrice.on('value', function (snapshot) {
        document.getElementById("shopPrice").innerHTML = "Price: " + snapshot.val();
    });

    var shopLeft = database.child(document.getElementById("shopId").value).child("iceCreams");
    shopLeft.on('value', function (snapshot) {
        document.getElementById("shopLeft").innerHTML = "Left: " + snapshot.val();
    });
}

//buy
function Buy() {
    var buyPrice = 0;//מחיר המוצר
    var buyLeft = 0;//כמה גידות יש למוכר
    var myMoney = 0;//כמה כסף יש לי
    var myIceCreams = 0; //כמה גלידות יש לי
    var buyMoney = 0; //כמה כסף יש למוכר שלי
    var myPrice = 0;//מחיר כל גלידה שלי

    var moneyLeftToMe = database.child(username).child("money");
    moneyLeftToMe.on('value', function (snapshot) {
        myMoney = snapshot.val();
    });
    var shopPrice = database.child(document.getElementById("shopId").value).child("price");
    shopPrice.on('value', function (snapshot) {
        buyPrice = snapshot.val();
    });
    var shopLeft = database.child(document.getElementById("shopId").value).child("iceCreams");
    shopLeft.on('value', function (snapshot) {
        buyLeft = snapshot.val();
    });
    var iceCreamsIHave = database.child(username).child("iceCreams");
    iceCreamsIHave.on('value', function (snapshot) {
        myIceCreams = snapshot.val();
    });
    var shopMoney = database.child(document.getElementById("shopId").value).child("money");
    shopMoney.on('value', function (snapshot) {
        buyMoney = snapshot.val();
    });
    var MyIceCreamPrice = database.child(username).child("price");
    MyIceCreamPrice.on('value', function (snapshot) {
        myPrice = snapshot.val();
    });

    if (myMoney >= buyPrice && buyLeft > 0) {
        database.child(username).set({
            money: myMoney - buyPrice,
            iceCreams: myIceCreams + 1,
            price: myPrice
        })
        database.child(document.getElementById("shopId").value).set({
            money: buyMoney + buyPrice,
            iceCreams: buyLeft - 1,
            price: buyPrice
        })
    }
    else {
        alert("error");
    }
}


//update price
function UpdatePrice() {
    var myMoney = 0; //כמה כסף יש לי
    var myIceCreams = 0; //כמה גלידות יש לי
    var myPrice = parseInt(document.getElementById("newPrice").value); //מחיר כל גלידה שלי

    var moneyLeftToMe = database.child(username).child("money");
    moneyLeftToMe.on('value', function (snapshot) {
        myMoney = snapshot.val();
    });
    var iceCreamsIHave = database.child(username).child("iceCreams");
    iceCreamsIHave.on('value', function (snapshot) {
        myIceCreams = snapshot.val();
    });
    database.child(username).set({
        money: myMoney,
        iceCreams: myIceCreams,
        price: myPrice
    })
}