import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: "TODOLIST/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App/>

export const AppBaseExample = Template.bind({});

AppBaseExample.args = {};

