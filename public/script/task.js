var dataField = document.getElementById('data-field');
var formDOM = document.getElementById('formDOM');
var xhttp = new XMLHttpRequest();

loadDoc('GET', 'http://localhost:3000/home', showData);

function loadDoc(method, url, cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(this);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function showData(xhttp) {
    var data = JSON.parse(xhttp.responseText);
    dataField.innerHTML = '';

    for (let i = 0; i < data['task'].length; i++) {
        dataField.innerHTML += `<div class="dataContainer">
                    <p class="data">${data['task'][i].Name}</p>
                    <span class="update" onclick="updatePage(${data['task'][i].id})" >Update</span>
                    <span class="delete" onclick="deleteTask(${data['task'][i].id})">Delete</span>
                    </div>`;
    }
}

function submitForm() {
    var Name = document.getElementById('query');
    var complete = document.getElementById('complete');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadDoc("Get", 'http://localhost:3000/home', showData);
        }
    };
    xhttp.open('POST', 'http://localhost:3000/home', true);
    xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhttp.send('Name=' + Name.value + '&' + 'complete=' + complete.value);
}

function deleteTask(id) {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadDoc("Get", 'http://localhost:3000/home', showData);
        }
    };
    xhttp.open('DELETE', 'http://localhost:3000/home/' + id);
    xhttp.send();
}

function updatePage(id) {
    formDOM.innerHTML = `<h1>Update Task</h1>
            <form action="" class="form" onsubmit="submitUpdateForm();return false">
                <table>
                    <tr>
                        <td>TaskId:- </td>
                        <td><label for="task_id"><input type="text" id="task_id" class="b mb" value="${id}"/></label></td>
                    </tr>
                    <tr>
                        <td>Task:- </td>
                        <td><label for="new_task"><input type="text" id="new_task" value="" class="b"></label></td>
                    </tr>
                    <tr>
                        <td><input type="hidden" id="complete" value="true" /></td>
                        <td><input type="submit" value="Submit"/></td>
                    </tr>
                </table>
            </form>
            <div id="message"><p></p></div>`;

    dataField.classList.remove('data_field');
    dataField.classList.add('btn_field');
    dataField.innerHTML = `<button onclick="backToTM()" class="btn">Back To Task Manager</button>`;

}

function submitUpdateForm() {
    var taskId = document.getElementById('task_id').value;
    var Name = document.getElementById('new_task').value;
    var complete = document.getElementById('complete').value;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('message').innerHTML = '<p>Update Successful</p>';
        }
    };
    xhttp.open('PUT', 'http://localhost:3000/home/' + taskId, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhttp.send('Name=' + Name + '&complete=' + complete);
}

function backToTM(){
    formDOM.innerHTML = `<h1>Task Manager</h1>
    <form action="" onsubmit="submitForm();return false">
        <input type="text" id="query" class="bl bt bb br_none" placeholder="Enter query"/>
        <input type="submit" value="Submit" class="bt br bb bl_none"/>
        <input type="hidden" id="complete" value="true" />
    </form>`;

    dataField.classList.remove('btn_field');
    dataField.classList.add('data_field');

    loadDoc('GET', 'http://localhost:3000/home', showData);
}