/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";

const Collapser: () => React.ReactElement = () => {
    return (<>
        <div className={"collapseButton"}>
            <button className={"btn btn-secondary"} data-bs-toggle={"collapse"} data-bs-target={"#rightpane-collapse"}
                    aria-expanded={true}>
                <FontAwesomeIcon icon={faBars}/>
                <FontAwesomeIcon icon={faClose}/>
            </button>
        </div>
    </>);
}

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
    return (<div id={"RightPane"}>
        <Collapser/>
        <div id={"rightpane-collapse"} className={"d-flex flex-column align-items-center collapse"}>

            <ThemeSwitcher/>
            <StoryImage/>
            <WorldInfo/>
        </div>
    </div>);
}

export default RightPane;