import React from 'react';
import style from '../Login.module.css';
import WarningIcon from '@mui/icons-material/Warning';

export const WarningText = () => {
    return (
        <div className={style.warningBlock}>
            <div className={style.warningText}>
                <WarningIcon fontSize="large" style={{color: 'orange', paddingRight: '10px'}}/>
                If you have some issue with log in using Safari, please follow instructions:
            </div>
            <div>
                Click the Safari menu, you will see the Preferences item - click on it. Then click the Privacy item
                to see privacy related options. You will see the Website tracking checkbox. Click on Prevent
                cross-site tracking.
            </div>
        </div>
    );
};
