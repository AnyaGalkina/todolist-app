import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../../state/store";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
// import {ReduxStoreProviderDecorator} from "../../../../state/ReduxStoreProviderDecorator";
import {TaskDomainType} from "./tasks-reducer";
import {ReduxStoreProviderDecorator} from '../../../../state/ReduxStoreProviderDecorator';

export default {
    title: "TODOLIST/Task component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithRedux>;

// const activeTask: TaskType = {id: "1", taskTitle: "Ride a motorbike", isDone: false};
// const completedTask = {id: "2", taskTitle: "Learn Storybook", isDone: true};
//
// const callbackRemove = action("task removed");
// export const TaskBaseExample = () => {
//     return (
//         <Provider store={store}>
//             <Task task={activeTask} todolistId={"1"}/>
//             <Task task={completedTask} todolistId={"1"}/>
//         </Provider>
//     )
// }


const TaskWithRedux = () => {
    const task = useSelector<AppRootState, TaskDomainType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todolistId={"todolistId1"}/>
}

const Template: ComponentStory<typeof TaskWithRedux> = (args) => {
    return <TaskWithRedux />
}

export const  TaskWithReduxExample = Template.bind({});