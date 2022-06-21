let productsArray = [];
for (let i = 0; i < 20; i++) {
    let uname = `Apple`;
    let price = `${i + 1}`;
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
    searchForFruits()
});
function searchForFruits() {
    let searchedInput = $("#searchInput").val();
    for (let i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name == searchedInput) {
            console.log("name matched")
            viewProducts(i)
        }
        else if (productsArray[i].price == searchedInput) {
            $("#viewProducts").text("No products found with given search")
            console.log("price matched")
        }
        else if (searchedInput == "") {
            viewAll()
        }
        else {
            $("#viewProducts").empty()
            $("#viewProducts").text("No products found with given search")
        }
    }
}