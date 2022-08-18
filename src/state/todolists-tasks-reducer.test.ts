import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksType,tasksReducer} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistId)
    expect(idFromTodolists).toBe(action.payload.newTodolistId)
})