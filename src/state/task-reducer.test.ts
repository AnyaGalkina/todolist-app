import {TasksType} from "../App";
import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK, TaskReducer} from "./task-reducer";
import {ADD_TODOLIST} from "./todolist-reducer";

let state: TasksType;

beforeEach(() => {

    state = {
        ["1"]: [
            {id: "4", taskTitle: "HTML&CSS", isDone: true},
            {id: "90", taskTitle: "JS", isDone: true},
            {id: "70", taskTitle: "React", isDone: true},
        ],
        ["2"]: [
            {id: "77", taskTitle: "Advanced open water diving", isDone: true},
            {id: "28", taskTitle: "Ride a motorbike", isDone: true},
        ]
    }
})


test("task should be removed", () => {
    let newState = TaskReducer(state, {type: REMOVE_TASK, payload: {todolistId: "1", taskId: "90"}});

    expect(newState["1"].length).toBe(2);
    expect(newState["1"][1].id !== "90").toBeTruthy();
    expect(state["1"][1].id !== "90").toBeFalsy();
    expect(state["1"].length).toBe(3);
    // expect(newState['2'] === state['2']).toBeFalsy();
})


test("task status should be changed to false", () => {
    let newState = TaskReducer(state, {
        type: CHANGE_TASK_STATUS,
        payload: {todolistId: "2", taskId: "28", isDone: false}
    })

    expect(newState["2"][1].isDone).toBeFalsy();
    expect(newState["2"][1].taskTitle).toBe("Ride a motorbike");
    expect(newState["2"].length).toBe(2);
    expect(state["2"][1].isDone).toBeTruthy();
    // expect(newState['1'][2] === state['1'][2]).toBeFalsy();
})


test("task title should be changed", () => {
    let newState = TaskReducer(state, {
        type: CHANGE_TASK_TITLE,
        payload: {todolistId: "1", taskId: "70", taskTitle: "NodeJS"}
    })
    expect(newState["1"][2].taskTitle).toBe("NodeJS");
    expect(newState["1"][2].isDone).toBeTruthy();
    expect(newState["1"].length).toBe(3);
    expect(state["1"][2].taskTitle).toBe("React");
})

test("task should be added", () => {
    let newState = TaskReducer(state, {
        type: ADD_TASK,
        payload: {todolistId: "2", taskTitle: "Snowboarding"}
    })
    expect(newState["2"].length).toBe(3);
    expect(newState["2"][2].taskTitle).toBe("Snowboarding");
    expect(newState["1"].length).toBe(3);
    expect(state["2"].length).toBe(2);
})

test("todolist should b e added", () => {
    let newState = TaskReducer(state, {
        type: ADD_TODOLIST,
        payload: {newTodolistId: "3"}
    })

    expect(newState["3"]).toBeDefined();
    expect(newState["3"].length).toBe(0);
    expect(newState["2"].length).toBe(2);
    expect(newState["1"].length).toBe(3);
    expect(state["3"]).toBeUndefined();

})
