import { type PropsWithChildren, useState } from 'react';

import { FontSizeContext } from './FontSizeContext';

export default function FontSizeContextProvider(props: PropsWithChildren) {
    const [fontSize, setFontSize] = useState('14px');

    return (
        <FontSizeContext
            value={{
                fontSize: fontSize,
                setFontSize,
            }}
        >
            {props.children}
        </FontSizeContext>
    );
}
