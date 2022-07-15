import {
    // ALL,
    FilterValuesType} from "../App";
import {v1} from "uuid";

type ActionType = ChangeTodolistTitleType | RemoveTodolistType |  AddTodolistType | ChangeFilterType;
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof  addTodolistAC>;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType
}


export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const REMOVE_TODOLISTID = "REMOVE_TODOLISTID";
export const ADD_TODOLIST = "ADD_TODOLIST";
export const CHANGE_FILTER = "CHANGE_FILTER";

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";


export const todoListId1 = v1();
export const todoListId2 = v1();


const initialState: Array<TodolistType>  = [
    {id: todoListId1, title: "Learn in Front End", filter: ALL},
    {id: todoListId2, title: "New skills", filter: ALL}
]

export const TodolistsReducer = (state: Array<TodolistType> =  initialState, action: ActionType): Array<TodolistType> => {
    debugger
    switch (action.type) {
        case CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.payload.todolistId
                    ? {...t, title: action.payload.title}
                    : t);
        case CHANGE_FILTER:
            return state.map( t => t.id === action.payload.todolistId
            ? {...t, filter: action.payload.filter}
            : t
            );
        case REMOVE_TODOLISTID:
            return state.filter(t => t.id !== action.payload.todolistId);
        case ADD_TODOLIST:
            return [
                {id: action.payload.newTodolistId, title: action.payload.title, filter: ALL },
                ...state
            ];
        default:
            return state;
    }
}


export const changeTodolistTitleAC = (todolistId: string,  title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        payload: {
            todolistId,
            title
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: REMOVE_TODOLISTID,
        payload: {
            todolistId
        }
    }as const
}

export const addTodolistAC = ( newTodolistId: string, title: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTodolistId,
            title
        }
    } as const
}

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            todolistId,
            filter
        }
    } as const
}