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

(function () {  

    let array = [];

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('select[name="item-select"]').onchange = obtainChoice;
    }, false);

    function obtainChoice() {

        if (document.getElementById('item-select').value === "repos") {
            searchChoice = "users/" + document.getElementById('item-name').value + "/repos";
        } else if (document.getElementById('item-select').value === "followers") {
            searchChoice = "users/" + document.getElementById('item-name').value + "/followers";
        } else if (document.getElementById('item-select').value === "following") {
            searchChoice = "users/" + document.getElementById('item-name').value + "/following";
        }

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

        data.forEach(x => {

            let element = document.getElementById("aside");
            var z = document.createElement('p');

            if (searchChoice === "users/" + input + "/repos") {
                let name = x.name;

                z.innerHTML = name;
            } else if (searchChoice === "users/" + input + "/followers") {
                let login = x.login;
                z.innerHTML = login;
            } else if (searchChoice === "users/" + input + "/following") {
                let login1 = x.login;
                
                z.innerHTML = login1;
            }
            element.appendChild(z);
        });
    }
}());

console.log(input);



