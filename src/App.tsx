import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import AddItemForm from "./components/Input/AddItemForm";
import Header from "./components/Header/Header";
import Container from "@mui/material/Container";
import {Grid, Paper} from "@mui/material";
import {TasksType,} from "./state/tasks-reducer";
import {ACTIVE, addTodolistAC, changeFilterAC, COMPLETED, TodolistType,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";


function App() {
    debugger
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    // let [previousState, setPreviousState] = useState(tasks);

    // const removeTask = (todolistId: string, taskId: string) => {
    //     // setPreviousState(tasks);
    //     dispatch(removeTaskAC(todolistId, taskId));
    // }

    // const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    //     // setPreviousState(tasks);
    //     dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    // }
    //
    // const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
    //     // setPreviousState(tasks);
    //     dispatch(changeTaskTitleAC(todolistId, taskId, taskTitle));
    // }

    // const addTask = (todolistId: string, taskTitle: string) => {
    //     // setPreviousState(tasks);
    //     dispatch(addTaskAC(todolistId, taskTitle));
    // }

    // const removeTodolist = (todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId));
    // }

    // const changeTodolistTitle = (todolistID: string, title: string) => {
    //     dispatch(changeTodolistTitleAC(todolistID, title));
    // }

    const setPrevState = () => {
        // setTasks(previousState);
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, filter));
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl: TodolistType) => {
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
                            <Grid item>
                                <Paper style={{padding: "20px", width: "300px"}}>
                                    <TodoList
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDoList}
                                        changeFilter={changeFilter}
                                        // removeTask={removeTask}
                                        // addTask={addTask}
                                        // setPrevState={setPrevState}
                                        // changeTaskStatus={changeTaskStatus}
                                        // removeTodolist={removeTodolist}
                                        filter={tl.filter}
                                        // changeTitle={changeTaskTitle}
                                        // changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
