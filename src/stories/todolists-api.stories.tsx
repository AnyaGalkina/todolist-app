import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolistsAPI";

export default {
    title: "API/Todolist"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.getTodolist().then((res) => {
            setState(res.data);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        let title = "Title todolist";
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data.data.item);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "db2bce49-febb-45a6-ab53-e49649d961b7";
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "db2bce49-febb-45a6-ab53-e49649d961b7";
        let title = "CHANGED";
        todolistsAPI.updateTodolistTitle({todolistId, title})
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

