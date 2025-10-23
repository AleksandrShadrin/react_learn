import { useReducer, type ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

type TodoAction =
    | { type: 'ADD'; payload: { title: string } }
    | { type: 'REMOVE'; payload: { id: string } }
    | { type: 'TOGGLE'; payload: { id: string } };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {
        case 'ADD': {
            const newTodo: Todo = {
                id: uuidv4(),
                title: action.payload.title.trim(),
                completed: false,
            };
            return [...state, newTodo];
        }
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.payload.id);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        default:
            throw new Error('Unhandled action type');
    }
}


export default function TodoList(): ReactElement {
    const [todos, dispatchTodosAction] = useReducer(todoReducer, []);

    function handleCompleted(id: string) {
        dispatchTodosAction({ type: 'TOGGLE', payload: { id } });
    }

    function handleRemove(id: string): void {
        return dispatchTodosAction({ type: 'REMOVE', payload: { id } });
    }

    return <>
        <ul>
            {todos.map(x =>
                <li key={x.id.toString()}>
                    <p style={{ textDecoration: x.completed ? '' : "line-through" }}>{x.title}</p>
                    <button onClick={() => handleCompleted(x.id)}>{!x.completed ? 'Mark not completed' : 'Mark completed'}</button>
                    <button onClick={() => handleRemove(x.id)}>Remove</button>
                </li>)}
        </ul>

        <form action={(e) => {
            const title = e.get('title')?.toString();

            if (title === undefined || title.trim().length === 0)
                return;

            dispatchTodosAction({
                type: 'ADD', payload: {
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