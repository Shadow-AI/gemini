/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from 'react';
import RightPane from "./RightPane";
import CentrePane from "./CentrePane";
import "./OneShot.css";

const OneShot: () => React.ReactElement = ( )=>{
    return(
        <>
            <div className={"OneShotApp container-fluid"}>
                <div className={"row"}>
                    <div className={"col-3"}></div>
                    <div className={"col"}>
                        <CentrePane/>
                    </div>
                    {/*col-0 means collapsed by default*/}
                    <div className={"col-0"}>
                        <RightPane/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OneShot;