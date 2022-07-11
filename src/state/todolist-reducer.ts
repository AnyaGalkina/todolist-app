import {ALL, FilterValuesType, TodolistType} from "../App";

export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const REMOVE_TODOLISTID = "REMOVE_TODOLISTID";
export const ADD_TODOLIST = "ADD_TODOLIST";
export const CHANGE_FILTER = "CHANGE_FILTER";

type ActionType = ChangeTodolistTitleType | RemoveTodolistType |  AddTodolistType | ChangeFilterType;
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
type AddTodolistType = ReturnType<typeof  addTodolistAC>;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;

export const TodolistReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
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
            return [...state,
                {id: action.payload.newTodolistId, title: action.payload.title, filter: ALL }
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