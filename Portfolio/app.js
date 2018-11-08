// JavaScript source code
let searchName, searchChoice;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[name="item-select"]').onchange = changeEventHandler;
}, false);

function changeEventHandler(e) {
    if (e.target.value === "repos") {
        searchChoice = "users/" + startBtn + "/repos";
    } else if (e.target.value === "followers") {
        searchChoice = "followers";
    } else if (e.target.value === "following") {
        searchName = "following";
    }
}

//SearchName
(function () {

    let startBtn = document.getElementById('btnName');
    let startBtn = document.getElementById('btnName');
    startBtn.addEventListener("click", obtainData);

    let array = [];

    function obtainData() {

        searchName = "search/users?q=";

        let input = document.getElementById('item-name').value;

        array.push(input);

        pedirItems(array);
    }

    function pedirItems(array) {
        let index = 0;
        let xhrFechas = new XMLHttpRequest();

        xhrFechas.open("GET", "https://api.github.com/" + searchName + array[index]);
        xhrFechas.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                showData(this.response);
                index++;
                if (index < array.length) {
                    xhrFechas.open("GET", "https://api.github.com/" + searchName + array[index]);
                    xhrFechas.send();
                }
            }
            xhrFechas.send();
        };                 
    }

    function showData(response) {
        let json = response; 3

        //to extract the text we can use later
        let data = JSON.parse(json);
        console.log(data);

        data['items'].forEach(x => {


            let element = document.getElementById("info");
            var z = document.createElement('p');

            let login = x.login;

            z.innerHTML = login;

            element.appendChild(z);

            let image = '<img src="' + x['avatar_url'] + '" />';

            document.getElementById('info').innerHTML += image;

            //document.getElementById('info').innerHTML += name + '-' + year;
        });
    }
}());

//searchOption
(function () {

    let array = [];

    function obtainChoice() {

        searchName = "search/users?q=";

        let input = document.getElementById('item-select').value;

        array.push(input);

        pedirItems(array);
    }

    function pedirItems(array) {
        let index = 0;
        let xhrFechas = new XMLHttpRequest();

        xhrFechas.open("GET", "https://api.github.com/" + searchChoice + array[index]);
        xhrFechas.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                showData(this.response);
                index++;
                if (index < array.length) {
                    xhrFechas.open("GET", "https://api.github.com/" + searchChoice + array[index]);
                    xhrFechas.send();
                }
            }
            xhrFechas.send();
        };
    }

    function showData(response) {
        let json = response; 3

        //to extract the text we can use later
        let data = JSON.parse(json);
        console.log(data);

        data['items'].forEach(x => {


            let element = document.getElementById("aside");
            var z = document.createElement('p');

            ////let login = x.repos;

            z.innerHTML = x;

            element.appendChild(z);

            ////////let image = '<img src="' + x['avatar_url'] + '" />';

            ////////document.getElementById('info').innerHTML += image;

            //document.getElementById('info').innerHTML += name + '-' + year;
        });
    }
}());

