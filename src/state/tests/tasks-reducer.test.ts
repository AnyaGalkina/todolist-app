import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer, TasksType, updateTaskAC
} from "../tasks-reducer";

import {addTodolistAC, ALL, removeTodolistAC, todoListId2} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

let state: TasksType;

beforeEach(() => {

    state = {
        ["1"]: [
            {
                id: "3", title: "HTML&CSS",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "1",
                entityStatus: "idle"
            },
            {
                id: "4", title: "JS",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "1",
                entityStatus: "idle"
            },
            {
                id: "5", title: "React",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "1",
                entityStatus: "idle"
            },
        ],
        ["2"]: [
            {
                id: "3", title: "Advanced open water diving",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "2",
                entityStatus: "idle"
            },
            {
                id: "4", title: "Ride a motorbike",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "2",
                entityStatus: "idle"
            },
            {
                id: "5", title: "Ride a car",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "2",
                entityStatus: "idle"
            },
        ]
    }
})

test("tasks should be updated for exact todolist id", () => {
    let newTasksArr = [{
        id: "6", title: "Move to other country",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        todoListId: "2"
    }]

    let newState = tasksReducer(state, setTasksAC("2", newTasksArr))

    expect(newState["2"].length).toBe(1);
    expect(newState["2"][0].id).toBe("6");
    expect(newState["2"][0].title).toBe("Move to other country");
})

test("task should be removed from correct array", () => {
    let newState = tasksReducer(state, removeTaskAC("1", "4"))

    expect(newState["1"].length).toBe(2);
    expect(newState["2"].length).toBe(3);
    expect(newState["1"].every(t => t.id !== "4")).toBeTruthy();
    expect(state["1"].every(t => t.id !== "4")).toBeFalsy();
    expect(state["1"].length).toBe(3);
})


test("task status should be changed to Completed", () => {
    let newTask =       {
        id: "4", title: "Ride a motorbike",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        todoListId: "2"
    }
    let newState = tasksReducer(state, updateTaskAC("2", "4",  newTask))

    expect(newState["2"][1].status).toBe(TaskStatuses.Completed);
    expect(newState["1"][1].status).toBe(TaskStatuses.New);
})


test("task title should be changed", () => {

    let newTask = {
        id: "5", title: "NodeJS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        todoListId: "2"
    };

    let newState = tasksReducer(state, updateTaskAC("1", "5", newTask))

    expect(newState["1"][2].title).toBe("NodeJS");
    expect(newState["2"][2].title).toBe("Ride a car");
    expect(state["1"][2].title).toBe("React");
})

test("task should be added", () => {
    let newTask = {
        id: "6", title: "New Task",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        todoListId: "2"
    }

    let newState = tasksReducer(state, addTaskAC("2", newTask))

    expect(newState["2"].length).toBe(4);
    expect(newState["2"][3].id).toBeDefined();
    expect(newState["2"][0].title).toBe("New Task");
    expect(newState["2"][0].todoListId).toBe("2");
    expect(newState["2"][0].status).toBe(TaskStatuses.New);
    expect(newState["2"][0].priority).toBe(TaskPriorities.Middle);
    expect(newState["1"].length).toBe(3);
    expect(state["2"].length).toBe(3);
})

test("todolist should be added", () => {
    let newState = tasksReducer(state, addTodolistAC({id: "10", title: "Some new TodoList", addedDate: "", order: 0},))

    const keys = Object.keys(newState);
    const newKey = keys.find(k => k !== "1" && k !== "2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(newState[newKey]).toEqual([]);
    expect(newState[newKey]).toBeDefined();
    expect(newState[newKey].length).toBe(0);
    expect(newState["2"].length).toBe(3);
    expect(newState["1"].length).toBe(3);
    expect(state[newKey]).toBeUndefined();

})


test("todolist should be removed", () => {
    let newState = tasksReducer(state, removeTodolistAC("1"))

    const keys = Object.keys(newState);

    expect(newState["1"]).toBeUndefined();
    expect(keys.length).toBe(1);
    expect(newState["2"]).toBeDefined();
    expect(state["1"]).toBeDefined();
})