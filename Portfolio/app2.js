// JavaScript source code
//manage Hamburger menu
let iconClick = document.getElementsByClassName('icon');

if (iconClick !== null) {
    iconClick[0].addEventListener("click", onMenuClick);
}

function onMenuClick() {
    let x = document.getElementById("topnav");
    if (x.className === "navigation") {
        x.className += " responsive";
    } else {
        x.className = "navigation";
    }
}

//*****************************SLIDES*******************************************
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (slides.length > 0) {
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
}
//var slideIndex = 1;
//showSlides(slideIndex);

//// Next/previous controls
//function plusSlides(n) {
//    showSlides(slideIndex += n);
//}

//// Thumbnail image controls
//function currentSlide(n) {
//    showSlides(slideIndex = n);
//}

//function showSlides(n) {
//    var i;

//    var slides = document.getElementsByClassName("mySlides");
//    var dots = document.getElementsByClassName("dot");


//    if (document.getElementsByClassName("mySlides").length > 0 && document.getElementsByClassName("dot") !== null) {
//        if (n > slides.length) { slideIndex = 1 }
//        if (n < 1) { slideIndex = slides.length }
//        for (i = 0; i < slides.length; i++) {
//            slides[i].style.display = "none";
//        }
//        for (i = 0; i < dots.length; i++) {
//            dots[i].className = dots[i].className.replace(" active", "");
//        }
//        slides[slideIndex - 1].style.display = "block";
//        dots[slideIndex - 1].className += " active";
//    }
//}


/********************************MAP****************************************************/

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.263013, lng: - 2.934985 },
        zoom: 15,
        mapTypeControl: false
    });
}