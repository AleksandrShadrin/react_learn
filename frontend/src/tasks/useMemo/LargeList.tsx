import { useEffect, type ReactElement } from "react";

let renderCount = 0;
let effectRunCount = 0;

export default function LargeList(props: { list: { key: string, value: number }[] }): ReactElement {

    renderCount++;

    const elements = props.list.filter(x => x.value % 159488 === 0);

    useEffect(() => {
        effectRunCount++;
        if (elements.length) {
            console.log('computed');
        }
    }, [elements]);

    useEffect(() => {
        console.log(`Render count: ${renderCount}, Effect run count: ${effectRunCount}`);
    });

    return <ul>
        {elements.map(x => <li key={x.key}>{x.value}</li>)}
    </ul>
}