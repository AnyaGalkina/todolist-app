import React from "react";
import Img404 from "../../assets/images/6339698.jpg";
import styles from "./404.module.css";

const PageNotFound = () => {
    return (
        <div>
            {/*<div className={styles.img} style={{backgroundImage: `url(${Img404})`}}>*/}
                <h1>404: PAGE NOT FOUND</h1>
                {/*<img  className={styles.img} src={Img404}/>*/}
            {/*</div>*/}

        </div>
    );
};

export default PageNotFound;