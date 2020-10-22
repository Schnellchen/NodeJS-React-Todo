import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './ToDoApp/ToDoApp'
import { BrowserRouter } from "react-router-dom";
//import * as serviceWorker from "./serviceWorker"
// ========================================

ReactDOM.render(
    <BrowserRouter>
        <ToDoApp />
    </BrowserRouter>,
    document.getElementById("root")
);

//serviceWorker.unregister();