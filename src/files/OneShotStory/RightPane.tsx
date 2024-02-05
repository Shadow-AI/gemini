/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";

const ThemeSwitcher: () => React.ReactElement = () => {
    return (<>
        <div className={"themeSwitch"}>
            <button className={"btn btn-secondary"}>Switch Theme</button>
        </div>
    </>);
}

const StoryImage: () => React.ReactElement = () => {
    return (<>
        <div className={"card storyImage"}>
            <img src={"https://via.placeholder.com/150"} alt={"story image"}/>
        </div>
        <div className={""}>
            <h2>Title</h2>
        </div>
    </>);
}

const WorldInfo: () => React.ReactElement = () => {
    return (<>
        <div className={"worldInfo"}>
            <textarea rows={7} cols={80} className={"form-control"} placeholder={"World Info"}/>
        </div>
    </>);
}

const RightPane: () => React.ReactElement = () => {
    return (<div id={"rightpane-collapse"}>
        <div id={"RightPane"} className={"d-flex flex-column align-items-center"}>
            <ThemeSwitcher/>
            <StoryImage/>
            <WorldInfo/>
        </div>
    </div>);
}

export default RightPane;