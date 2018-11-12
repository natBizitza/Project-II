// JavaScript source code
let searchName;
let searchChoice;
//SearchName
(function () {

    let startBtn = document.getElementById('btnName');

    if (startBtn !== null) {
        startBtn.addEventListener("click", obtainData);
    }

    let array = [];

    function obtainData() {

        searchName = "search/users?q=";

        let input = document.getElementById('item-name').value;

        array.push(input);

        pedirItems(array);
        //document.getElementById('item-name').value = ""; // to empty search field
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
        document.getElementById("info").innerHTML = "";

        data['items'].forEach(x => {


            let element = document.getElementById("info");
            let z = document.createElement('p');

            let login = x.login;

            z.innerHTML = login;

            //to show user's name
            element.appendChild(z);

            //display avatar
            //let image = '<img id="image" width="200vw" margin="1em" border-radius="6px" src="' + x['avatar_url'] + '" />';
            let image = document.createElement("img");
            image.setAttribute("id", "image");
            image.setAttribute("width", "200vw");
            image.setAttribute("src", x['avatar_url']);

            //let icon = '<img id="heart" class="'+x.login+'"src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/heavy-black-heart_2764.png" alt="Red Heart on Twitter Twemoji 11.2" width="35vw"/>';
            let icon = document.createElement("img");
            icon.setAttribute("class", login);
            icon.setAttribute("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/heavy-black-heart_2764.png")
            icon.setAttribute("width", "35vw");


            //document.getElementById('info').innerHTML += image + icon;
            document.getElementById('info').appendChild(image);
            document.getElementById('info').appendChild(icon);

            

            //icon.addEventListener("click", addFeatured(login));
            icon.addEventListener("click", function () {
                let users = JSON.parse(localStorage.getItem("users"));
                if (users === null) {
                    users = [];
                }
                let user = { loginName: login };
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
            })

        });
    }
}());

let savedInfo = JSON.parse(localStorage.getItem('users'));

if (savedInfo !== null && document.getElementById('fUser') !== null) {

    let element = document.getElementById("info");

    savedInfo.forEach( user => {
        let z = document.createElement('p');
        z.innerHTML = user.loginName;
        element.appendChild(z);
    });
    

} else {
    console.log("The button doesn't exist on the page.");
}

//searchOption

(function () {  

    let array = [];

    let select = document.querySelector('select[name="item-select"]');
    if (select !== null) {
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('select[name="item-select"]').onchange = obtainChoice;
        }, false);
    }

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
                showData(this.response, userName);
                index++;
                if (index < array.length) {
                    xhrItems.open("GET", "https://api.github.com/users/" + userName + array[index]);
                    xhrItems.send();
                }
            }
        };
        xhrItems.send();
    }

    function showData(response,userName) {
        let json = response; 

        //to extract the text we can use later
        let data = JSON.parse(json);
        console.log(data);

        data.forEach(x => {

            let element = document.getElementById("aside");
            var z = document.createElement('p');

            let repos =  "/repos";

            function r() {
                let name = x.name;
                z.innerHTML = name;
                element.appendChild(z);
            }

            let followers = "/followers";
            let following = "/following";

            function f() {
                let login = x.login;
                z.innerHTML = login;
                element.appendChild(z);
            }
            
            switch (searchChoice) {
                case repos:
                    r();
                    break;
                case followers:
                    f();
                    break;
                case following:
                    f();
                    break;
            }
        });
    }
}());





