/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";
import "../stylesheets/Loaders.css";

const JumpLoader: () => React.ReactElement = () => {

    return (
        <div className={"loader"}>
            <div className={"jump1"}></div>
            <div className={"jump2"}></div>
            <div className={"jump3"}></div>
        </div>
    );
}

const DisappearingLoader: () => React.ReactElement = () => {
    return (
        <div className={"loader"}>
            <div className={"disappear1"}></div>
            <div className={"disappear2"}></div>
            <div className={"disappear3"}></div>
        </div>
    );
}

const JumpDisappearLoader: () => React.ReactElement = () => {
    return (
        <div className={"loader"}>
            <div className={"jumpDisappear1"}></div>
            <div className={"jumpDisappear2"}></div>
            <div className={"jumpDisappear3"}></div>
        </div>
    );

}

export {JumpLoader, DisappearingLoader, JumpDisappearLoader};