/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";
import {Title} from "./OneShotStory";

/**
 * Intended for implementation of a search functionality, however, not implemented yet.
 * @constructor
 */
const Search: () => React.ReactElement = () => {
    return (<>

    </>);
}

/**
 * Single card item for each story. Not implemented.
 * @constructor
 */
const StoryItem: () => React.ReactElement = () => {
    return (
        <div className={"storyItem"}>
            <div className={"card flex-row align-items-start justify-content-start"}>
                <div className={"card-image"}>
                    {/*different from card-img*/}
                    <img src={"https://via.placeholder.com/50"} alt={"story"}/>
                </div>
                <div className={"card-body"}>
                    <p className={"card-title"}>Title</p>
                </div>
            </div>
        </div>);
}

/**
 * Bring all individual components together to form the left pane.
 * @constructor
 */
const LeftPane: () => React.ReactElement = () => {
    return (<>
        <div id={"LeftPane"} className={"container"}>
            <Title title={"Stories"} classes={""}/>
            <Search/>
            <StoryItem/>
            <StoryItem/>
        </div>
    </>);
}

export default LeftPane;