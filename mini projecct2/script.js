const API = "/tasks";

let currentFilter = "all";


// LOAD TASKS

async function loadTasks() {

    const res = await fetch(API);

    const tasks = await res.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){
        filteredTasks =
        tasks.filter(t => !t.completed);
    }

    if(currentFilter === "completed"){
        filteredTasks =
        tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {

        const li =
        document.createElement("li");

        li.innerHTML = `
            <span class="${
                task.completed ? "completed" : ""
            }">
                ${task.title}
            </span>

            <div>

                <button
                onclick="toggleTask('${task._id}')">

                    ${
                        task.completed
                        ? "Undo"
                        : "Done"
                    }

                </button>

                <button
                onclick="deleteTask('${task._id}')">

                    Delete

                </button>

            </div>
        `;

        list.appendChild(li);
    });
}


// ADD TASK

async function addTask() {

    const input =
    document.getElementById("taskInput");

    const title = input.value.trim();

    if(!title) return;

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title
        })
    });

    input.value = "";

    loadTasks();
}


// TOGGLE STATUS

async function toggleTask(id){

    await fetch(`${API}/${id}`,{
        method:"PUT"
    });

    loadTasks();
}


// DELETE TASK

async function deleteTask(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadTasks();
}


// DELETE COMPLETED

async function deleteCompleted(){

    await fetch(
        `${API}/completed/all`,
        {
            method:"DELETE"
        }
    );

    loadTasks();
}


// FILTER

function filterTasks(type){

    currentFilter = type;

    loadTasks();
}

loadTasks();