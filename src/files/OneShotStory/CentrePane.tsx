/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from "react";
import {DisappearingLoader, JumpDisappearLoader} from "../Loaders";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const Title: (props: { title: string }) => React.ReactElement<{ title: string }> = ({title}) => {

    return (
        <div>
            <h1 className={"card-title"}>{title}</h1>
        </div>
    );
}

const StoryArea: () => React.ReactElement = () => {

    const data: dataDef[] = [
        {
            message: "i like shiny things...",
            user: false
        }, {
            message: "but i'd marry you with paper rings",
            user: true
        }, {
            message: "that's right, darling. you're the one i want.",
            user: false
        }, {
            message: "i hate accidents except when we went from friends to this",
            user: true
        }, {
            message: "ah ha, that's right. darling, you're the one i want",
            user: false
        }, {
            message: "uwu",
            user: false
        }
    ];

    interface dataDef {
        message: string,
        user: boolean
    }
    return (
        <div className={"story-area"}>
            {
                data.map((elem: dataDef, index: number) => (
                    <MessageEntity key={index} message={elem.message} user={elem.user}/>
                ))
            }
        </div>
    );
}

const PromptArea: () => React.ReactElement = () => {
    return (
        <div className={"prompt-area"}>
            <div className={"card flex-row"}>
                <textarea rows={5} className={"prompt form-control"} placeholder={"Type here"}/>
                <div>
                    <button className={"btn btn-primary"} onClick={(e)=> console.log('hi')}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

const CentrePane: () => React.ReactElement = () => {
    return (
        <div className={"container"}>
        <Title title="hello"/>
            <StoryArea/>
            <PromptArea/>
            <DisappearingLoader/>
            <JumpDisappearLoader/>
        </div>
    );
}

const MessageEntity: (props: { message: string, user: boolean }) => React.ReactElement = (props) => {

    return <>
        <div className={`message-card d-block ${props.user ? "attach-right" : "attach-left"}`}>
            <div className={"card position-relative"}>
                <div className={"card-body"}>
                    <p className={`card-text`}>{props.message}</p>
                </div>
            </div>
        </div>
    </>;
}
export default CentrePane;