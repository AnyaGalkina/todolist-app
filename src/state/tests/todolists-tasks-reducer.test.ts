import {addTodolistAC, setTodolists, TodolistDomainType, todolistsReducer} from "../todolists-reducer";
import {TasksType, tasksReducer} from "../tasks-reducer";


test("todolists ids should be added", () => {
    const newTodoArr = [
        {id: "3", title: "New Todolist", addedDate: "12.12.22", order: 1},
        {id: "4", title: "New Todolist", addedDate: "12.12.22", order: 1}
    ];
    const newState = tasksReducer({}, setTodolists(newTodoArr));
    const keys = Object.keys(newState)

    expect(keys.length).toBe(2);
    expect(keys[0]).toBe("3");
    // expect(newTodoArr['4']).toStrictEqual([]);
    expect(newTodoArr['3']).toStrictEqual([]);
})

test("ids should be equals", () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistId)
    expect(idFromTodolists).toBe(action.payload.newTodolistId)
})