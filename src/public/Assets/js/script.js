const taskBtn = document.getElementById("task-btn");
const results = document.getElementById("results");
const input = document.getElementById("task-input");
const taskContainer = document.getElementById("task-container");
const taskCounter = document.getElementById("task-count");

// updates the count of the tasks

const addCount = () => taskCounter.textContent = parseInt(taskCounter.innerText) + 1;
const minusCount = () => taskCounter.textContent = parseInt(taskCounter.innerText) - 1;

/**
 * 
 * @param {DOM_element} eventTrigger: The DOM element that triggered the event. There are
 * two dom elements that can do this ie. the (add) button and (delete) button 
 * @returns a higher order function that returns the updated count this
 * is done by either adding or subtracting the count
 */
const updateCount = (eventTrigger) => eventTrigger === taskBtn? addCount() : minusCount();




const deleteTask = (e) => {
    const delBtn = e.target;
    delBtn.parentElement.remove();
    const eventTrigger = delBtn;const taskForm = document.querySelector('form');
    updateCount(eventTrigger);
};

const addTask = (task, eventTrigger) => {
    const li = document.createElement("li");
    li.className = "border task-item";
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn bi bi-trash";
    deleteBtn.setAttribute("title", "Delete Task"); // Adding a title attribute for tooltip
    deleteBtn.addEventListener("click", deleteTask);

    li.appendChild(deleteBtn);
    taskContainer.appendChild(li);
    updateCount(eventTrigger)
};

const handleTask = (e) => {
    e.preventDefault();
    results.classList.toggle("results");
    const isEmpty = input.value.trim() === "";
    if (isEmpty) {
        return;
    } else {
        const taskName = input.value;
        const eventTrigger = e.target
        addTask(taskName, eventTrigger);
        input.value = "";
    }
};

taskBtn.addEventListener("click", handleTask);

const taskForm = document.querySelector('form');

// Function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(taskForm); // Get form data

    try {
        const response = await fetch('/tasks', { // Replace '/submit-url' with your server endpoint
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            // Handle successful response (e.g., update UI)
        } else {
            // Handle error response
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Add event listener to form submit event
taskForm.addEventListener('submit', handleFormSubmit);
