import React, {useState} from 'react';
import './App.css';
import PrevTodoList, {TaskType} from "./components/PrevTodoList";
import {v1} from "uuid";

//useState(data) => {
// [[], () => {}]xa
// }

// CRUD
// Create +
// Read ++
// Update +
// Delete +

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function PrevApp() {

    const [tasks, setNewTask] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Storybook", isDone: false},
            {id: v1(), title: "Git", isDone: false},
            {id: v1(), title: "Routing", isDone: false},
        ],
        // [
        //     {id: v1(), title: "Advanced diving", isDone: true},
        //     {id: v1(), title: "Ride a car", isDone: true},
        //     {id: v1(), title: "Ride a motorbike", isDone: false},
        // ]
    );
    // let todolists: Array<TodolistType> = [
    //     {id: v1(), title: "What to learn in Front End", filter: "all"},
    //     {id: v1(), title: "What to learn in other spheres", filter: "completed"}
    // ]

    let [filter, setFilter] = useState<FilterValuesType>("all");
    let [previousState, setPreviousState] = useState<Array<TaskType>>(tasks);

    const removeTask = (id: string) => {
        let filteredTasks = [...tasks.filter((t: TaskType) => t.id !== id)];
        debugger
        setPreviousState(tasks);
        setNewTask(filteredTasks);
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setNewTask(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const addTask = (value: string) => {
        let newTask = {id: v1(), title: value, isDone: false};
        let newTasks = [...tasks, newTask];
        debugger
        setPreviousState(tasks);
        setNewTask(newTasks);
    }

    const setPrevState = () => {
        debugger
        console.log('you are here');
        setNewTask(previousState);
    }

    let tasksForToDoList = tasks;
    switch (filter) {
        case "active":
            tasksForToDoList = tasks.filter(t => t.isDone === false)
            break
        case "completed":
            tasksForToDoList = tasks.filter(t => t.isDone === true)
            break
        // case "all":
        //     tasksForToDoList = tasks
        //     break
    }

    // filter === 'active' ? tasksForToDoList = tasks.filter(t => t.isDone === false) :
    //     filter === 'completed' ?
    //         tasksForToDoList = tasks.filter(t => t.isDone === true) :
    //         tasksForToDoList = tasks;

    const changeFilter = (value: FilterValuesType) => {
        // let tasksForToDoList = tasks;
        // switch (value) {
        //     case "active":
        //
        //         setFilter(tasks.filter(t => t.isDone === false))
        //         break
        //     case "completed":
        //
        //         tasksForToDoList = tasks.filter(t => t.isDone === true)
        //         break
        //     // case "all":
        //     //     tasksForToDoList = tasks
        //     //     break
        // }
        setFilter(value);
    }

    return (
        <div className="App">

            < PrevTodoList
                title={"What to learn"}
                tasks={tasksForToDoList}
                changeFilter={changeFilter}
                removeTask={removeTask}
                addTask={addTask}
                setPrevState={setPrevState}
                changeTaskStatus={changeTaskStatus}
                filter={filter}/>
        </div>
    );
}

export default PrevApp;
