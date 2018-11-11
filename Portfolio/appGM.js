// JavaScript source code
function getPerson() {
    let loginName = document.getElementById('nombre').value;

    let user = { loginName: nombre, edad: edad };

    document.getElementById('mostrar').innerHTML = person.nombre + " " + person.edad;

    //to convert person to string
    localStorage.setItem('person', JSON.stringify(person));
}