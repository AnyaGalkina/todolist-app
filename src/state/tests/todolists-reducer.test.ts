import {
    ACTIVE,
    addTodolist,
    ALL,
    changeFilter,
    removeTodolist,
    todolistsReducer,
    TodolistDomainType, getTodolists, updateTodolistTitle,
} from "../../features/Todolists/todolists-reducer";

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
    let newState = todolistsReducer(state, getTodolists.fulfilled({todolists: newTodoArr}, ""));

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("3");
    expect(newState[0].filter).toBe(ALL);
    expect(newState[0].title).toBe("New Todolist");
    expect(newState[0].order).toBe(1);
    expect(newState[0].addedDate).toBe("12.12.22");
})

test("filter should be changed to 'active'", () => {
    let newState = todolistsReducer(state, changeFilter({todolistId: "1", filter: ACTIVE}))

    expect(newState[0].filter).toBe(ACTIVE);
    expect(newState.length).toBe(2);
    expect(state[0].filter).toBe(ALL);
})

test("title should be changed", () => {
    let newState = todolistsReducer(state, updateTodolistTitle.fulfilled({todolistId: "2", title: "What to buy"}, "",{todolistId: "2", title: "What to buy"}))

    expect(newState[1].title).toBe("What to buy");
    expect(newState.length).toBe(2);
    expect(state[1].title).toBe("New skills");
})


test("new todolist should be added", () => {

    let newTodolist = {
        id: "3", title: "Movies to watch", addedDate: "", order: 0
    }
    let newState = todolistsReducer(state, addTodolist.fulfilled({todolist: newTodolist}, "", {title: "Movies to watch"}))

    expect(newState.length).toBe(3);
    expect(newState[0].title).toBe("Movies to watch");
    expect(newState[0].filter).toBe(ALL);
    expect(newState[0].id).toBeDefined();
    expect(state[2]).toBeUndefined();
    expect(state.length).toBe(2);

})

test("todolist should be removed", () => {
    let newState = todolistsReducer(state, removeTodolist.fulfilled({todolistId: "2"}, "", {todolistId: "2"}))

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("1");
    expect(state.length).toBe(2);
})