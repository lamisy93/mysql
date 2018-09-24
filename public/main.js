const app = (function app() {
    "use strict";

    var domList;
    var input;
    var item;
    var userToDelete = [];

    const doAjax = function doAjax(url, method, callback, data) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json'); // on paramètre un peu l'entête
        data = data ? JSON.stringify(data) : null;
        if (method.toLowerCase() === "post") {
            if (!data) throw new Error("bad call");
        }

        // xhr.onload = evt => {
        //     const src = evt.target || evt.srcElement;
        //     callback(src.response);
        // };

        xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
        xhr.send(data);

    } catch(err) { console.error(err); } // try catch (+ finally) important car si une erreur apparait n'empeche pas/ne stop pas l'execution du reste du code

    };

    const createUser = function createUser(e) {
         // cet event est déclenché par le submit du form
        e.preventDefault(); // on empêche FORM de reload la page (comportement par défault) car ajax asynchrone 
        const url = "http://localhost:5555/user";
        doAjax(url, "POST", res => {
            console.log("RES CREATE");
            console.log(JSON.parse(res));
        }, {
            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
        }
        );
    };

    const getUser = function getUser() {
        const url = "http://localhost:5555/user";
        doAjax(url, "GET", res => {
            console.log(JSON.parse(res));
            displayUser(JSON.parse(res));
        });
    };

    const displayUser = function displayUser(userList) {
    domList.innerHTML = "";
    userList.forEach(user => {
         let li = document.createElement("li");
         let span = document.createElement("span");

         li.className = "item-user";
       
        input = document.createElement("input");
        // ou input.type = 'checkbox';
        input.setAttribute("type", "checkbox");
        
        span.textContent = `${user.name} - ${user.lastname}`;
        li.appendChild(input);

        li.appendChild(span);
        domList.appendChild(li);

        li.setAttribute("id", `${user.id}`)
     });

    };

    const deleteUser = function deleteUser() {

        const url = "http://localhost:5555/user";
        doAjax(url, "DELETE", res => {
            console.log(JSON.parse(res));
            JSON.parse(res);
        }, ids = userToDelete);

        // if (input.type === checked) 
          item = document.querySelectorAll(".item-user");

          for (let i = 0; i < item.length; i += 1) {
            console.log(item[i])
            console.log(item[i].firstChild);

            if (item[i].firstChild.checked === true){
                item[i].id.remove();
            }
          }

    };

    const editUser = function editUser() {

        const url = "http://localhost:5555/user";
        doAjax(url, "PATCH", res => {

        }, );


    };

    const start = function () {

        document.getElementById("btn_get_user").onclick = getUser;
        domList = document.getElementById("list_user");
        document.getElementById("submit").onclick = createUser;
        document.getElementById("delete").onclick = deleteUser;
        // document.getElementById("delete").addEventListener("change", deleteUser);

    };

    window.addEventListener('DOMContentLoaded', start);

}());