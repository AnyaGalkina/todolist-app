import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksReducer, TasksType
} from "./tasks-reducer";

import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let state: TasksType;

beforeEach(() => {

    state = {
        ["1"]: [
            {id: "3", taskTitle: "HTML&CSS", isDone: true},
            {id: "4", taskTitle: "JS", isDone: true},
            {id: "5", taskTitle: "React", isDone: true},
        ],
        ["2"]: [
            {id: "3", taskTitle: "Advanced open water diving", isDone: true},
            {id: "4", taskTitle: "Ride a motorbike", isDone: true},
            {id: "5", taskTitle: "Ride a car", isDone: true},
        ]
    }
})


test("task should be removed from correct array", () => {
    let newState = TasksReducer(state, removeTaskAC("1", "4"))

    expect(newState["1"].length).toBe(2);
    expect(newState["2"].length).toBe(3);
    expect(newState["1"].every(t => t.id !== "4")).toBeTruthy();
    expect(state["1"].every(t => t.id !== "4")).toBeFalsy();
    expect(state["1"].length).toBe(3);
})


test("task status should be changed to false", () => {
    let newState = TasksReducer(state, changeTaskStatusAC("2", "4", false))


    expect(newState["2"][1].isDone).toBeFalsy();
    expect(newState["1"][1].isDone).toBeTruthy();
    // expect(newState["2"][1].taskTitle).toBe("Ride a motorbike");
    expect(state["2"][1].isDone).toBeTruthy();
})


test("task title should be changed", () => {
    let newState = TasksReducer(state, changeTaskTitleAC("1", "5", "NodeJS"))

    expect(newState["1"][2].taskTitle).toBe("NodeJS");
    expect(newState["2"][2].taskTitle).toBe(  "Ride a car");
    expect(state["1"][2].taskTitle).toBe("React");
})

test("task should be added", () => {
    let newState = TasksReducer(state, addTaskAC("2", "Snowboarding"))

    expect(newState["2"].length).toBe(4);
    expect(newState["2"][3].id).toBeDefined();
    expect(newState["2"][0].taskTitle).toBe("Snowboarding");
    expect(newState["2"][0].isDone).toBe(false);
    expect(newState["1"].length).toBe(3);
    expect(state["2"].length).toBe(3);
})

test("todolist should be added", () => {
    let newState = TasksReducer(state, addTodolistAC("3", "some title"))

    expect(newState["3"]).toBeDefined();
    expect(newState["3"].length).toBe(0);
    expect(newState["2"].length).toBe(3);
    expect(newState["1"].length).toBe(3);
    expect(state["3"]).toBeUndefined();

})


test("todolist should be removed", () => {
    let newState = TasksReducer(state, removeTodolistAC("1"))

    const keys = Object.keys(newState);

    expect(newState["1"]).toBeUndefined();
    expect(keys.length).toBe(1);
    expect(newState["2"]).toBeDefined();
    expect(state["1"]).toBeDefined();
})