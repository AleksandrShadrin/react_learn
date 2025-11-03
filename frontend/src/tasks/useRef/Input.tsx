import { useEffect, useRef } from 'react';

export default function Input(props: { focus: boolean }) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.focus) inputRef.current?.focus();
    }, [props]);

    return <input ref={inputRef} />;
}
