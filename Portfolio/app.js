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

(function () {  

    let array = [];

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('select[name="item-select"]').onchange = obtainChoice;
    }, false);

    function obtainChoice() {

        let selOpt = document.getElementById('item-select').value;

        if (selOpt === "repos") {
            searchChoice = "/repos";
        } else if (selOpt === "followers") {
            searchChoice = "/followers";
        } else if (selOpt === "following") {
            searchChoice = "/following";
        }

        array.push(searchChoice);

        pedirItems(array);
    }

    //obtainChoice();

    function pedirItems(array) {
        let userName = document.getElementById('item-name').value;
        let index = 0;
        let xhrItems = new XMLHttpRequest();

        xhrItems.open("GET", "https://api.github.com/users/" + userName + array[index]);
        xhrItems.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                showData(this.response);
                index++;
                if (index < array.length) {
                    xhrItems.open("GET", "https://api.github.com/users/" + userName + array[index]);
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

        data.forEach(x => {

            let element = document.getElementById("aside");
            var z = document.createElement('p');

            

            if (searchChoice === userName + "/repos") {
                let name = x.name;
                z.innerHTML = name;
                element.appendChild(z);
            } else if (searchChoice === userName + "/followers") {
                let login = x.login;
                z.innerHTML = login;
                element.appendChild(z);
            } else if (searchChoice === userName + "/following") {
                let login1 = x.login;              
                z.innerHTML = login1;
                element.appendChild(z);
            }
            element.appendChild(z);
        });
    }
}());




