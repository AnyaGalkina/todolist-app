import {
    addTodolist,
    setTodolists,
    TodolistDomainType,
    todolistsReducer
} from "../../features/Todolists/todolists-reducer";
import {TasksType, tasksReducer} from "../../features/Todolists/Todolist/Task/tasks-reducer";


test("todolists ids should be added", () => {
    const newTodoArr = [
        {id: "3", title: "New Todolist", addedDate: "12.12.22", order: 1},
        {id: "4", title: "New Todolist", addedDate: "12.12.22", order: 1}
    ];

    const newState = tasksReducer({}, setTodolists({todolists: newTodoArr}));
    const keys = Object.keys(newState)

    expect(keys.length).toBe(2);
    expect(keys[0]).toBe("3");
    expect(newState["4"]).toStrictEqual([]);
    expect(newState["3"]).toStrictEqual([]);
})

test("ids should be equals", () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolist({
        todolist: {id: "5", title: "new todolist", addedDate: "12.12.22", order: 1}
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})