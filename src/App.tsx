/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainItem from "./files/OneShotStory";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import OneShot from "./files/OneShotStory/OneShotStory";

function App() {

    const ReactDefault: () => React.ReactElement =()=>{
        return <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<ReactDefault/>}/>
                <Route path="test/" element={<MainItem/>}/>
                <Route path={"centre/"} element={<OneShot/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
