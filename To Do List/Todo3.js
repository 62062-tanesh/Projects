

const Input_Text = document.getElementById('Input-Text');
const listContainer = document.getElementById('listContainer');

function addTask(){
    if(Input_Text.value === ''){
        alert('First Enter Your Task');
    }

    else{
        let li  = document.createElement("li");
        li.innerHTML = Input_Text.value;
        listContainer.appendChild(li)

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
}
