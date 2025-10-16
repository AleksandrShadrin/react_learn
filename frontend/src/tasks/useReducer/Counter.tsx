import { useReducer, type ReactElement } from "react";

function countDispatcher(state: number, action: { type: 'ADD' | 'SUBTRACT', value: number }) {
    switch (action.type) {
        case "ADD": return state + action.value;
        case "SUBTRACT": return state - action.value;
    }

    return action.value;
}

export default function Counter(): ReactElement {

    const [count, countDispatch] = useReducer(countDispatcher, 0);


    return <>
        <div>{count}</div>
        <button onClick={() => countDispatch({
            type: 'ADD',
            value: 1
        })}>+</button>
        <button onClick={() => countDispatch({
            type: 'SUBTRACT',
            value: 1
        })}>-</button>
    </>
}