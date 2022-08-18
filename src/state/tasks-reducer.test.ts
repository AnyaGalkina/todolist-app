import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer, TasksType
} from "./tasks-reducer";

import {addTodolistAC, removeTodolistAC, todoListId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";

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
                todoListId: "1"
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
                todoListId: "1"
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
                todoListId: "1"
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
                todoListId: "2"
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
                todoListId: "2"
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
                todoListId: "2"
            },
        ]
    }
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
    let newState = tasksReducer(state, changeTaskStatusAC("2", "4", TaskStatuses.Completed))


    expect(newState["2"][1].status).toBe( TaskStatuses.Completed);
    expect(newState["1"][1].status).toBe(TaskStatuses.New);
    // expect(newState["2"][1].taskTitle).toBe("Ride a motorbike");
    // expect(state["2"][1].status).toBe();
})


test("task title should be changed", () => {
    let newState = tasksReducer(state, changeTaskTitleAC("1", "5", "NodeJS"))

    expect(newState["1"][2].title).toBe("NodeJS");
    expect(newState["2"][2].title).toBe("Ride a car");
    expect(state["1"][2].title).toBe("React");
})

test("task should be added", () => {
    let newState = tasksReducer(state, addTaskAC("2", "Snowboarding"))

    expect(newState["2"].length).toBe(4);
    expect(newState["2"][3].id).toBeDefined();
    expect(newState["2"][0].title).toBe("Snowboarding");
    expect(newState["2"][0].status).toBe(TaskStatuses.New);
    expect(newState["2"][0].priority).toBe(TaskPriorities.Middle);
    expect(newState["1"].length).toBe(3);
    expect(state["2"].length).toBe(3);
})

test("todolist should be added", () => {
    let newState = tasksReducer(state, addTodolistAC("some title"))

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