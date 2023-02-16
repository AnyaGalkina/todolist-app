import React from 'react';
import style from '../Login.module.css';

type PropsType = {
    touched: boolean | undefined;
    errors: string | undefined;
}

export const ErrorInfo = ({touched, errors}: PropsType) => {
    return (
        <div>
            {touched && errors &&
                <div className={style.error}>{errors}</div>}
        </div>
    );
};
