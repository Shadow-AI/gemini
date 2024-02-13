/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";
import {Title} from "./OneShotStory";

/**
 * switch the themed css styles, also need to design the switch button.
 * @constructor
 */
const ThemeSwitcher: () => React.ReactElement = () => {
    return (<>
        <div className={"themeSwitch"}>
            <button className={"btn btn-secondary"}>Switch Theme</button>
        </div>
    </>);
}

/**
 * Image for the story, need to link with together.ai perhaps.
 * @constructor
 */
const StoryImage: () => React.ReactElement = () => {
    return (<>
        <div className={"card storyImage"}>
            <img src={"https://via.placeholder.com/150"} alt={"story"}/>
        </div>
    </>);
}

/**
 * World Info section to supply the model with background world context for generation.
 * @param props.WorldInfoStuff - WI and it's associated state setter. OneShotStory -> RightPane -> WorldInfo
 * @constructor
 */
const WorldInfo: (props: {
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => React.ReactElement = (props: {
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {

    // handler function on keypress, update the values.
    const updateWI: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
        = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        props.worldInfoStuff[1](e.currentTarget.value);
    }
    return (<>
        <div className={"worldInfo"}>
            <textarea
                rows={10}
                cols={80}
                className={"form-control"}
                placeholder={"World Info"}
                value={props.worldInfoStuff[0]}
                onChange={updateWI}/>
        </div>
    </>);
}

/**
 * beings everything together. Title, ThemeSwitcher, StoryImage, WorldInfo.
 * @param props.title - title of the story
 * @param props.worldInfoStuff - WI, and it's associated state setter. OneShotStory -> RightPane
 * @constructor
 */
const RightPane: (props: {
    title: string,
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => React.ReactElement = (props: {
    title: string,
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {
    return (<div id={"rightpane-collapse"}>
        <div id={"RightPane"} className={"d-flex flex-column align-items-center"}>
            <ThemeSwitcher/>
            <StoryImage/>
            <Title title={props.title} classes={"text-center"}/>
            <WorldInfo worldInfoStuff={props.worldInfoStuff}/>
        </div>
    </div>);
}

export default RightPane;