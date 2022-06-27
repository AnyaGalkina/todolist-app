import React from 'react';
type PropsType = {
    title: string;
    className?: string;
    disabled?: boolean;
    onClikCallback: () => void;
}

const Button: React.FC<PropsType> = (props) => {

    let onClickHandler = () => props.onClikCallback();

    return (
            <button className={props.className ? props.className : '' }
                    disabled={props.disabled}
                    onClick={onClickHandler}
            >{props.title}</button>
    );
};

export default Button;