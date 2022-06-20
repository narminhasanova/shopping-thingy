const imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
let dots = document.getElementsByClassName("dot")
dots[0].style.backgroundColor = "rgb(75,75,75)"
$("#imgD").css("backgroundImage", `url(img/${imgArr[0]})`);
$("#next").click(function () {
    // debugger
    let imgURL = $("#imgD").css("backgroundImage").slice(31, 32);
    let imgIndex = imgArr.indexOf(`${imgURL}.jpg`);
    if (imgIndex == 8) {
        imgIndex = -1;
    }
    $("#imgD").fadeTo(200, 0.001);
    setTimeout(() => {
        $("#imgD").attr("style", `background-image:url(img/${imgArr[imgIndex + 1]})`);
        showIndex();
    }, 200);
    $("#imgD").fadeTo(200, 1);

});
$("#prev").click(function () {
    // debugger
    let imgURL = $("#imgD").css("backgroundImage").slice(31, 32);
    let imgIndex = imgArr.indexOf(`${imgURL}.jpg`);
    if (imgIndex == 0) {
        imgIndex = 9;
    }
    $("#imgD").fadeTo(200, 0.001);
    setTimeout(() => {
        $("#imgD").attr("style", `background-image:url(img/${imgArr[imgIndex - 1]})`);
        showIndex();
    }, 200);
    $("#imgD").fadeTo(200, 1);

});

function showIndex() {
    let a = $("#imgD").css("backgroundImage").slice(31, 32);
    let string = `${parseInt(a)}/9`;
    $("#iCp").text(string);
    //native method \/  \/  \/
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.backgroundColor = ""

    }
    dots[a - 1].style.backgroundColor = "rgb(75,75,75)"
}
$(".dot").click(function () {
    $(this).css("background-color", "rgb(75,75,75)")
    $(this).siblings().css("background-color", "")
    $("#imgD").fadeTo(200, 0.001);
    setTimeout(() => {
        $("#imgD").attr("style", `background-image:url(img/${imgArr[$(this).attr("id") - 1]})`);
        showIndex();
    }, 200);
    $("#imgD").fadeTo(200, 1);
})