import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import LargeList from './LargeList';

export default function Parent() {
    const [list] = useState(
        Array(1000)
            .fill(1)
            .map((_, idx) => ({ key: uuidv4(), value: idx }))
    );
    const [count, setCount] = useState(0);

    return (
        <>
            <p>{count}</p>
            <LargeList list={list} />
            <button onClick={() => setCount(c => c + 1)}>
                Force re-render
            </button>
        </>
    );
}
