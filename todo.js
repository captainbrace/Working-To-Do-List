const userinput = document.getElementById("listitem");
const list = document.getElementById("submitted-items");
const update = document.getElementById("update");

let count =0;

function AddTask(){
    if( userinput.value ===''){
        alert('Enter input my friend')
    } else{ 
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let key = tasks.length;
        count = key;

    
        let li = document.createElement('li');
        li.setAttribute('data-key', key)
        li.innerHTML = userinput.value;
        list.appendChild( li);       
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
        
        tasks.push({ key: key, text: userinput.value });
        localStorage.setItem('tasks', JSON.stringify(tasks));        
    userinput.value ='';     
    }
    saveData(); 
}

let lastClicked= count;

list.addEventListener('click', function(ev){
    if(ev.target.tagName ==="LI"){
        ev.target.classList.toggle('done');
        lastClicked = ev.target;
        saveData()
    }
    else if(ev.target.tagName ===  "SPAN"){
        let span = ev.target;
        let li = span.parentElement;
        let key = li.getAttribute('data-key');
        
        li.remove();

         let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.key != key);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        saveData()
    }
}, false);

function saveData(){
    localStorage.setItem('data', list.innerHTML);
}

function showall(){
    list.innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
     tasks.forEach(task => {
        let li = document.createElement('li');
        li.setAttribute('data-key', task.key);
        li.innerHTML = task.text;

        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);

        list.appendChild(li);
    });
}


function EditTask() {
    // alert (lastClicked)
    if (lastClicked < 0) {
        alert("No task selected! Click a task first.");
        return;
    }

    let newText = userinput.value.trim();

    if (newText === "") {
        alert("Enter new text to update the task.");
        return;
    }

    lastClicked.firstChild.textContent = newText;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let key = lastClicked.getAttribute('data-key');
    let task = tasks.find(t => t.key == key);

    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    userinput.value = "";
    saveData();
}



/*update.addEventListener('click', EditTask());


function EditTask() {
    const key = document.getElementById("listitem")
    let li= document.createElement('textarea')
    const newText = document.querySelector("textarea")

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let task = tasks.find(t => t.key === key);

    if (task) {
        task.text = newText;

        // Update DOM
        let li = list.querySelector(`li[data-key='${key}']`);
        if (li) {
            li.firstChild.textContent = newText;
        }

        // Save updated tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));
        saveData();
    } else {
        alert("Task not found!");
    }
}
/*function editTask(){
    console.log('we tried to edit')
    let number = document.querySelector(textarea)

    let number = localStorage.getItem(count);
   /* let userData = localStorage.setItem("data", JSON.stringify(list.innerHTML));

    let retrieve = JSON.parse(localStorage.getItem("data"));
    console.log(retrieve);
}*/

//showall();

function deleteall(){
    if(confirm('Are You Sure You Want To Do This')){
        localStorage.clear();
        list.innerHTML = '' ;
    }
}