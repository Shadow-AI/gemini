/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React, {useEffect, useRef, useState} from "react";
import {JumpDisappearLoader} from "../Loaders";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faArrowLeft,
    faArrowRight,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {runModel} from "../loadModel";
import {Title} from "./OneShotStory";

/**
 * The data definition for the message entity.
 */
interface dataDef {
    message: string,
    user: boolean
}

/**
 * The combined area for the story prompt and the story area, to assist in state lifting.
 * @param props.titleStuff the title state and the setter for the title state
 * @param props.storyStuff the story state and the setter for the story state
 * @param props.worldInfoStuff the world information state and the setter for the world information state
 * @constructor
 */
const StoryPromptCombinedArea: (props: {
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => React.ReactElement = (props: {
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {

    // wait defines whether the client is awaiting a response from the LLM.
    // data is the array of messages to be displayed in the story area.
    const [wait, setWait] = useState<boolean>(false);
    const [data, setData] = useState<dataDef[]>([]);
    // const data: dataDef[] = [
    //     {
    //         message: "i like shiny things...",
    //         user: false
    //     }, {
    //         message: "but i'd marry you with paper rings",
    //         user: true
    //     }, {
    //         message: "that's right, darling. you're the one i want.",
    //         user: false
    //     }, {
    //         message: "i hate accidents except when we went from friends to this",
    //         user: true
    //     }, {
    //         message: "ah ha, that's right. darling, you're the one i want",
    //         user: false
    //     }, {
    //         message: "uwu",
    //         user: false
    //     }
    // ];

    return (<>
            <StoryArea messageData={data} wait={wait} setWait={setWait}/>
            <PromptArea wait={wait} setWait={setWait} setData={setData}
                        titleStuff={props.titleStuff}
                        storyStuff={props.storyStuff}
                        worldInfoStuff={props.worldInfoStuff}/>
        </>
    );
}

/**
 * The story canvas, which displays the message in a conversation style (currently).
 * @param props.messageData the array data, defined by dataDef, to be displayed in the story area. PromptStoryCombined -> StoryArea
 * @param props.wait the boolean value to determine whether the client is waiting for a response from the LLM. PromptStoryCombined -> StoryArea
 * @param props.setWait the setter for the wait state. PromptStoryCombined -> StoryArea
 * @constructor
 */
const StoryArea: (props:
                      {
                          messageData: dataDef[],
                          wait: boolean,
                          setWait: React.Dispatch<React.SetStateAction<boolean>>
                      }) => React.ReactElement
    = (props: {
    messageData: dataDef[],
    wait: boolean,
    setWait: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div className={"story-area"}>
            {
                props.messageData.map((elem: dataDef, index: number) => (
                    <MessageEntity key={index} message={elem.message} user={elem.user}/>
                ))
            }
            {
                // if wait is set, display a custom loader
                props.wait ? <MessageEntity message={<JumpDisappearLoader/>} user={false}/> : null
            }
        </div>
    );
}

/**
 * The prompt section, to allow user to input their idea for generation of story by the LLM.
 * @param props.wait the boolean value to determine whether the client is waiting for a response from the LLM. PromptStoryCombined -> PromptArea
 * @param props.setWait the setter for the wait state. PromptStoryCombined -> PromptArea
 * @param props.setData the setter for the data state; the array of messages to be displayed in the story area. PromptStoryCombined -> PromptArea
 * @param props.titleStuff the title state and the setter for the title state. OneShotStory -> CentrePane -> PromptStoryCombined -> PromptArea
 * @param props.storyStuff the story state and the setter for the story state. OneShotStory -> CentrePane -> PromptStoryCombined -> PromptArea
 * @param props.worldInfoStuff the world information state and the setter for the world information state. OneShotStory -> CentrePane -> PromptStoryCombined -> PromptArea
 * @constructor
 */
const PromptArea: (props: {
    wait: boolean,
    setWait: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<dataDef[]>>
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => React.ReactElement = (props: {
    wait: boolean,
    setWait: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<dataDef[]>>,
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {
    // prompt engineering
    const promptStringMetaFirst: string = `Write a story about`;
    const promptStringMetaSecond: string = `.
    ${props.worldInfoStuff[0] !== "" ? 'Use the following world information to guide the story: ' + props.worldInfoStuff[0] : ''}
    Also generate a title for the story and the world information for the story. 
    The Title first, then the story, then the world information, and separate all sections by the --x-- delimiter.
    Do not add the delimiter at the beginning or end of the response.`;

    // create reference to the user's input textarea and the error text div
    const userPrompt = useRef<HTMLTextAreaElement>(null);
    const errorText = useRef<HTMLDivElement>(null);

    // unpack all the required packed state variables
    const [, setTitle] = props.titleStuff;
    const [story, setStory] = props.storyStuff;
    const [, setWorldInfo] = props.worldInfoStuff;

    /**
     * Handle the submit event. This creates the model configuration by invoking the loadModel.ts script and sends the request to the API.
     * @param e
     */
    const sendPrompt: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {

        /**
         * This function is used to handle errors in the prompt area
         * @param errorMessage the message to be displayed under prompt
         */
        function errorHandler(errorMessage: string): void {
            if (errorText.current !== null) {
                errorText.current.innerText = errorMessage;
            }
        }

        // the user input in the prompt area.
        let userInput: string | undefined = userPrompt.current?.value;
        let displayData: dataDef[] = [];

        // if user entered something, trim it and check if it's empty
        if (userInput) {
            userInput = userInput.trim();
            if (userInput.length === 0) {
                errorHandler("Please enter a setting for the story.");
                return;
            }
            const response = runModel('gemini-pro', promptStringMetaFirst + userInput + promptStringMetaSecond);

            // if the request was sent, it means the input parameters are valid; remove the error message and enable wait state
            errorHandler("");
            props.setWait(true);
            // set the user's input as the first message in the story area
            displayData.push({
                message: `Write a story about: ${userInput}`,
                user: true
            });
            props.setData(displayData);
            if (userPrompt.current) {
                // reset the prompt area.
                userPrompt.current.value = "";
            }

            response.then((res) => {
                // if the response contains the following string, it means the request was invalid (usually explicit and blocked by the LLM)
                if (res.text().includes("Would you like me to try generating something different?")) {
                    errorHandler("Invalid or Explicit Request to LLM");
                    return;
                }

                let data: string[] = res.text().split("--x--");
                setTitle(data[0].split("Title:")[1].trim());
                setStory(data[1].trim());
                setWorldInfo(data[2].split("World Information:")[1].trim());
            }).catch((err) => {
                console.error(err);
                setTitle("");
                setStory("");
                setWorldInfo("");
            }).finally(() => {
                // console.log(story);
                props.setWait(false);
                displayData.push({
                    message: story,
                    user: false
                });
                props.setData(displayData);
            });
        } else {
            errorHandler("Please enter a setting for the story.");
        }
    }

    return (
        <div className={"prompt-area"}>
            <div className={"card flex-row"}>
                <textarea ref={userPrompt} rows={5} className={"prompt form-control"}
                          placeholder={"Write a story about..."}/>
                <div>
                    <button className={"btn btn-primary"} onClick={sendPrompt}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
            <div ref={errorText} className={"error-text"}></div>
        </div>
    );
}

/**
 * The collapsible button to collapse and expand the right pane.
 * @constructor
 */
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
        const classList = rightPane?.parentElement?.classList;
        if (classList === undefined) {
            return;
        }
        if (classList.contains("col-3")) {
            new Promise((resolve => setTimeout(resolve, 50))).then(() => {
                classList.remove("col-3");
                classList.add("col-0");
                classList.add("d-none");
                setIcon(faArrowLeft);
            });
        } else {
            classList.remove("col-0");
            classList.remove("d-none");
            classList.add("col-3");
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

/**
 * A single message that is displayed on the story canvas.
 * @param props.message the content to be displayed
 * @param props.user whether the message is from the user or not
 * @constructor
 */
const MessageEntity: (props: {
    message: string | React.ReactElement,
    user: boolean
}) => React.ReactElement = (props) => {

    return <>
        <div className={`message-card d-block ${props.user ? "attach-right" : "attach-left"}`}>
            <div className={"card position-relative"}>
                <div className={"card-body"}>
                    <div className={`card-text`}>
                        {/* if type is string, then split by \n and assign as diff p tags */}
                        {/* else release as is, i.e. React Element type */}
                        {typeof props.message === "string" ?
                            props.message.split("\n").map((line, index) => (
                                <p key={index}>{line}</p>
                            )) : props.message}
                    </div>
                </div>
            </div>
        </div>
    </>;
}
/**
 * The centre pane for the oneShot.
 * @param props.titleStuff the title state and the setter for the title state. OneShotStory -> CentrePane
 * @param props.storyStuff the story state and the setter for the story state. OneShotStory -> CentrePane
 * @param props.worldInfoStuff the world information state and the setter for the world information state. OneShotStory -> CentrePane
 * @constructor
 */
const CentrePane: (props: {
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => React.ReactElement = (props: {
    titleStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    storyStuff: [string, React.Dispatch<React.SetStateAction<string>>],
    worldInfoStuff: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {

    return (<>
            <div className={"position-relative"}>
                <Collapser/>
            </div>
            <div className={"container"}>
                <Title title={props.titleStuff[0]} classes={""}/>
                <StoryPromptCombinedArea
                    titleStuff={props.titleStuff}
                    storyStuff={props.storyStuff}
                    worldInfoStuff={props.worldInfoStuff}
                />
            </div>
        </>
    );
}
export default CentrePane;