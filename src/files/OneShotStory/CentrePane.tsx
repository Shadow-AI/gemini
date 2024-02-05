/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React, {useEffect, useState} from "react";
import {DisappearingLoader, JumpDisappearLoader} from "../Loaders";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faArrowLeft,
    faArrowRight,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

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
                    <button className={"btn btn-primary"}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

const Collapser: () => React.ReactElement = () => {

    // locate the rightPane element
    const [rightPane, setRightPane] = useState<HTMLElement | null>(null);
    // once the item loads, set the rightPane element
    useEffect(() => {
        setRightPane(document.getElementById("rightpane-collapse"));
    }, []);

    const [icon, setIcon] = useState<IconDefinition>(faArrowLeft);

    const collapseHandler: (e: React.MouseEvent<HTMLButtonElement>) => void = () => {
        // if the parent of the collapse item contains the col-3 class, remove it and replace it with col-0
        // this basically hides the element from the DOM, and allows other classes to scale appropriately
        if (rightPane?.parentElement?.classList.contains("col-3")) {
            new Promise((resolve => setTimeout(resolve, 50))).then(() => {
                rightPane?.parentElement?.classList.remove("col-3");
                rightPane?.parentElement?.classList.add("col-0");
                setIcon(faArrowLeft);
            });
        } else {
            rightPane?.parentElement?.classList.remove("col-0");
            rightPane?.parentElement?.classList.add("col-3");
            setIcon(faArrowRight);
        }
    }

    return (<>
        <div className={"collapseButton"}>
            <button className={"btn btn-secondary"} onClick={collapseHandler}>
                <FontAwesomeIcon icon={icon}/>
            </button>
        </div>
    </>);
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

const CentrePane: () => React.ReactElement = () => {
    return (<>
            <div className={"position-relative"}>
                <Collapser/>
            </div>
            <div className={"container"}>
                <Title title="hello"/>
                <StoryArea/>
                <PromptArea/>
                <DisappearingLoader/>
                <JumpDisappearLoader/>
            </div>
        </>
    );
}
export default CentrePane;