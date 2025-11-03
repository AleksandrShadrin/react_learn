import { type ReactElement, useEffect, useState } from 'react';

type Request = {
    state: 'loading' | 'error' | 'success';
    content?: string;
};

export default function Fetch(): ReactElement {
    const [request, setRequest] = useState<Request>({
        state: 'loading',
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRequest({
                state: 'success',
                content: 'content loaded',
            });
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            {request.state === 'success' && <i>{request.content}</i>}
            {request.state === 'loading' && <i>loading...</i>}
        </div>
    );
}
