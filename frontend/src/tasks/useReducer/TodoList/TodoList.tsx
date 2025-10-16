import { useReducer, type ReactElement } from "react";

type Todo = {
    id: number,
    title: string,
    enabled: boolean
}

type TodoAction = {
    type: 'ADD',
    todo: {
        title: string
    }
} | {
    type: 'REMOVE',
    todoId: number
} | {
    type: 'TOGGLE',
    todoId: number
};

function todosDispatcher(state: Todo[], args: TodoAction) {
    switch (args.type) {
        case "ADD": {
            const id = Math.max(...state.map(x => x.id)) + 1;
            return [...state, { ...args.todo, enabled: true, id }];
        }
        case "REMOVE": return state.filter(x => x.id !== args.todoId);
        case "TOGGLE": return state.map(x => x.id == args.todoId ? { ...x, enabled: !x.enabled } : x);
        default: throw new Error("Unreachable code");

    }
}

export default function TodoList(): ReactElement {
    const [todos, dispatchTodosAction] = useReducer(todosDispatcher, []);

    return <>
        <ul>
            {todos.map(x =>
                <li id={x.id.toString()}>
                    <p style={{ textDecoration: x.enabled ? '' : "line-through" }}>{x.title}</p>
                    <button onClick={() => dispatchTodosAction({ type: 'TOGGLE', todoId: x.id })}>{x.enabled ? 'on' : 'off'}</button>
                </li>)}
        </ul>

        <form action={(e) => {
            const title = e.get('title')?.toString();

            if (title === undefined || title.trim().length === 0)
                return;

            dispatchTodosAction({
                type: 'ADD', todo: {
                    title,
                }
            })
        }}>
            <label>title
                <input name="title" type="text" />
            </label>
            <button type="submit">submit</button>
        </form>
    </>
}