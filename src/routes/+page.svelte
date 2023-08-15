<script>
    import { getTasks, addTaskToDatabase, delTask } from "$lib/firebase";
    import { onMount } from "svelte";
    import { updateTask } from "$lib/firebase";
    let tasks = [];
    let newTask = "";

    function addTask() {
        let taskObj = {
            name: newTask,
            finished: false,
        };
        // add to firebase
        addTaskToDatabase(taskObj);
        tasks = [...tasks, taskObj];
        newTask = "";
    }
    function onKeydown(event) {
        if (event.key == "Enter") {
            addTask();
        }
    }
    onMount(async () => {
        tasks = await getTasks();
    });
    function clickTask(task) {
        console.log("click Task", task);
        if (task.finished == true) {
            task.finished = false;
            updateTask(task);
        } else if (task.finished == false) {
            task.finished = true;
            updateTask(task);
        }
    }
</script>

<input on:keydown={onKeydown} placeholder="Task name" bind:value={newTask} />

<button on:click={addTask}>add task</button>

<ul>
    {#each tasks as task}
        <li>
            <label for={task.name}>{task.name}</label>
            <input
                type="checkbox"
                id={task.name}
                bind:checked={task.finished}
                on:click|stopPropagation={clickTask(task)}
            />
            <span style="cursor:pointer" on:click={delTask(task)}>x</span>
        </li>
    {/each}
</ul>

<pre>{JSON.stringify({ tasks, newTask }, null, 4)}</pre>

<style>
</style>
