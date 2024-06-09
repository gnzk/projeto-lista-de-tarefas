const button = document.querySelector('.input-button');
const input = document.querySelector('.input-task');
const list = document.querySelector('.list-tasks');

let tasks = [];

function addNewTask() {
    const taskName = input.value.trim(); // Remove espaços em branco do início e do fim

    // Verifica se o nome da tarefa não está vazio
    if (taskName !== "") {
        tasks.push({
            task: taskName,
            completed: false
        });
        input.value = '';
        renderTasks();
    } else {
        alert("Por favor, insira o nome da tarefa!");
    }
}

function renderTasks() {
    let newLi = '';

    tasks.forEach((item, index) => {
        newLi = newLi + `
            <li class="task ${item.completed && "done"}">
                <img src="./img/checked.png" alt="Tarefa concluída" onclick="taskCompleted(${index})">
                <p>${item.task}</p>
                <img src="./img/trash.png" alt="Deletar tarefa" onclick="deletarItem(${index})">
            </li>
        `;
    });

    list.innerHTML = newLi;

    localStorage.setItem('list', JSON.stringify(tasks));
}

function taskCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deletarItem(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function rechargeTasks() {
    const tasksStorage = localStorage.getItem('list');

    if (tasksStorage) {
        tasks = JSON.parse(tasksStorage);
    }

    renderTasks();
}
rechargeTasks();
button.addEventListener('click', addNewTask);