/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React, {useState} from 'react';
import RightPane from "./RightPane";
import CentrePane from "./CentrePane";
import "./OneShot.css";
import LeftPane from "./LeftPane";

/**
 * The title component, employed across multiple panes to display title text. Both for the story title and the title for navigation pane.
 * @param props.title the title text
 * @param props.classes any supplementary classes to be styled with.
 * @constructor
 */
const Title: (props: {
    title: string,
    classes: string
}) => React.ReactElement = (props: {
    title: string,
    classes: string
}) => {
    return (
        <div>
            <h2 className={`card-title ${props.classes}`}>{props.title}</h2>
        </div>
    );
}

/**
 * The main component for the OneShotStory app. It is the parent component for the entire app.
 * @constructor
 */
const OneShot: () => React.ReactElement = () => {
    // define the states that are going to be drilled down to child components to enable cross functionality.
    const [title, setTitle] = useState<string>("New Story");
    const [story, setStory] = useState<string>("");
    const [worldInfo, setWorldInfo] = useState<string>("");

    return (
        <>
            <div className={"OneShotApp container-fluid"}>
                <div className={"row"}>
                    <div className={"col-3"}>
                        <LeftPane/>
                    </div>
                    <div className={"col"}>
                        <CentrePane
                            titleStuff={[title, setTitle]}
                            storyStuff={[story, setStory]}
                            worldInfoStuff={[worldInfo, setWorldInfo]}/>
                    </div>
                    {/*col-0 means collapsed by default*/}
                    <div className={"col-0 d-none"}>
                        <RightPane
                            title={title}
                            worldInfoStuff={[worldInfo, setWorldInfo]}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OneShot;
export {Title};