import { useEffect, type ReactElement } from "react";

export default function ComponentMounted(): ReactElement | undefined {
    useEffect(() => {
        console.log("component mounted");
    }, [])

    return undefined;
}