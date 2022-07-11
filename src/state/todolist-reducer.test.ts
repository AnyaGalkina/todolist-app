import {ACTIVE, ALL, TodolistType} from "../App";
import {
    ADD_TODOLIST,
    CHANGE_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLISTID,
    TodolistReducer
} from "./todolist-reducer";

let state:  Array<TodolistType>
beforeEach(() => {
    state= [
        {id: "1", title: "Learn in Front End", filter: ALL},
        {id: "2", title: "New skills", filter: ALL}
    ]
});

test("filter should be changed to 'active'", () => {
    let newState = TodolistReducer(state,{type: CHANGE_FILTER, payload: {todolistId: "1", filter: ACTIVE}})

    expect(newState[0].filter).toBe(ACTIVE);
    expect(newState.length).toBe(2);
    expect(state[0].filter).toBe(ALL);
})

test("title should be changed", () => {
    let newState = TodolistReducer(state,{type: CHANGE_TODOLIST_TITLE, payload: {todolistId: "2",title: "What to buy"}})

    expect(newState[1].title).toBe("What to buy");
    expect(newState.length).toBe(2);
    expect(state[1].title).toBe("New skills");
})


test("new todolist should be added", () => {
    let newState = TodolistReducer(state, {type: ADD_TODOLIST, payload: {newTodolistId:"3", title:"Movies to watch"}})

    expect(newState.length).toBe(3);
    expect(newState[2].title).toBe("Movies to watch");
    expect(newState[2].filter).toBe(ALL);
    expect(newState[2]).toBeDefined();
    expect(state[2]).toBeUndefined();
    expect(state.length).toBe(2);

})


test("todolist should be removed", () => {
    let newState = TodolistReducer(state, {type: REMOVE_TODOLISTID, payload: {todolistId: "2"}})

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("1");
    expect(state.length).toBe(2);
})