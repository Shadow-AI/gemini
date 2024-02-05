/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import {useEffect, useState} from "react";
import React from 'react';
import axios, {AxiosResponse} from "axios";
import APIResponse from "../../interfaces/APIResponse_GeminiProSingle";
import {JumpLoader} from "../Loaders";

const MainItem: () => React.ReactElement = () => {

    // create a state variable that refreshes once the axios request is complete
    const [response, setResponse] = useState<string>("");
    const GeminiKey:string = process.env.REACT_APP_GEMINI_KEY as string;

    // run once on page load, and call the api
    useEffect(() => {
        axios({
            method: 'post',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GeminiKey}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "contents": [{
                    "parts": [{
                        "text": "Write a bad story:"
                    }]
                }]
            }
        }).then((res: AxiosResponse<APIResponse>) => {
            console.log(res);
            setResponse(res.data.candidates[0].content.parts[0].text);
        }).catch((err: object) => {
            console.log(err);
        });
    }, []);


    return (
        <>
            <div>
                <h1>Test</h1>
                <Reply response={response}/>
            </div>
        </>
    );
};

// this component is for the response received from the api and parses it to an easily readable format
function Reply(props: { response: string }) {

    let fin: React.ReactNode[] = [];
    if (props.response) {
        let formatReply: string[] = props.response.split("\n");

        formatReply.forEach((value, index) => {
            fin.push(<React.Fragment key={index}><p>{value}</p><br/></React.Fragment>);
        });
    }

    return (
        <>
            <div>
                {fin.length > 0 ?
                    fin : <JumpLoader/>}
            </div>
        </>
    );
}

export default MainItem;