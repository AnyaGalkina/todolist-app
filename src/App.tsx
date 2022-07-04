import React, {useState} from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/Input/AddItemForm";


export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "Learn in Front End", filter: ALL},
        {id: todoListId2, title: "New skills", filter: ALL}
    ]);

    const [tasks, setTasks] = useState<TasksType>({
            [todoListId1]: [
                {id: v1(), taskTitle: "HTML&CSS", isDone: true},
                {id: v1(), taskTitle: "JS", isDone: true},
                {id: v1(), taskTitle: "React", isDone: true},
                {id: v1(), taskTitle: "Storybook", isDone: false},
                {id: v1(), taskTitle: "Git", isDone: false},
                {id: v1(), taskTitle: "Routing", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), taskTitle: "Advanced open water diving", isDone: true},
                {id: v1(), taskTitle: "Ride a car", isDone: true},
                {id: v1(), taskTitle: "Ride a motorbike", isDone: false},
            ]
        }
    );

    let [previousState, setPreviousState] = useState(tasks);

    const removeTask = (todolistId: string, taskId: string) => {
        setPreviousState(tasks);
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t: TaskType) => t.id !== taskId)});
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setPreviousState(tasks);
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)});
    }

    const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
        setPreviousState(tasks);
        debugger
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, taskTitle} : t)});
    }

    const addTask = (todolistId: string, value: string) => {
        let newTask = {id: v1(), taskTitle: value, isDone: false};
        setPreviousState(tasks);
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]});
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title}: tl))
    }

    const setPrevState = () => {
        setTasks(previousState);
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        setTasks({...tasks, [newTodolistId]: []});
        setTodolists([...todolists, {id: newTodolistId, title, filter: ALL}])
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {
                let tasksForToDoList = tasks[tl.id];
                switch (tl.filter) {
                    case ACTIVE:
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                        break
                    case COMPLETED:
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                        break
                }
                return (
                    < TodoList
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        setPrevState={setPrevState}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        filter={tl.filter}
                        changeTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
