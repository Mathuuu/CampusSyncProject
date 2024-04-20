// import { legacy_createStore as createStore, 
//     applyMiddleware, 
//     compose, } from "redux";

// import {thunk} from "redux-thunk";


// import { reducers } from "../reducers";



// function saveToLocalStorage(store) {
//     try {
//         const serializedStore = JSON.stringify(store);
//         window.localStorage.setItem('store', serializedStore);
//     } catch (e) {
//         console.log(e);
//     }
// }

// function loadFromLocalStorage() {
//     try {
//         const serializedStore = window.localStorage.getItem('store');
//         if(serializedStore === null) return undefined;
//         return JSON.parse(serializedStore);
//     } catch (e) {
//         console.log(e);
//         return undefined;
//     }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedState = loadFromLocalStorage();

// const store = createStore(
//     reducers,
//     persistedState,
//     composeEnhancers(applyMiddleware(thunk))
// );
// store.subscribe(() => saveToLocalStorage(store.getState()));
// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";

import { reducers } from "../reducers";

// Define saveToLocalStorage and loadFromLocalStorage functions as before

const saveToLocalStorage = store => {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch (e) {
        console.log(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

// Custom thunk middleware to handle promises
const customThunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    if (typeof action === 'object' && typeof action.then === 'function') {
        return action.then(dispatch);
    }

    return next(action);
};

const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(thunk, customThunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
