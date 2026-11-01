const inputBox = document.getElementById('TextBox');
const listContainer = document.getElementById('ListContainer');

function AddTask (){
    if (inputBox.value === ''){
        alert ("Enter Something First")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement(span);
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
}
