import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {EditableSpanTitle} from "./EditableSpanTitle";

export default {
    title: "TODOLIST/EditableSpan",
    component: EditableSpanTitle,
    args: {
        addItem: action( "Button 'add' was pressed")
    }
} as ComponentMeta<typeof EditableSpanTitle>;


const Template: ComponentStory<typeof EditableSpanTitle> = (args) => <EditableSpanTitle {...args}/>

export const EditableSpanTitleBaseExample = Template.bind({});

EditableSpanTitleBaseExample .args = {
    title: "Come on! edit this text! ;)",
    onChangeTitle: action("Title changed")
};


