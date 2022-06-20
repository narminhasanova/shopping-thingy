let productsArray = []
if (localStorage.getItem("productArr") != null) {
    productsArray = JSON.parse(localStorage.getItem("productArr"))
}
if (productsArray.length == 0) {
    for (let i = 0; i < 20; i++) {
        let uname = `Apple`
        let price = `${i + 1}`
        let url = "img/apple.png"
        let product = { name: uname, price: price, img: url }
        productsArray.push(product)
    }
}
viewAll()
function viewAll() {
    $("#viewProducts").empty()
    for (let i = 0; i < productsArray.length; i++) {
        viewProducts(i)
    }
}
function viewProducts(a) {
    let product = productsArray[a]
    let div = document.createElement("div")
    div.classList.add("product");
    div.classList.add("visible");
    div.setAttribute("id", `i${a}`)
    let img = document.createElement("img")
    img.setAttribute("src", product.img);
    img.classList.add("img")
    let p1 = document.createElement("p")
    p1.innerText = product.name
    let p2 = document.createElement("p")
    p2.innerText = product.price + "$"
    div.appendChild(img)
    div.appendChild(p1)
    div.appendChild(p2)
    document.querySelector("#viewProducts").appendChild(div)
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
    };
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
});
$("#searchInput").change(function () {
    searchForFruits()
});
function searchForFruits() {
    let searchedInput = $("#searchInput").val();
    for (let i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name == searchedInput) {
            // $("#viewProducts").empty()
            console.log("name matched")
            // viewProducts(i)
            let product = productsArray[i]
            let div = document.createElement("div")
            div.classList.add("product");
            div.classList.add("visible");
            div.setAttribute("id", `i${i}`)
            let img = document.createElement("img")
            img.setAttribute("src", product.img);
            img.classList.add("img")
            let p1 = document.createElement("p")
            p1.innerText = product.name
            let p2 = document.createElement("p")
            p2.innerText = product.price + "$"
            div.appendChild(img)
            div.appendChild(p1)
            div.appendChild(p2)
            document.querySelector("#viewProducts").appendChild(div)
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
$("#searchInput").mouseleave(function () { 
    searchForFruits()
});