import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolistsAPI";

export default {
    title: "API/Tasks"
}

let todolistId = "67328f87-da7a-4a07-be43-a9a9a7c5c6b7";
const taskId = "430b8cd4-775f-46cd-994a-e7c37867a974";
let task = {
    title: "Myau myau",
    description: "Bark bark",
    completed: true,
    status: 0,
    priority: 2,
    startDate: "",
    deadline: "",
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data.items);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        let title = "TASK Title";
        todolistsAPI.createTask({todolistId, title})
            .then((res) => {
                setState(res.data.data.item);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const taskId = "c898942f-e35c-43aa-8b04-69b336962266";
        todolistsAPI.deleteTask({todolistId, taskId})
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.updateTask({todolistId, taskId, task})
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

