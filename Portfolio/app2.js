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