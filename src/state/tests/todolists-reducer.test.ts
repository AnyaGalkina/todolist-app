import {
    ACTIVE,
    addTodolistAC, ALL, changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC, todolistsReducer, TodolistDomainType, setTodolists
} from "../todolists-reducer";

let state: Array<TodolistDomainType>
beforeEach(() => {
    state = [
        {id: "1", title: "Learn in Front End", filter: ALL, addedDate: "", order: 0, entityStatus: "idle"},
        {id: "2", title: "New skills", filter: ALL, addedDate: "", order: 0, entityStatus: "idle"}
    ]
});

test("todolist array should be set to state", () => {
    let newTodoArr = [
        {id: "3", title: "New Todolist", addedDate: "12.12.22", order: 1}
    ]
    let newState = todolistsReducer(state, setTodolists(newTodoArr));

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("3");
    expect(newState[0].filter).toBe(ALL);
    expect(newState[0].title).toBe("New Todolist");
    expect(newState[0].order).toBe(1);
    expect(newState[0].addedDate).toBe("12.12.22");
})

test("filter should be changed to 'active'", () => {
    let newState = todolistsReducer(state, changeFilterAC("1", ACTIVE))

    expect(newState[0].filter).toBe(ACTIVE);
    expect(newState.length).toBe(2);
    expect(state[0].filter).toBe(ALL);
})

test("title should be changed", () => {
    let newState = todolistsReducer(state, changeTodolistTitleAC("2", "What to buy"))

    expect(newState[1].title).toBe("What to buy");
    expect(newState.length).toBe(2);
    expect(state[1].title).toBe("New skills");
})


test("new todolist should be added", () => {

    let newTodolist = {
        id: "3", title: "Movies to watch", addedDate: "", order: 0
    }
    let newState = todolistsReducer(state, addTodolistAC(newTodolist))

    expect(newState.length).toBe(3);
    expect(newState[0].title).toBe("Movies to watch");
    expect(newState[0].filter).toBe(ALL);
    expect(newState[0].id).toBeDefined();
    expect(state[2]).toBeUndefined();
    expect(state.length).toBe(2);

})

test("todolist should be removed", () => {
    let newState = todolistsReducer(state, removeTodolistAC("2"))

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("1");
    expect(state.length).toBe(2);
})