// JavaScript source code
let searchName;
let searchChoice;

//SearchName
(function () {

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
        let xhrItems = new XMLHttpRequest();

        xhrItems.open("GET", "https://api.github.com/" + searchName + array[index]);
        xhrItems.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                showData(this.response);
                index++;
                if (index < array.length) {
                    xhrItems.open("GET", "https://api.github.com/" + searchName + array[index]);
                    xhrItems.send();
                }
            }
        };          
        xhrItems.send();
    }

    function showData(response) {
        let json = response; 

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
        });
    }
}());

//searchOption
let input = document.getElementById('item-name').value;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('select[name="item-select"]').onchange = changeEventHandler;
}, false);

function changeEventHandler(e) {
    if (e.target.value === "repos") {
        searchChoice = "users/" + input + "/repos";
        
    } else if (e.target.value === "followers") {
        searchChoice = "users/" + input + "/followers";
    } else if (e.target.value === "following") {
        searchChoice = "users/" + input + "/following";
    }
}

(function () {

    let array = [];

    function obtainChoice() {

        array.push(searchChoice);

        pedirItems(array);
    }

    //obtainChoice();

    function pedirItems(array) {
        let index = 0;
        let xhrItems = new XMLHttpRequest();

        xhrItems.open("GET", "https://api.github.com/" + array[index]);
        xhrItems.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                showData(this.response);
                index++;
                if (index < array.length) {
                    xhrItems.open("GET", "https://api.github.com/" + array[index]);
                    xhrItems.send();
                }
            }
        };
        xhrItems.send();
    }

    function showData(response) {
        let json = response; 

        //to extract the text we can use later
        let data = JSON.parse(json);
        console.log(data);

        data['items'].forEach(x => {

            let element = document.getElementById("aside");
            var z = document.createElement('p');

            if (searchChoice === "users/" + input + "/repos") {
                z.innerHTML = x.repos_url;
            } else if (searchChoice === "users/" + input + "/followers") {
                z.innerHTML = x.followers_url;
            } else if (searchChoice === "users/" + input + "/following") {
                z.innerHTML = x.following_url;
            }

            element.appendChild(z);
        });
    }
}());

console.log(input);

