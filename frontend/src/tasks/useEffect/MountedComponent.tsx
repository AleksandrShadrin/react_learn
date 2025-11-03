import { type ReactElement, useEffect } from 'react';

export default function ComponentMounted(): ReactElement | undefined {
    useEffect(() => {
        console.log('component mounted');
    }, []);

    return undefined;
}
