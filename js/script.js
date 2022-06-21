// create an array to pick fruits randomly
let fruits = ["Apple", "Pear", "Cherry", "Strawberry", "Pineapple", "Watermelon", "Blueberry"];
let productsArray = [];
for (let i = 0; i < 20; i++) {
    // get random number
    let randomPick = Math.trunc(Math.random() * fruits.length);
    // write to the object random fruit name
    let uname = fruits[randomPick];
    // setting random prices to fruits
    let price = Math.trunc(Math.random() * 100);
    let url = "img/apple.png";
    let product = { name: uname, price: price, img: url };
    productsArray.push(product);
}
let jsonStr = JSON.stringify(productsArray);
// checking if localStorage is empty, then write
if (localStorage.getItem("productArr") == null) {
    localStorage.setItem("productArr", jsonStr);
}
viewAll();
function viewAll() {
    $("#viewProducts").empty();
    // get the new array from localStorage
    const myArr = JSON.parse(localStorage.getItem("productArr"));
    for (let i = 0; i < myArr.length; i++) {
        viewProducts(myArr[i], i);
    }
}
function viewProducts(myObj, a) {
    console.log("wroking");
    let item = $(`<div class="product visible" id="i${a}">
    <img src="img/apple.png" class="img">
    <p>${myObj.name}</p>
    <p>${myObj.price}$</p>
    </div>`);
    $("#viewProducts").append(item);
}
$("#sellDiv").fadeOut(0);
let arrObj = JSON.stringify(productsArray)
localStorage.setItem("productArr", arrObj)
$("#sellShow").click(function () {
    $("#sellDiv").fadeToggle("slow");
    $(document).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '27') {
            $("#sellDiv").fadeOut("slow");
        }
    });
});
$("#goBack").click(function () {
    $("#sellDiv").fadeOut();
});
$("#sellForm").submit(function (e) {
    debugger;
    e.preventDefault();
    let fruitName = $("#nameInput").val();
    let fruitPrice = $("#priceInput").val();
    let inputFileTag = document.getElementById("imgInput")
    if (inputFileTag.files && inputFileTag.files[0]) {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(inputFileTag.files[0]);
    }
    function imageIsLoaded(e) {
        localStorage.setItem("img", e.target.result);

        let fruitImg = localStorage.getItem("img")
        localStorage.removeItem("img")
        let fruit = {
            name: fruitName,
            price: fruitPrice,
            img: fruitImg
        }
        productsArray.push(fruit)
        $("#sellDiv").fadeOut();
        alert("Fruit Posted!")
        let arrObj = JSON.stringify(productsArray)
        localStorage.setItem("productArr", arrObj)
        viewAll()
        $("#nameInput").val(null);
        $("#priceInput").val(null);
        $("#imgInput").val(null);
    };
});
$("#searchInput").change(function () {
    searchForFruits();
});
function searchForFruits() {
    $("#viewProducts").empty();
    // everytime get the latest version of the array from localStorage
    const myArr = JSON.parse(localStorage.getItem("productArr"));
    let searchedInput = $("#searchInput").val();
    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].name == searchedInput) {
            console.log("name matched");
            console.log(myArr[i], i);
            viewProducts(myArr[i], i);
        }
        // THIS WILL BE WRITTEN IN SELECT ELEMENT!
        // else if (myArr[i].price == searchedInput) {
        //     $("#viewProducts").text("No products found with given search")
        //     console.log("price matched")
        // }
        else if (searchedInput == "") {
            viewAll()
        }
        // TOO EARLY TO CHECK IF ANY ELEMENT IS FOUND OR NOT!
        // else {
        //     $("#viewProducts").text("No products found with given search")
        // }
    }
}